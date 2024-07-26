# app.py
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn import metrics

app = Flask(__name__)

CORS(app)

# Load and prepare the data
gold_data = pd.read_csv(r'C:\Users\tusha\OneDrive\Desktop\gold price predictor\gld_price_data.csv')
X = gold_data.drop(['Date', 'GLD'], axis=1)
Y = gold_data['GLD']

# Train the model
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2)
model = RandomForestRegressor(n_estimators=100)
model.fit(X_train, Y_train)

# Predict function
def predict(features):
    features = np.array(features).reshape(1, -1)
    return model.predict(features)[0]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict_route():
    data = request.get_json()  # Use get_json() to parse JSON data
    features = [data['spx'], data['uso'], data['slv'], data['eurusd']]  # Ensure this matches your model input
    prediction = predict(features)
    return jsonify({'prediction': prediction})


if __name__ == '__main__':
    app.run(debug=True)
