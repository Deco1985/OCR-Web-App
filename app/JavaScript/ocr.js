// ocr.js - Módulo para el procesamiento de OCR
const OCR = {
    recognizeText: function(imageData) {
      Tesseract.recognize(
        imageData,
        'eng',
        { logger: m => console.log(m) } // Opciones adicionales (en este caso, para registrar el progreso en la consola)
      ).then(({ data: { text } }) => {
        UI.updateOutput(text); // Actualiza la salida de texto en la interfaz de usuario
      });
    }
  };