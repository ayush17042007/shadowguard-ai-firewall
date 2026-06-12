# Shadow Guard AI Firewall

Shadow Guard AI Firewall is a multi-layer AI security platform designed to detect, analyze, and mitigate prompt injection attacks, jailbreak attempts, and adversarial interactions targeting Large Language Models (LLMs).

The system acts as a protective layer between users and AI models, inspecting prompts through multiple security gates before allowing execution.

## Problem Statement

As organizations increasingly deploy Generative AI systems, they become vulnerable to:

* Prompt Injection Attacks
* Jailbreak Attempts
* Instruction Override Attacks
* Sensitive Information Leakage
* Hallucination-Induced Decision Risks

Shadow Guard addresses these challenges by introducing a layered validation and threat detection pipeline.

## Features

* Prompt Injection Detection
* Multi-Gate Security Validation
* Real-Time Threat Monitoring Dashboard
* Attack Logging and Analysis
* Risk Scoring Mechanism
* AI Response Security Evaluation
* Enterprise AI Governance Support

## System Architecture

### Security Pipeline

1. User submits a prompt.
2. Gate 1 performs initial prompt validation.
3. Gate 2 analyzes contextual risk indicators.
4. Gate 3 evaluates adversarial and jailbreak patterns.
5. Threat engine generates a security score.
6. Malicious requests are blocked.
7. Safe requests proceed for processing.
8. Events are logged and visualized on the monitoring dashboard.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Python
* FastAPI
* SQLite

## Installation

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
pip install -r requirements.txt
python main.py
```

## Future Improvements

* Threat Intelligence Integration
* Role-Based Access Control (RBAC)
* Advanced Attack Classification
* Enterprise Audit Reporting
* Distributed Security Monitoring

## Screenshots

Add dashboard screenshots and attack detection examples here.

## Author

Ayush Porwal
