let inputNombre = document.getElementById('nombreGasto');
let botonAgregar = document.getElementById('botonFormulario');
let botonModificar = document.getElementById('botonModificar');
let mensaje = document.getElementById('mensaje');
let listaNombreGastos = [];
let listaValoresGastos = [];
let indiceModificar = null;


const configuracion = () => {
    inputNombre.focus();
}

document.addEventListener("DOMContentLoaded", configuracion);

const actualizarListaGastos = () => {
    const listaDeGastos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmLista = '';

    let totalGastos = 0;

    listaNombreGastos.forEach((elemento,posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        htmLista += `<li> ${elemento} - USD ${valorGasto.toFixed(2)}
                        <div class="botones">
                            <button onclick="modificarGasto(${posicion});"><i class="bi bi-pencil"></i></button>
                            <button onclick="eliminarGasto(${posicion});"><i class="bi bi-trash"></i></button>
                        </div>
                    </li>`

        //Calculamos el total de gastos
        totalGastos+= Number(valorGasto);
    })
    listaDeGastos.innerHTML = htmLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

const mensajeError = (texto, id) => {
    mensaje.style.display = "flex";
        mensaje.innerHTML = texto;
        setTimeout(() => {
            mensaje.style.display = "none";
            document.getElementById(id).focus();
        }, 2000);
}

const agregar = () => {
    listaNombreGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    actualizarListaGastos(); 
}

//Esta funcion se invoca cuando el usuario hace click en el boton de Agregar
const clickAgregar = () => {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;

    if(nombreGasto === ""){
        mensajeError("EL campo del nombre esta vacio", 'nombreGasto');
    }else if (valorGasto === ""){
        mensajeError("EL campo del valor esta vacio", "valorGasto");
    }else  if(parseInt(valorGasto) >= 150){
        mensajeError("Fijate estas pasandote del limite para gastar.", "valorGasto");
        //Agregando los elementos
        agregar();  
    }else {
         //Agregando los elementos
         agregar();
    }
}

const limpiar = () => {
    document.getElementById('nombreGasto').focus();
    document.getElementById('nombreGasto').value = "";
    document.getElementById('valorGasto').value = "";
}

const eliminarGasto = (posicion) => {
    listaNombreGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    actualizarListaGastos();
}

const modificarGasto = (posicion) => {
    document.getElementById('nombreGasto').value = listaNombreGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('nombreGasto').focus();
    botonAgregar.style.display = "none";
    botonModificar.style.display = "flex";
    indiceModificar = posicion;
}

const clickModificar = () => {
    const nombre = document.getElementById('nombreGasto').value;
    const gasto = document.getElementById('valorGasto').value ;

    listaNombreGastos[indiceModificar] = nombre;
    listaValoresGastos[indiceModificar] = gasto;
    actualizarListaGastos();

    document.getElementById('botonModificar').style.display = "none";
    document.getElementById('botonFormulario').style.display = "flex";
}

botonModificar.addEventListener('click', clickModificar);
botonAgregar.addEventListener('click', clickAgregar);




//mensaje de limitacion al superar los $150
// permitir dejar una descripcion
// boton actualizar datos en donde cambie en vez de agregar diga actualizar 

