from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

from api.models import ComplaintAnalysisRequest, ComplaintAnalysisResponse
from inference.preprocessor import TextPreprocessor
from inference.classifier import (
    CategoryClassifier,
    SeverityPredictor,
    ResolutionTimePredictor,
    DEPARTMENT_MAPPING,
)

load_dotenv()

app = FastAPI(
    title="LocalPulse AI Engine",
    description="NLP + ML microservice for civic complaint analysis",
    version="1.0.0",
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
preprocessor = TextPreprocessor()
category_classifier = CategoryClassifier()
severity_predictor = SeverityPredictor()
resolution_predictor = ResolutionTimePredictor()


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "OK", "message": "AI Engine is running"}


@app.post("/analyze", response_model=ComplaintAnalysisResponse)
async def analyze_complaint(request: ComplaintAnalysisRequest):
    """
    Analyze a complaint and return:
    - category
    - severity
    - department
    - confidence
    - keywords
    - predicted resolution days
    """
    try:
        text = request.text
        
        # Step 1: Preprocess
        processed_text = preprocessor.preprocess(text)
        keywords = preprocessor.extract_keywords(text)
        
        # Step 2: Classify category
        category, confidence = category_classifier.predict(processed_text)
        
        # Step 3: Predict severity
        severity = severity_predictor.predict(text, keywords)
        
        # Step 4: Map department
        department = DEPARTMENT_MAPPING.get(category, "General")
        
        # Step 5: Predict resolution time
        resolution_days = resolution_predictor.predict(category, severity)
        
        return ComplaintAnalysisResponse(
            category=category,
            severity=severity,
            department=department,
            confidence=confidence,
            keywords=keywords,
            resolution_days=resolution_days,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/categories")
async def get_categories():
    """Get list of complaint categories"""
    return {"categories": ["Road", "Water", "Electricity", "Sanitation", "Other"]}


@app.get("/severities")
async def get_severities():
    """Get list of severity levels"""
    return {"severities": ["Low", "Medium", "High", "Critical"]}


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    uvicorn.run(app, host="0.0.0.0", port=port)
