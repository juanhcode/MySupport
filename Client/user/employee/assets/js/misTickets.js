const select = document.getElementById('select');
select.addEventListener('change',async ()=>{
    let estado = select.value;
    if(estado == 'All'){
        await getAll();
    };
})


const getAll(){
    
}