# api.py
import pandas as pd
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import os

# --- Flask Server Setup ---

# Initialize the Flask application
app = Flask(__name__)
# Enable CORS to allow the React frontend (running on a different port/domain) 
# to communicate with this server.
CORS(app) 

# --- Model Loading ---

# NOTE: You MUST train your model (XGBoost Classifier with AUC 0.942) 
# using your Jupyter notebook and save it to this location before running the server.
MODEL_FILE = 'xgboost_model.pkl'

try:
    # Load your pre-trained XGBoost model
    # The file path needs to be absolute or relative to where you run this script.
    model = joblib.load(MODEL_FILE)
    print(f"Successfully loaded AI model: {MODEL_FILE}")
except FileNotFoundError:
    print(f"ERROR: Model file '{MODEL_FILE}' not found.")
    print("Please ensure you train your model and save it using `joblib.dump(model, 'xgboost_model.pkl')`")
    model = None
except Exception as e:
    print(f"ERROR loading model: {e}")
    model = None


def clean_columns(df):
    """
    Cleans column names by removing specific special characters, 
    matching the format used in your Jupyter notebook for feature selection.
    """
    # Regex pattern to match special characters like [, ], <, >, and spaces
    df.columns = [re.sub(r'[\[\]\<\> ]', '', str(col)) for col in df.columns]
    return df

@app.route('/analyze_exoplanet', methods=['POST'])
def analyze_exoplanet():
    """API endpoint to analyze exoplanet light curve data (CSV upload)."""
    if not model:
        return jsonify({'error': 'AI model is not loaded. Cannot perform analysis.'}), 503

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        try:
            # 1. Read the uploaded CSV file into a Pandas DataFrame
            # Since the uploaded file is in memory, we pass the file object directly.
            df = pd.read_csv(file)
            
            # 2. Clean the columns to match the model's expected features
            df = clean_columns(df)
            
            # NOTE: For production use, you must ensure the DataFrame has 
            # the exact same engineered features as used during training.
            
            # 3. Predict the classification (0=False Positive, 1=Confirmed/Candidate)
            predictions = model.predict(df)
            
            # 4. Get prediction probabilities for confidence score
            # Assumes the model returns probabilities for two classes (e.g., [Prob_0, Prob_1])
            prediction_probabilities = model.predict_proba(df)[:, 1] 

            # Prepare results to send back to the frontend
            results = {
                'prediction': predictions.tolist(),
                'probability': prediction_probabilities.tolist(),
                'count': len(predictions.tolist())
            }

            return jsonify(results), 200
        except Exception as e:
            # Catch any error during processing (e.g., mismatched features)
            app.logger.error(f"Analysis error: {e}")
            return jsonify({'error': f'Data processing failed: {e}'}), 500

if __name__ == '__main__':
    # You will need to run this Python script on your local machine separately
    # The React app expects it to run on port 5000
    print("Starting Flask server on http://127.0.0.1:5000/...")
    app.run(debug=True, port=5000)
