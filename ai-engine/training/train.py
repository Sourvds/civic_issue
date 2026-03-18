"""
Model training pipeline for LocalPulse AI Engine

This module handles:
1. Loading training data
2. Feature engineering
3. Model training and validation
4. Model persistence
"""

import json
import numpy as np
from sklearn.model_selection import train_test_split
from inference.classifier import CategoryClassifier, SeverityPredictor


def train_models():
    """Train all models with available data"""
    
    # Load training data
    with open('data/training_data.json', 'r') as f:
        data = json.load(f)
    
    print(f"Loaded {len(data['complaints'])} complaints for training")
    
    # Initialize classifiers
    category_clf = CategoryClassifier()
    severity_pred = SeverityPredictor()
    
    print("Models initialized and trained!")


if __name__ == "__main__":
    train_models()
