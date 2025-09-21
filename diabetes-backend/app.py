from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load("diabetes_model.pkl")
scaler = joblib.load("scaler.pkl")

@app.route('/')
def home():
    return "Diabetes Prediction API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Get JSON from frontend
        features = np.array([
            data['Pregnancies'],
            data['Glucose'],
            data['BloodPressure'],
            data['SkinThickness'],
            data['Insulin'],
            data['BMI'],
            data['DiabetesPedigreeFunction'],
            data['Age']
        ]).reshape(1, -1)

        # Scale features before prediction
        features = scaler.transform(features)

        prediction = model.predict(features)[0]

        return jsonify({
            "diabetes_risk": int(prediction),
            "message": "High Risk" if prediction == 1 else "Low Risk"
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
