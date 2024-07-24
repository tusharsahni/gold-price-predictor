from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load the model
model = pickle.load(open('C:/Users/tusha/OneDrive/Desktop/gold price predictor/backend/model.pkl', 'rb'))


@app.route('/')
def home():
    return "Gold Price Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data])
    prediction = model.predict(df)
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
