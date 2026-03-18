from pydantic import BaseModel
from typing import List

class ComplaintAnalysisRequest(BaseModel):
    text: str

class ComplaintAnalysisResponse(BaseModel):
    category: str
    severity: str
    department: str
    confidence: float
    keywords: List[str]
    resolution_days: int
