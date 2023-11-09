// Declaración de variables
const productos = {
    cupcakes: {
    sabores: ["Chocolate", "Cafe", "Frutilla"],
    precios: [400, 450, 500]
    },
    macarons: {
    sabores: ["Limón", "Caramelo", "Banana"],
    precios: [300, 350, 400]
    }
};
let carrito = [];
let total = 0;

  // Función para mostrar las opciones
function mostrarOpciones(opciones) {
    return prompt(`¿Que tenes ganas de probar?:\n${opciones}`);
}

  // Función para mostrar los productos 
function mostrarProductos() {
    alert("Bienvenido a Terrón de Azúcar Pastelería");
    alert("Nuestros productos estrella son:\n1. Cupcakes\n2. Macarons");

    const opcion = parseInt(mostrarOpciones("1 para cupcakes, 2 para macarons"));
    if (opcion === 1) {
    mostrarSabores("cupcakes");
    } else if (opcion === 2) {
    mostrarSabores("macarons");
    } else {
    alert("Opción incorrecta. Por favor, elige 1 o 2.");
    mostrarProductos();
    }
}

  // Función para mostrar los sabores de un producto
function mostrarSabores(producto) {
    const saborIndex = parseInt(
    mostrarOpciones(
        `Elige un sabor para ${producto}:\n1. ${productos[producto].sabores[0]}\n2. ${productos[producto].sabores[1]}\n3. ${productos[producto].sabores[2]}`
    )
    );

    if (saborIndex >= 1 && saborIndex <= 3) {
    const precio = productos[producto].precios[saborIndex - 1];
    carrito.push({ producto, sabor: productos[producto].sabores[saborIndex - 1], precio });
    alert(`Añadido ${producto} de ${productos[producto].sabores[saborIndex - 1]}  al carrito por $${precio}`);
    const opcion = mostrarOpciones("¿Deseas agregar otro producto al carrito?\n1. Sí\n2. No");
    if (parseInt(opcion) === 1) {
        mostrarProductos();
    } else {
        mostrarCarrito();
    }
    } else {
    alert("Opción incorrecta. Por favor, elige 1, 2 o 3.");
    mostrarSabores(producto);
    }
}

// Función para buscar un producto por nombre
function buscarProductoPorNombre(nombre) {
    const producto = productos[nombre];
    if (producto) {
        return {
            nombre,
            sabores: producto.sabores,
            precios: producto.precios
        };
    }
    return null;
}

// Función para filtrar productos por sabor
function filtrarProductosPorSabor(producto, sabor) {
    return carrito.filter(item => item.producto === producto && item.sabor === sabor);
}

  // Función para mostrar el carrito
function mostrarCarrito() {
    let carritoTexto = "Tu carrito de compras:\n";
    for (const item of carrito) {
    carritoTexto += `${item.sabor} ${item.producto} - $${item.precio}\n`;
    total += item.precio;
    }
    carritoTexto += `Total: $${total.toFixed(2)}`;
    alert(carritoTexto);
    const opcion = mostrarOpciones("¿Qué deseas hacer?\n1. Finalizar la compra\n2. Agregar otro producto");
    if (parseInt(opcion) === 1) {
    finalizarCompra();
    } else {
    mostrarProductos();
    }
}

// Función para buscar un producto en el carrito
function buscarProductoEnCarrito(producto) {
    return carrito.find(item => item.producto === producto);
}

  // Función para finalizar la compra
function finalizarCompra() {
    alert(`Gracias por tu compra. El total a pagar es $${total.toFixed(2)}. ¡Vuelve pronto a Terrón de Azúcar Pastelería!`);
}

  // Iniciar el programa
mostrarProductos();

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}


// Función para actualizar la visualización del carrito en el DOM
function actualizarCarritoEnDOM() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '';
    
    for (const item of carrito) {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.sabor} ${item.producto} - $${item.precio}`;
        carritoElement.appendChild(itemElement);
    }
}

// Llamar a esta función en la carga inicial del DOM
function inicializarDOM() {
    const carritoElement = document.createElement('div');
    carritoElement.id = 'carrito';
    document.body.appendChild(carritoElement);
    actualizarCarritoEnDOM();
}

// Llamar a esta función al finalizar la compra para limpiar el carrito en el DOM
function limpiarCarritoEnDOM() {
    const carritoElement = document.getElementById('carrito');
    carritoElement.innerHTML = '';
}