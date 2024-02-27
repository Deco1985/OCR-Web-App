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
    const outputText = document.getElementById('editedText').value;
    navigator.clipboard.writeText(outputText)
      .then(() => {
        alert('Texto copiado al portapapeles');
      })
      .catch(error => {
        console.error('Error al copiar texto al portapapeles:', error);
        alert('Error al copiar texto al portapapeles');
      });
  },
  
    updateOutput: function(text) {
      const outputElement = document.getElementById('output');
      outputElement.innerText = text;
      document.getElementById('editedText').value = text;
    }
  };