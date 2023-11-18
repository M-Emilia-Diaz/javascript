let saboresEnCarrito = localStorage.getItem("saboresEnCarrito");

saboresEnCarrito = JSON.parse(saboresEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoSabores = document.querySelector("#carritoSabores");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
const contenedorCompraFinalizada = document.querySelector("#compraFinalizada");
let botonesEliminar = document.querySelectorAll(".carritoSaborEliminar");
const botonVaciar = document.querySelector("#carritoAccionVaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carritoAccionComprar");




function cargarSaboresCarrito() {
    if (saboresEnCarrito && saboresEnCarrito.length> 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoSabores.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCompraFinalizada.classList.add("disabled");
    
        contenedorCarritoSabores.innerHTML = "";
    
        saboresEnCarrito.forEach(sabor => {
    
            const div = document.createElement("div");
            div.classList.add("carritoSabor");
            div.innerHTML = `
                <img class="carritoSaborImg" src="${sabor.imagen}" alt="${sabor.titulo}">
                <div class="carritoNombreSabor">
                    <small>Nombre</small>
                    <h3>${sabor.titulo}</h3>
                </div>
                
                <div class="carritoSaborCantidad">
                    <small>Cantidad</small>
                    <p>${sabor.cantidad}</p>
                </div>
            
                <div class="carritoSaborPrecio">
                    <small>Precio</small>
                    <p>$${sabor.precio}</p>
                </div>
                <div class="carritoSaborSubtotal">
                    <small>Subtotal</small>
                    <p>$${sabor.precio * sabor.cantidad}</p>
                </div>
                <button class="carritoSaborEliminar" id="${sabor.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
    
            contenedorCarritoSabores.append(div);
        })
        
    
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoSabores.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCompraFinalizada.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarSaboresCarrito();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carritoSaborEliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;    
    const index = saboresEnCarrito.findIndex(sabor => sabor.id === idBoton);

    saboresEnCarrito.splice(index, 1);
    cargarSaboresCarrito();
    
    localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
        saboresEnCarrito.length = 0;
        localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));
        cargarSaboresCarrito();
}


function actualizarTotal() {
    const totalCalculado = saboresEnCarrito.reduce((acc, sabor) => acc + (sabor.precio * sabor.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
        saboresEnCarrito.length = 0;
        localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));
        
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoSabores.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCompraFinalizada.classList.remove("disabled");
}