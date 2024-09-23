let inputNombre = document.getElementById('nombreGasto');
let botonAgregar = document.getElementById('botonFormulario');
let botonModificar = document.getElementById('botonModificar');
let descripcionGasto = document.getElementById('descripcionGasto');
let mensaje = document.getElementById('mensaje');

let listaNombreGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];
let indiceModificar = null;


const configuracion = () => inputNombre.focus();

document.addEventListener("DOMContentLoaded", configuracion);

const actualizarListaGastos = () => {
    const listaDeGastos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmLista = '';

    let totalGastos = 0;

    listaNombreGastos.forEach((nombre,posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]).toFixed(2);
        const claseValor = valorGasto >= 150 ? "monto" : "montoVerde";
        const descGasto = listaDescripcionGastos[posicion];

        htmLista += `<li>
                        <div class="contenedor">
                            <h5><strong>Nombre y Monto del Gasto</strong></h5>
                            <h6> ${nombre}  <strong class="${claseValor}"> $ ${valorGasto}</strong></h6>
                            <h5><strong>Detalle</strong></h5>
                            <h6>${descGasto}</h6>
                        </div>
                        <div class="botones">
                            <button onclick="modificarGasto(${posicion});"><i class="bi bi-pencil"></i></button>
                            <button onclick="eliminarGasto(${posicion});"><i class="bi bi-trash"></i></button>
                        </div>
                    </li>`;

        totalGastos+= Number(valorGasto);
    });

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

const agregar = (nombreGasto, valorGasto, descripcionGasto) => {
    listaNombreGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionGastos.push(descripcionGasto);
    actualizarListaGastos(); 
}

//Esta funcion se invoca cuando el usuario hace click en el boton de Agregar
const clickAgregar = () => {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    if (!nombreGasto) return mensajeError("El campo del nombre está vacío", 'nombreGasto');
    if (!descripcionGasto) return mensajeError("El campo de la descripción está vacío", 'descripcionGasto');
    if (!valorGasto || valorGasto <= 0) return mensajeError("EL campo del valor esta vacio o es un valor invalido", 'valorGasto');
    
    if (parseInt(valorGasto) >= 150) {
        mensajeError("Fijate estas pasandote del limite para gastar.", "nombreGasto");
    }
    agregar(nombreGasto, valorGasto, descripcionGasto);
}

const limpiar = () => {
    document.getElementById('nombreGasto').focus();
    document.getElementById('nombreGasto').value = "";
    document.getElementById('valorGasto').value = "";
    document.getElementById('descripcionGasto').value = "";
}

const eliminarGasto = (posicion) => {
    listaNombreGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionGastos.splice(posicion, 1);
    actualizarListaGastos();
    botonModificar.style.display = "none";
    botonAgregar.style.display = "flex";
}

const modificarGasto = (posicion) => {
    document.getElementById('nombreGasto').value = listaNombreGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionGastos[posicion];
    document.getElementById('nombreGasto').focus();
    botonAgregar.style.display = "none";
    botonModificar.style.display = "flex";
    indiceModificar = posicion;
}

const clickModificar = () => {
    const nombre = document.getElementById('nombreGasto').value;
    const gasto = document.getElementById('valorGasto').value ;
    const descripcion = document.getElementById('descripcionGasto').value ;

    listaNombreGastos[indiceModificar] = nombre;
    listaValoresGastos[indiceModificar] = gasto;
    listaDescripcionGastos[indiceModificar] = descripcion;
    actualizarListaGastos();

    document.getElementById('botonModificar').style.display = "none";
    document.getElementById('botonFormulario').style.display = "flex";
}

botonModificar.addEventListener('click', clickModificar);
botonAgregar.addEventListener('click', clickAgregar);
