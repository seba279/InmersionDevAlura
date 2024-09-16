const inputContraseña = document.getElementById('contraseña');
const longitudCaracteres = document.getElementById('longitud');
const rango = document.getElementById('rango');
const botonGenerarContraseña = document.getElementById('botonGenerarContraseña');
const botonLimpiar = document.getElementById('botonLimpiar');
const mensaje = document.getElementById('mensaje');

const mayusculas = document.getElementById('mayusculas');
const minusculas = document.getElementById('minusculas');
const numero = document.getElementById('numeros');
const simbolo = document.getElementById('simbolos');


const slider = document.getElementById('sliderInput');
const selector = document.getElementById('selector');
const selectValue = document.getElementById('selectValue');
const selectBtn = document.querySelector('.selectBtn');

let longitud = 50;
const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?';

const configuracion = () => { 
    selectValue1.innerText = sliderInput1.value; 
    progressBar.style.width = `${sliderInput1.value}%`;
    mayusculas.checked = false;
    minusculas.checked = false;
    numero.checked = false;
    simbolo.checked = false;
}

const obtenerValor = () => {
    longitud = sliderInput1.value;
    selectValue1.innerText = longitud;
    progressBar.style.width = longitud +"%";
    selector1.style.left = longitud+"%";
}

const mostrarContraseña = (contraseña) => {
    inputContraseña.style.display = "flex";
    botonGenerarContraseña.setAttribute('disabled', 'true')
    inputContraseña.value = contraseña;
}

const desactivarElementos = () => {
    setTimeout(() => {
        sliderInput1.setAttribute('disabled','true');
        mayusculas.setAttribute('disabled','true');
        minusculas.setAttribute('disabled','true');
        numero.setAttribute('disabled','true');
        simbolo.setAttribute('disabled','true');
        botonLimpiar.removeAttribute("disabled");
    }, 3000);
}

const activarElementos = () => {
        sliderInput1.removeAttribute('disabled');
        mayusculas.removeAttribute('disabled');
        minusculas.removeAttribute('disabled');
        numero.removeAttribute('disabled');
        simbolo.removeAttribute('disabled');
        sliderInput1.value = 50;
        selector1.style.left = 50 + "%";
        botonLimpiar.setAttribute("disabled", 'true');
        inputContraseña.style.display = "none";
        botonGenerarContraseña.removeAttribute('disabled');
        mensaje.style.display = "none";
        configuracion();
}

const crearContraseña = (mayusculas, minusculas, numero, simbolo) => {
    let caracteresPermitidos = '';

    if (mayusculas.checked) {
        caracteresPermitidos += letrasMayusculas;
    }

    if (minusculas.checked) {
        caracteresPermitidos += letrasMinusculas;
    }

    if (numero.checked) {
        caracteresPermitidos += numeros;
    
    
    }
    if (simbolo.checked) {
        caracteresPermitidos += simbolos;
    }
        
    let nuevaContraseña = "";
  
    for (let i = 0; i < longitud; i++) {
        const numeroAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        const caracterAleatorio = caracteresPermitidos.charAt(numeroAleatorio);
        nuevaContraseña += caracterAleatorio;
    }
    
    mostrarContraseña(nuevaContraseña);
    desactivarElementos();
}

const mensajeTipoContraseña = (frase) => {
    mensaje.style.display = "flex"  
    mensaje.innerText = frase;
    botonGenerarContraseña.setAttribute('disabled', 'true');
}

const generarMensaje = () => {

    if((mayusculas.checked && minusculas.checked && numero.checked && simbolo.checked) || (mayusculas.checked && simbolo.checked && numero.checked) || (minusculas.checked && simbolo.checked && numero.checked)) {
       
        return mensajeTipoContraseña("La contraseña generada es fuerte");

    }else if((mayusculas.checked && minusculas.checked && numero.checked )|| (mayusculas.checked && minusculas.checked && simbolo.checked)){  

        return mensajeTipoContraseña("La contraseña generada es media");

    }else {

        return mensajeTipoContraseña("La contraseña generada es debil");
    }
}

const generarContraseña = () => {

    if(parseInt(sliderInput1.value) === 0){
        mensaje.style.display = "flex";
        mensaje.textContent = "La cantidad de caracteres debe ser mayor a 0";
        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2000);
    }else if(!mayusculas.checked && !minusculas.checked && !numero.checked && !simbolo.checked) {
        mensaje.style.display = "flex"  
        mensaje.innerText = 'Debe seleccionar al menos un tipo de carácter para la contraseña.';
        botonGenerarContraseña.setAttribute('disabled', 'true')
        setTimeout(() => {
            mensaje.style.display = "none";    
            botonGenerarContraseña.removeAttribute('disabled');
        }, 3000);

    }else {
        crearContraseña(mayusculas,minusculas,numero, simbolo);
        generarMensaje();
    }  
}

document.addEventListener('DOMContentLoaded', configuracion);

botonGenerarContraseña.addEventListener('click', generarContraseña);

botonLimpiar.addEventListener('click', activarElementos);

let selector1 = document.querySelector('.selector');
let selectValue1 = document.querySelector('.select-value');
let sliderInput1 = document.getElementById('slider-input');
let progressBar = document.querySelector('.progress-bar');

sliderInput1.addEventListener('input', obtenerValor)


