// ui.js - Módulo para la interfaz de usuario
const UI = {
    init: function() {
      document.getElementById('fileInput').addEventListener('change', this.handleFileChange);
      document.getElementById('copyTextButton').addEventListener('click', this.copyTextToClipboard);
    },
  
    handleFileChange: function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const imageData = e.target.result;
        UI.updateImagePreview(imageData);
        OCR.recognizeText(imageData);
      }
  
      reader.readAsDataURL(file);
    },
  
    updateImagePreview: function(imageData) {
      document.getElementById('imagePreview').src = imageData;
    },
  
    copyTextToClipboard: function() {
      const outputText = document.getElementById('output').innerText;
      navigator.clipboard.writeText(outputText);
      alert('Texto copiado al portapapeles');
    },
  
    updateOutput: function(text) {
      const outputElement = document.getElementById('output');
      outputElement.innerText = text;
      document.getElementById('editedText').value = text;
    }
  };
  
  // ocr.js - Módulo para el procesamiento de OCR
  const OCR = {
    recognizeText: function(imageData) {
      Tesseract.recognize(
        imageData,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        UI.updateOutput(text);
      });
    }
  };
  
  // script.js - Punto de entrada
  document.addEventListener('DOMContentLoaded', function() {
    UI.init();
  });
