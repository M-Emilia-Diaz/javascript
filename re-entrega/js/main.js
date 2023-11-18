//MACARONS

const sabores = [
    //Frutales
    {
        id: "frutilla",
        titulo: "Frutilla",
        imagen: "./assets/img/macRosa.jpg",
        categoria: {
            nombre: "Frutales",
            id: "frutales"
        },
        precio: 500
    },
    {
        id: "manzana",
        titulo: "Manzana",
        imagen: "./assets/img/macManzana.jpg",
        categoria: {
            nombre: "Frutales",
            id: "frutales"
        },
        precio: 500
    },
    {
        id: "maracuya",
        titulo: "Maracuya",
        imagen: "./assets/img/macMaracuya.jpg",
        categoria: {
            nombre: "Frutales",
            id: "frutales"
        },
        precio: 500
    },

    //Cremas
    {
        id: "limon",
        titulo: "Limon",
        imagen: "./assets/img/macLimon.jpg",
        categoria: {
            nombre: "Cremas",
            id: "cremas"
        },
        precio: 600
    },
    {
        id: "caramelo",
        titulo: "Caramelo",
        imagen: "./assets/img/macCaramelo.jpg",
        categoria: {
            nombre: "Cremas",
            id: "cremas"
        },
        precio: 600
    },
    {
        id: "marroc",
        titulo: "Marroc",
        imagen: "./assets/img/macMarroc.jpg",
        categoria: {
            nombre: "Cremas",
            id: "cremas"
        },
        precio: 600
    },

    //Chocolates
    {
        id: "chocolateBlanco",
        titulo: "Chocolate Blanco",
        imagen: "./assets/img/macBlanco.jpg",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates"
        },
        precio: 700
    },
    {
        id: "chocolateSuave",
        titulo: "Chocolate Suave",
        imagen: "./assets/img/macSuave.jpg",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates"
        },
        precio: 700
    },
    {
        id: "chocolateMenta",
        titulo: "Chocolate con menta",
        imagen: "./assets/img/macMenta.jpg",
        categoria: {
            nombre: "Chocolates",
            id: "chocolates"
        },
        precio: 700
    }
]


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

cargarSabores(sabores);

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

let saboresEnCarrito;

let saboresEnCarritoLS = localStorage.getItem("saboresEnCarrito");

if (saboresEnCarritoLS) {
    saboresEnCarrito = JSON.parse(saboresEnCarritoLS);
    actualizarNumeroCant();
} else {
    saboresEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const saborAgregado = sabores.find(sabor => sabor.id === idBoton);

    if(saboresEnCarrito.some(sabor => sabor.id === idBoton)) {
        const index = saboresEnCarrito.findIndex(sabor => sabor.id === idBoton);
        saboresEnCarrito[index].cantidad++;
    } else {
        saborAgregado.cantidad = 1;
        saboresEnCarrito.push(saborAgregado);
    }
    
    actualizarNumeroCant();
    
    localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));
}

function actualizarNumeroCant() {
    let nuevoNumeroCant = saboresEnCarrito.reduce((acc, sabor) => acc + sabor.cantidad, 0);
    numeroCant.innerText = nuevoNumeroCant;
    
}