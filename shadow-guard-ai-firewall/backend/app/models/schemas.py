from pydantic import BaseModel, Field
from typing import Optional

class GuardRequest(BaseModel):
    prompt: str = Field(..., min_length=1, description="User prompt to be analyzed")

class GuardResponse(BaseModel):
    status: str
    gate: str
    reason: Optional[str] = None
    entropy: Optional[float] = None
    threshold: Optional[float] = None
    message: Optional[str] = None
    response: Optional[str] = None
    confidence: Optional[int] = Field(None, ge=0, le=100, description="Confidence score 0-100")
    attack_type: Optional[str] = Field(
        None,
        description="Attack classification: none, prompt_injection, jailbreak, role_manipulation, system_extraction, security_bypass, other"
    )
    timestamp: Optional[str] = None

class ThreatLog(BaseModel):
    id: str
    time: str
    query: str
    result: str
    entropy: float
    gate: Optional[str] = None
