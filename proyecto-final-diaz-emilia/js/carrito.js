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

    Toastify({
        text: "Macaron eliminado",
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
    const index = saboresEnCarrito.findIndex(sabor => sabor.id === idBoton);

    saboresEnCarrito.splice(index, 1);
    cargarSaboresCarrito();
    
    localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    Swal.fire({
        title: "¿Vaciar carrito?",
        icon: "question",
        iconColor: "rgba(71, 36, 71, 0.678)",
        html: `Se eliminarán todos los macarons agregados`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Sí`,
        confirmButtonColor: "rgb(221, 160, 221)",
        cancelButtonText: `No`,
        cancelButtonColor: "rgb(221, 160, 221)",
        }).then((result) => {
            if (result.isConfirmed) {
                saboresEnCarrito.length = 0;
                localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));
                cargarSaboresCarrito();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    iconColor: "rgba(71, 36, 71, 0.678)",
                    title: "Carrito Eliminado",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    
        
}


function actualizarTotal() {
    const totalCalculado = saboresEnCarrito.reduce((acc, sabor) => acc + (sabor.precio * sabor.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    Swal.fire({
        title: "¿Comprar carrito?",
        icon: "question",
        iconColor: "rgba(71, 36, 71, 0.678)",
        html: `Comprarás ${saboresEnCarrito.reduce((acc, sabor) => acc + sabor.cantidad, 0)} macarons`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Sí`,
        confirmButtonColor: "rgb(221, 160, 221)",
        cancelButtonText: `No`,
        cancelButtonColor: "rgb(221, 160, 221)",
        }).then((result) => {
            if (result.isConfirmed) {
                
                Swal.fire({
                    position: "center",
                    icon: "success",
                    iconColor: "rgba(71, 36, 71, 0.678)",
                    title: "Compra exitosa!",
                    html: `Compraste ${saboresEnCarrito.reduce((acc, sabor) => acc + sabor.cantidad, 0)} macarons`,
                    showConfirmButton: false,
                    timer: 1500
                });
                saboresEnCarrito.length = 0;
                localStorage.setItem("saboresEnCarrito", JSON.stringify(saboresEnCarrito));
                cargarSaboresCarrito();
            }
        });
}