
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

  // Función para finalizar la compra
function finalizarCompra() {
    alert(`Gracias por tu compra. El total a pagar es $${total.toFixed(2)}. ¡Vuelve pronto a Terrón de Azúcar Pastelería!`);
}

  // Iniciar el programa
mostrarProductos();









