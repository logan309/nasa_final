import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import sys

app = Flask(__name__)
CORS(app) 

model = None
MODEL_PATH = 'xgboost_model.pkl'

try:
    model = joblib.load(MODEL_PATH)
    print(f"Successfully loaded AI model: {MODEL_PATH}")
except FileNotFoundError:
    print(f"ERROR: Model file '{MODEL_PATH}' not found. Please ensure you place the .pkl file in the root directory.", file=sys.stderr)
    print("AI analysis will not work until the model is loaded.", file=sys.stderr)
except Exception as e:
    print(f"ERROR loading model: {e}", file=sys.stderr)
    print("AI analysis will not work.", file=sys.stderr)


def clean_columns(df):
    df.columns = [re.sub(r'[\[\]<> ]', '', str(col)) for col in df.columns]
    return df

@app.route('/analyze_exoplanet', methods=['POST'])
def analyze_exoplanet():
    if model is None:
        return jsonify({'error': 'AI Model not loaded or initialized.'}), 503

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            df = pd.read_csv(file)
            
            df = clean_columns(df)
            
            expected_features = [
                'StellarRadiusRsun', 
                'StellarTemperatureK', 
                'OrbitalPerioddays', 
                'TransitDepthppm', 
                'Durationhours', 
                'SNR', 
                'TransitSignalDurationday', 
                'TransitPeriodErrordays', 
                'TransitDurationErrorhours'
            ]

            if not all(feature in df.columns for feature in expected_features):
                missing = [f for f in expected_features if f not in df.columns]
                return jsonify({'error': f'Missing required columns: {", ".join(missing)}. Please check your CSV format.'}), 400
            
            X_data = df[expected_features]

            predictions = model.predict(X_data).tolist()
            prediction_probabilities = model.predict_proba(X_data)[:, 1].tolist() 

            results = {
                'prediction': predictions,
                'probability': prediction_probabilities
            }

            return jsonify(results), 200
        except Exception as e:
            print(f"Prediction Error: {e}", file=sys.stderr)
            return jsonify({'error': f'A processing error occurred: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
