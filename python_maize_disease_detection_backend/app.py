from flask import Flask, request, jsonify
import cv2
import numpy as np
import tensorflow as tf
import os
import uuid

app = Flask(__name__)

# Load the pre-trained model and class names
current_dir = os.path.dirname(os.path.abspath(__file__))


loaded_model = tf.keras.models.load_model("/Users/soshaldahal/Documents/mazie_disease")
class_names = ['Corn___Common_Rust', 'Corn___Gray_Leaf_Spot', 'Corn___Healthy', 'Corn___Northern_Leaf_Blight']

uploads_folder = "uploads"
uploads_path = os.path.join(current_dir, uploads_folder)



# Create the uploads folder if it doesn't exist
if not os.path.exists(uploads_path):
    os.makedirs(uploads_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        image_file = data.get('image')       
        image_path = os.path.join(uploads_path, image_file)

        

        if not os.path.exists(image_path):
            return jsonify({'error': 'File not found'})

        maize_image = cv2.imread(image_path)
        maize_image = cv2.resize(maize_image, (299, 299))
        maize_image = tf.expand_dims(maize_image, 0)

        # Make prediction using the loaded model
        prediction = loaded_model.predict(maize_image)
        index = np.argmax(prediction)
        class_name = class_names[index]

        result = {
            'predicted_class': class_name,
            'confidence': float(prediction[0][index]),
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
