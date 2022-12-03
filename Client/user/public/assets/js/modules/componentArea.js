export const DataArea = (select,nombre,id) => {
    select.innerHTML += `<option value="${id}">${nombre}</option>`
}