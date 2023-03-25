// VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const pMinimo = document.querySelector('#minimo');
const pMaximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

// Generar un Objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    pMinimo: '',
    pMaximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

// EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); // Muestra los autos al cargar

    // Llena las opciones de años
    llenarSelect();
})

// Event Listener para los Select de búsqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt (e.target.value);
    filtrarAuto();
});
pMinimo.addEventListener('change', e => {
    datosBusqueda.pMinimo = e.target.value;
    filtrarAuto();
});
pMaximo.addEventListener('change', e => {
    datosBusqueda.pMaximo = e.target.value;
    filtrarAuto();
});
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt (e.target.value);
    filtrarAuto();
});
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
});

// Funciones
function mostrarAutos(autos){

    limpiarHTML(); // Eliminar el HTML previo

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        // Insertar en el HTML
        resultado.appendChild(autoHTML)
    })
}

//Limpiar HTML
function limpiarHTML(){
    while( resultado.firstChild ){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect(){

    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agg las opciones de año al Select
    }
}

// Función que filtra en base a la búsqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if( marca ){
        return auto.marca === marca;
    }
    return auto;
};
function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if( year ){
        return auto.year === year;
    }
    return auto;
};
function filtrarMinimo(auto) {
    const {pMinimo} = datosBusqueda;
    if( pMinimo ){
        return auto.precio >= pMinimo;
    }
    return auto;
};
function filtrarMaximo(auto) {
    const {pMaximo} = datosBusqueda;
    if( pMaximo ) {
        return auto.precio <= pMaximo;
    }
    return auto;
};
function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
};
function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
};
function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if( color ) {
        return auto.color === color;
    }
    return auto;
};