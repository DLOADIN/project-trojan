from tensorflow.keras.models import load_model
import numpy as np
import json

class AccidentDetectionModel:
    class_nums = ["No Accident", "Accident"]  # Ensure correct order

    def __init__(self, model_json_file, model_weights_file):
        # Load model architecture from JSON
        with open(model_json_file, 'r') as json_file:
            model_json = json_file.read()                                                                                                                                                                   
            
        # Load model weights
        self.loaded_model = load_model(model_weights_file)

    def predict_accident(self, img):
        # Ensure img is float32 (model expects normalized input)
        img = img.astype("float32") / 255.0  # Normalize
        
        # Make prediction
        preds = self.loaded_model.predict(img)
        # Return class name and probabilities
        return AccidentDetectionModel.class_nums[np.argmax(preds)], preds