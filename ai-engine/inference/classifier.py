import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
import joblib
import os

class CategoryClassifier:
    def __init__(self):
        self.model = LogisticRegression(max_iter=1000)
        self.vectorizer = TfidfVectorizer(max_features=100)
        self.categories = ['Road', 'Water', 'Electricity', 'Sanitation', 'Other']
        self.model_path = 'models/category_model.pkl'
        self.vectorizer_path = 'models/vectorizer.pkl'
        self._load_or_train()

    def _load_or_train(self):
        """Load pre-trained model or train a new one"""
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            self.vectorizer = joblib.load(self.vectorizer_path)
        else:
            self._train_default_model()

    def _train_default_model(self):
        """Train on sample data"""
        training_data = [
            ('pothole road crack', 'Road'),
            ('water leak pipe burst', 'Water'),
            ('electricity light pole', 'Electricity'),
            ('garbage trash sanitation', 'Sanitation'),
            ('street broken damaged', 'Road'),
            ('water supply issue drainage', 'Water'),
            ('power outage electric fault', 'Electricity'),
            ('dirty waste collection', 'Sanitation'),
        ]
        
        texts = [text for text, _ in training_data]
        labels = [label for _, label in training_data]
        
        X = self.vectorizer.fit_transform(texts)
        self.model.fit(X, labels)
        
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.vectorizer, self.vectorizer_path)

    def predict(self, text: str) -> tuple:
        """Predict category and confidence"""
        X = self.vectorizer.transform([text])
        category = self.model.predict(X)[0]
        confidence = max(self.model.predict_proba(X)[0])
        return category, float(confidence)


class SeverityPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=10, random_state=42)
        self.severities = ['Low', 'Medium', 'High', 'Critical']
        self.model_path = 'models/severity_model.pkl'
        self._load_or_train()

    def _load_or_train(self):
        """Load pre-trained model or train a new one"""
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
        else:
            self._train_default_model()

    def _train_default_model(self):
        """Train on sample data"""
        # Simple features: text length, keyword intensity
        training_data = [
            ([10, 0.3], 'Low'),
            ([20, 0.5], 'Medium'),
            ([30, 0.7], 'High'),
            ([40, 0.9], 'Critical'),
        ]
        
        X = np.array([features for features, _ in training_data])
        y = np.array([severity for _, severity in training_data])
        
        self.model.fit(X, y)
        os.makedirs('models', exist_ok=True)
        joblib.dump(self.model, self.model_path)

    def predict(self, text: str, keywords: list) -> str:
        """Predict severity based on text features"""
        urgent_keywords = ['urgent', 'dangerous', 'critical', 'emergency', 'severe']
        keyword_intensity = sum(1 for kw in keywords if kw in urgent_keywords) / len(keywords) if keywords else 0
        
        features = np.array([[len(text), keyword_intensity]])
        severity = self.model.predict(features)[0]
        return severity


class ResolutionTimePredictor:
    def __init__(self):
        self.base_times = {
            'Road': 7,
            'Water': 5,
            'Electricity': 3,
            'Sanitation': 4,
            'Other': 7,
        }
        self.severity_multiplier = {
            'Low': 0.5,
            'Medium': 1.0,
            'High': 1.5,
            'Critical': 2.0,
        }

    def predict(self, category: str, severity: str) -> int:
        """Predict resolution time in days"""
        base_time = self.base_times.get(category, 7)
        multiplier = self.severity_multiplier.get(severity, 1.0)
        return int(base_time * multiplier)


# Department mapping
DEPARTMENT_MAPPING = {
    'Road': 'Road & Infrastructure',
    'Water': 'Water Supply & Drainage',
    'Electricity': 'Electricity Board',
    'Sanitation': 'Sanitation & Cleanliness',
    'Other': 'General',
}
