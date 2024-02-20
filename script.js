// Evento que se dispara cuando se selecciona un archivo en el input file
document.getElementById('fileInput').addEventListener('change', function(event) {
    // Obtener el archivo seleccionado
    const file = event.target.files[0];
    const reader = new FileReader();

    // Leer el contenido del archivo como una URL de datos
    reader.onload = function(e) {
        const imageData = e.target.result;
        // Mostrar la previsualización de la imagen
        document.getElementById('imagePreview').src = imageData;
        // Reconocer el texto en la imagen
        recognizeImage(imageData);
    }

    reader.readAsDataURL(file);
});

// Evento para copiar el texto al portapapeles
document.getElementById('copyTextButton').addEventListener('click', function(event) {
    // Obtener el texto reconocido
    const outputText = document.getElementById('output').innerText;
    // Copiar el texto al portapapeles usando la API del navegador
    navigator.clipboard.writeText(outputText);
    // Mostrar un mensaje de confirmación
    alert('Texto copiado al portapapeles');
});

// Función para reconocer el texto en la imagen
function recognizeImage(imageData) {
    // Usar Tesseract.js para reconocer el texto en la imagen
    Tesseract.recognize(
        imageData, // Datos de la imagen
        'eng', // Idioma de reconocimiento
        { logger: m => console.log(m) } // Opciones adicionales (en este caso, para registrar el progreso en la consola)
    ).then(({ data: { text } }) => {
        // Mostrar el texto reconocido en el elemento de salida
        const outputElement = document.getElementById('output');
        outputElement.innerText = text;
        // Mostrar el texto reconocido en el área de texto editable
        document.getElementById('editedText').value = text;
    });
}
