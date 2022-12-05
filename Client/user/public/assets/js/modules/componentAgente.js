export const DataAgente = (select,nombre,id,apellido) => {
    select.innerHTML += `<option value="${id}">${nombre} ${apellido}</option>`
}