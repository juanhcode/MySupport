export const DataArea = (select,nombre,apellido,id) => {
    select.innerHTML += `<option value="${id}">${nombre} ${apellido}</option>`
}