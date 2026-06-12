from sqlalchemy import Column, Integer, String, Float
from app.models.database import Base
from datetime import datetime

class Threat(Base):
    __tablename__ = "threats"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(String, default=lambda: datetime.utcnow().isoformat() + "Z")
    query = Column(String, index=True)
    gate_triggered = Column(String, index=True)
    entropy_score = Column(Float)
    action = Column(String, index=True)
