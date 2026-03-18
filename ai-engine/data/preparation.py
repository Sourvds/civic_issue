import json

# Sample training data for the models
TRAINING_DATA = {
    "complaints": [
        {
            "text": "There is a large pothole on Main Street that is dangerous for cars",
            "category": "Road",
            "severity": "High",
        },
        {
            "text": "Water is leaking from the pipe near my house",
            "category": "Water",
            "severity": "Medium",
        },
        {
            "text": "Street lights are broken and it's dark at night",
            "category": "Electricity",
            "severity": "Medium",
        },
        {
            "text": "Garbage is piled up in the neighborhood for days",
            "category": "Sanitation",
            "severity": "High",
        },
        {
            "text": "Road is damaged and needs urgent repair",
            "category": "Road",
            "severity": "Critical",
        },
        {
            "text": "Water supply issue in the area",
            "category": "Water",
            "severity": "Low",
        },
    ]
}

if __name__ == "__main__":
    with open("data/training_data.json", "w") as f:
        json.dump(TRAINING_DATA, f, indent=2)
    print("Training data saved!")
