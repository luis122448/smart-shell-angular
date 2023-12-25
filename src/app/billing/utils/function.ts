export function downloadFile(data: any, fileName: string) {

  if (data.format === 'application/pdf') {
    openPdfFile(data, fileName);
    return;
  }

  if (data.bytes && data.bytes.length > 0) {
    const byteCharacters = atob(data.bytes); // Decodificar el Base64 a bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    // Crear un Blob con el tipo MIME correcto
    const blob = new Blob([byteArray], { type: data.format });

    // Crear una URL de objeto para el Blob
    const url = window.URL.createObjectURL(blob);

    // Crear un elemento de anclaje para desencadenar la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Establecer el nombre de archivo deseado
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    // Eliminar el elemento de anclaje del DOM
    document.body.removeChild(a);
  } else {
      // Los datos están vacíos, puedes mostrar un mensaje o no hacer nada
      console.error('Los datos del archivo están vacíos');
  }
}

export function openPdfFile(data: any, fileName: string) {
  // Verificar si el archivo es de tipo PDF
  if (data.format === 'application/pdf') {
    // Verificar si data.bytes no está vacío
    if (data.bytes && data.bytes.length > 0) {
      const byteCharacters = atob(data.bytes); // Decodificar el Base64 a bytes
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      // Crear un Blob con el tipo MIME correcto
      const blob = new Blob([byteArray], { type: 'application/pdf' });

      // Crear una URL de objeto para el Blob
      const url = window.URL.createObjectURL(blob);

      // Abrir el archivo en una nueva pestaña del navegador
      window.open(url, '_blank');

      // Revocar la URL de objeto después de abrir la pestaña
      window.URL.revokeObjectURL(url);
    } else {
      // Los datos están vacíos, puedes mostrar un mensaje o no hacer nada
      console.error('Los datos del archivo están vacíos');
    }
  } else {
    // El archivo no es un PDF, puedes mostrar un mensaje de error o manejarlo de otra manera
    console.error('El archivo no es un PDF');
  }
}
