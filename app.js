//Llamamos los id
const botonAgregar= document.getElementById('agregar');
const botonEliminar= document.getElementById('eliminar');
const botonOrdenar= document.getElementById('ordenar');
const listas= document.getElementById('libros');
let inputPortada=document.getElementById('portada');
let inputTitle= document.getElementById('titulo');
let inputAutor= document.getElementById('autor');
let inputAño=document.getElementById('año');
let selectEstado= document.getElementById('estado');
let inputPrestado=document.getElementById('prestado');
let inputBuscar=document.getElementById('buscar')

//creamos los arrays que contienen los libros
let biblioteca=[];


//creamos la funcion de agregar

function Agregar(){
    if (inputPortada.value=="" || inputTitle.value=="" || inputAutor.value=="" || inputAño.value=="" || selectEstado.value=="" || inputPrestado.value==""){
        alert("Campos vacios, complete los campos solicitados")
    }

    else{
        let libro={
            portada: inputPortada.value,
            titulo: inputTitle.value,
            autor: inputAutor.value,
            año: inputAño.value,
            estado: selectEstado.value,
            prestado: inputPrestado.value
        };

        biblioteca.push(libro);
        console.log(biblioteca);
        inputPortada.value="";
        inputTitle.value="";
        inputAutor.value="";
        inputAño.value="";
        selectEstado.value="";
        inputPrestado.value="";


        Actualizar();
        guardarLocalStorage();
    }
};


function Actualizar(){

    listas.innerHTML="";
    var Cont = 0;
    biblioteca.forEach(function(x){
        const tarjeta= document.createElement('div');
        tarjeta.classList = 'tarjeta';
        tarjeta.id = Cont;
        listas.appendChild(tarjeta);
        const img= document.createElement('img');
        img.src= x.portada;
        tarjeta.appendChild(img);
        const titulo= document.createElement('h2');
        titulo.textContent= x.titulo;
        tarjeta.appendChild(titulo);
        const autor= document.createElement('p');
        autor.textContent= x.autor;
        tarjeta.appendChild(autor);
        const año= document.createElement('p');
        año.textContent= x.año;
        tarjeta.appendChild(año);
        let button= document.createElement('button');
        button.id='reservar';
        button.classList='botones'
        button.textContent=x.estado;
        button.addEventListener('click', function(){
            
            
            if (x.estado=='Disponible'){
                const cambio= document.createElement('b');
                cambio.innerHTML = window.prompt('Escriba el nombre de quien reserva: ')
                if(cambio.innerHTML==''){
                    alert('Asigne la persona que va tomar el libro ')
                }
                else{
                    button.textContent='No-Disponible'
                    tarjeta.appendChild(cambio);
                    x.estado='No-disponible';
                }
                
            }
            else if(x.estado='No-disponible'){
                button.textContent='Disponible'
                x.estado='Disponible'
                const textosAnteriores = tarjeta.querySelectorAll('b');
                textosAnteriores.forEach((elemento) => {
                elemento.remove();
                
                });
            }
            

            else{
                alert('algo pasa');
            }
        });
        tarjeta.appendChild(button);
        
        Cont++;
    });

    guardarLocalStorage();
};

function Eliminar(){
    

};


//creamos los eventos
botonAgregar.addEventListener('click', Agregar);
botonEliminar.addEventListener('click', Eliminar);

// creamos la funcion para el localstorage
function guardarLocalStorage(){
    //convertimos el array de libros a JSON  y lo guardamos en localStorage

    localStorage.setItem('biblioteca', JSON.stringify(biblioteca));
};

// creamos el evento cuando se inicie o cargue la pagina se cargue la biblioteca almacenada
window.addEventListener('load', function(){
    //Obtener la biblioteca en el localstorage
    const bibliotecaGuardada= localStorage.getItem('biblioteca');

    //si hay datos en el localStorage conviertelos de JSON a un arrya de objetos
    if(bibliotecaGuardada){
        biblioteca=JSON.parse(bibliotecaGuardada);

        //actualizar  la visualizacion de los datos cargados
        Actualizar();
    }
});


//Funciones para ordenar

function OrdenarPorTitulo() {
    biblioteca.sort((a, b) => a.titulo.localeCompare(b.titulo));
    Actualizar();
    CerrarVentanaEmergente();
};

function OrdenarPorAutor() {
    biblioteca.sort((a, b) => a.autor.localeCompare(b.autor));
    Actualizar();
    CerrarVentanaEmergente();
};

function OrdenarPorDisponibilidad() {
    biblioteca.sort((a, b) => a.estado.localeCompare(b.estado));
    Actualizar();
    CerrarVentanaEmergente();
};

function CerrarVentanaEmergente() {

    window.location.href = 'index.html';
};

document.addEventListener('DOMContentLoaded', function() {
    // Tu código en app.js
});