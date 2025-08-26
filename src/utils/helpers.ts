export const cleanFileName = (fileName: string) => {
    const file = fileName.split('.').shift();
    return file;
};

export const obtenerFechaEnFormato = (fechaAModificar: Date) => {
    // Obtiene día, mes y año
    const dia = ('0' + fechaAModificar.getDate()).slice(-2);
    const mes = ('0' + (fechaAModificar.getMonth() + 1)).slice(-2);
    const anio = fechaAModificar.getFullYear().toString().slice(-2); // Tomando solo los últimos dos dígitos

    // Obtiene hora y minutos
    const horas = ('0' + fechaAModificar.getHours()).slice(-2);
    const minutos = ('0' + fechaAModificar.getMinutes()).slice(-2);

    // Construye la cadena en el formato deseado
    const fechaFormateada = `${dia}${mes}${anio} ${horas}${minutos}`;

    return fechaFormateada;
};
