from flask import Flask, request, jsonify
from tensorflow import keras
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os

# Obtener el directorio de trabajo actual
current_dir = os.getcwd()

app = Flask(__name__)
model = keras.models.load_model("clasificador_basura.h5", compile=False)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
etiquetas = ['carton', 'vidrio', 'metal', 'papel', 'plastico', 'basura']

# Función para procesar la imagen y realizar la predicción
def predecir_basura_modelo(path):
    img = load_img(path, target_size=(224, 224))
    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)

    return predicted_class

@app.route('/', methods=['GET', 'POST'])
def index():
  if request.method == 'POST':
     # Se pide una imagen
     imagen = request.files.get("basura")
     if imagen is None or imagen.filename == "":
        return jsonify({"error":"No se envio una imagen adjunta"})
     # Construir la ruta completa al archivo temporal
     temp_path = os.path.join(current_dir, 'temp.jpg')
     # Guardar el archivo temporalmente
     imagen.save(temp_path)

     # Se realiza la predicción
     predicted_class = predecir_basura_modelo(temp_path)
     # Convertir a tipo de dato serializable en JSON (int)
     predicted_class_serializable = int(predicted_class)
     # Se obtiene la etiqueta correspondiente
     etiqueta_predicha = etiquetas[predicted_class_serializable]
     # Se elimina el archivo temporal
     os.remove(temp_path)
     # Se devuelve la respuesta
     return jsonify({'prediccion': etiqueta_predicha})
  return jsonify({'alerta': "El método de llamada debe ser un POST"})

if __name__ == '__main__':
    app.run(debug=False)