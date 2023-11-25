
let productos = [];

fetch("./js/sabores.json")
.then(response => response.json())
.then(data => {
    sabores = data;
    cargarSabores(sabores);
})


const contenedorSabores = document.querySelector("#contenedorSabores");
const botonesCategorias = document.querySelectorAll(".botonCategoria");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".saborAgregar");
const numeroCant = document.querySelector("#numeroCant");



function cargarSabores(saboresElegidos) {

    contenedorSabores.innerHTML = "";

    saboresElegidos.forEach(sabor => {

        const div = document.createElement("div");
        div.classList.add("sabor");
        div.innerHTML = `
            <img class="saborImagen" src="${sabor.imagen}" alt="${sabor.titulo}">
                <div class="saborDetalles">
                    <h3 class="saborTitulo">${sabor.titulo}</h3>
                    <p class="saborPrecio">$${sabor.precio}</p>
                    <button class="saborAgregar" id="${sabor.id}">Agregar</button>
                </div>
        `;

        contenedorSabores.append(div);
    })

    actualizarBotonesAgregar();
    console.log(botonesAgregar);
}



botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
        const saborCategoria = sabores.find(sabor => sabor.categoria.id === e.currentTarget.id);
        tituloPrincipal.innerText = saborCategoria.categoria.nombre;
        
        const saboresBoton = sabores.filter(sabor => sabor.categoria.id === e.currentTarget.id);
        cargarSabores(saboresBoton);
        } else {
        tituloPrincipal.innerText = "Todos los sabores";
        cargarSabores(sabores);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".saborAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let saboresEnCarrito = JSON.parse(localStorage.getItem("saboresEnCarrito")) ?? [];

saboresEnCarrito.length > 0 ? actualizarNumeroCant() : null;


function agregarAlCarrito(e) {

    Toastify({
        text: "¡Macaron agegado!",
        duration: 3000,
        close: false,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, rgba(221, 160, 221, 0.678),  rgba(71, 36, 71, 0.678)",
        borderRadius: "2rem",
        },
        onClick: function(){} 
    }).showToast();
    

    const idBoton = e.currentTarget.id;
    const saborAgregado = sabores.find(sabor => sabor.id === idBoton);

    saboresEnCarrito.some(sabor => sabor.id === idBoton)
    ? saboresEnCarrito.find(sabor => sabor.id === idBoton).cantidad++
    : (saborAgregado.cantidad = 1, saboresEnCarrito.push(saborAgregado));
    

    actualizarNumeroCant();
    
    localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));
}

function actualizarNumeroCant() {
    let nuevoNumeroCant = saboresEnCarrito.reduce((acc, sabor) => acc + sabor.cantidad, 0);
    numeroCant.innerText = nuevoNumeroCant;
}