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

### System Architecture
![System Architecture](screenshots/system-architecture.png)

### Threat Monitoring Dashboard
![Threat Monitoring Dashboard](screenshots/Threat-Monitoring-Dashboard.png)

### Enterprise ROI Calculator
![Enterprise ROI Calculator](screenshots/enterprise-roi-calculator.png)

### Enterprise ROI Dashboard
![Enterprise ROI Dashboard](screenshots/enterprise-roi-dashboard.png)

### Live API Demo
![Live API Demo](screenshots/demo1.png)

### Prompt Injection Detection Demo
![Prompt Injection Detection](screenshots/demo2.png)

### Behavioral Audit Demo
![Behavioral Audit](screenshots/demo3.png)

### Security Validation Demo
![Security Validation](screenshots/demo4.png)

## Author

Ayush Porwal
