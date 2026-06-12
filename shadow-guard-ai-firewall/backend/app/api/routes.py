from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.models.database import get_db
from app.models.models import Threat
from app.models.schemas import GuardRequest, GuardResponse
from app.services.ai_agents import AIAgents
from datetime import datetime
import random
from app.utils.logger import logger

router = APIRouter()

def _log_threat(db: Session, query: str, gate: str, entropy: float, action: str):
    new_threat = Threat(
        query=query,
        gate_triggered=gate,
        entropy_score=entropy,
        action=action,
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
    db.add(new_threat)
    db.commit()
    db.refresh(new_threat)
    return new_threat

@router.post("/guard", response_model=GuardResponse)
def guard_endpoint(payload: GuardRequest, db: Session = Depends(get_db)):
    user_prompt = payload.prompt.strip()
    logger.info(f"[FLOW] Request received. Prompt: '{user_prompt}'")
    
    # ---------------------------------------------------------------
    # Gate 1: Security Firewall
    # Blocks ONLY on clear adversarial intent (prompt injection,
    # jailbreak, role manipulation, system extraction, bypass).
    # Does NOT block for incompleteness, vagueness, or brevity.
    # ---------------------------------------------------------------
    logger.info("[FLOW] Gate 1 started")
    gate_1_result = AIAgents.run_gate_1(user_prompt)
    logger.info(f"[FLOW] Gate 1 verdict: {gate_1_result}")
    
    # Gate 1 decision: block ONLY when status is BLOCKED
    # The old `is_complete` check has been removed entirely
    if gate_1_result.get("status") == "BLOCKED":
        attack_type = gate_1_result.get("attack_type", "unknown")
        confidence = gate_1_result.get("confidence", 0)
        feedback = gate_1_result.get("feedback", "Security threat detected.")
        
        _log_threat(db, user_prompt, "GATE_1", 0.0, "BLOCKED")
        logger.info(
            f"[FLOW] BLOCKED at Gate 1 — attack_type={attack_type}, "
            f"confidence={confidence}, feedback={feedback}"
        )
        return GuardResponse(
            status="BLOCKED",
            gate="GATE_1",
            reason=f"[{attack_type.upper()}] {feedback}",
            confidence=confidence,
            attack_type=attack_type,
            timestamp=datetime.utcnow().isoformat() + "Z"
        )
    
    # ---------------------------------------------------------------
    # Gate 2: Deep Evaluation
    # ---------------------------------------------------------------
    logger.info("[FLOW] Gate 2 started")
    gate_2_result = AIAgents.run_gate_2(user_prompt, gate_1_result)
    logger.info(f"[FLOW] Gate 2 verdict: {gate_2_result}")
    entropy_score = gate_2_result.get("entropy", 0.0)
    threshold = 2.0
    
    if gate_2_result.get("final_action") == "BLOCKED" or entropy_score >= threshold:
        _log_threat(db, user_prompt, "GATE_2", entropy_score, "BLOCKED")
        logger.info("[FLOW] Final response returned: BLOCKED at Gate 2")
        return GuardResponse(
            status="BLOCKED",
            gate="GATE_2",
            entropy=entropy_score,
            threshold=threshold,
            message="Socratic Reject: " + gate_2_result.get("reason", "Safety threshold exceeded."),
            confidence=gate_1_result.get("confidence", 0),
            attack_type=gate_1_result.get("attack_type", "none"),
            timestamp=datetime.utcnow().isoformat() + "Z"
        )
        
    # PASS
    _log_threat(db, user_prompt, "NONE", entropy_score, "PASS")
    logger.info("[FLOW] Final response returned: PASS")
    return GuardResponse(
        status="PASS",
        gate="NONE",
        entropy=entropy_score,
        response=gate_2_result.get("reason", "Query processed successfully. Clean."),
        confidence=gate_1_result.get("confidence", 95),
        attack_type="none",
        timestamp=datetime.utcnow().isoformat() + "Z"
    )

@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):
    rows = db.query(Threat).order_by(Threat.id.desc()).limit(50).all()
    
    logs_list = []
    for index, row in enumerate(rows):
        time_part = row.timestamp.split("T")[1][:8] if "T" in str(row.timestamp) else str(row.timestamp)
        unique_id = f"{row.id}-{index}-{random.randint(1000, 9999)}"
        item = {
            "id": unique_id,
            "time": time_part,
            "query": row.query,
            "result": row.action,
            "entropy": row.entropy_score,
        }
        if row.gate_triggered and row.gate_triggered != "NONE":
            item["gate"] = row.gate_triggered
        logs_list.append(item)

    return {"logs": logs_list}
