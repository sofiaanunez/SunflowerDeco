const section = document.querySelector("#seccion-flores");
const carritoCompras = document.querySelector("#carrito");
const buttonCarrito = document.querySelector("#toggle-carrito");
const items = document.querySelector("#items");
const cantidadItems = document.querySelector("#cantidad");
const total = document.querySelector("#total");
const finalizarCompraBtn = document.querySelector("#finalizar-compra");

// obtener el carrito desde localStorage si ya existía
let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (!Array.isArray(carrito)) {
    carrito = [];
    }

    // función para mostrar toasts al agregar o eliminar productos
    function mostrarToast(mensaje, color = "#ff80ab") {
    Toastify({
        text: mensaje,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        backgroundColor: color,
    }).showToast();
    }

    // obtengo los productos desde el archivo JSON
    let productos = [];

    fetch("catalogo.json")
    .then((response) => response.json())
    .then((data) => {
        productos = data.productos;
        renderCatalogo(productos); // muestro el catálogo una vez que tengo los datos
        actualizarCarrito(); // para que el carrito se actualice al inicio si ya tenía productos
    });

    // renderizo el catálogo dinámicamente
    function renderCatalogo(productos) {
    const flores = productos.map(
        (producto) =>
        `<div class="card" style="width:300px">
            <img src="./images/${producto.id}.jpg" class="card-img-top" alt="${producto.especie}"/>
            <div class="card-body">
                <h4 class="card-title">${producto.especie} ${producto.color}</h4>
                <p class="card-text">$${producto.precio}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
            </div>
        </div>`
    );

    section.innerHTML = flores.join("");
    }

    // botón que muestra u oculta el carrito de compras
    buttonCarrito.addEventListener("click", () => {
    carritoCompras.classList.toggle("mostrar");
    });

    function actualizarCarrito() {
    // info carrito de compras
    items.innerHTML = "";
    let precioTotal = 0;
    let totalProductos = 0;

    carrito.forEach((producto) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <span>${producto.especie} - ${producto.cantidad}</span>
        <button class="button-eliminar-carrito" data-id="${producto.id}">🗑️</button>
        `;
        items.appendChild(div);
        precioTotal += producto.precio * producto.cantidad;
        totalProductos += producto.cantidad;
    });

    total.textContent = `total: $${precioTotal}`;
    cantidadItems.textContent = totalProductos;
    }

    document.addEventListener("click", (event) => {
    if (event.target.classList.contains("agregar-carrito")) {
        const id = parseInt(event.target.dataset.id);
        const productoSeleccionado = productos.find((prod) => prod.id === id);
        console.log(productoSeleccionado);
        const productoExistente = carrito.find(
        (item) => item.id === productoSeleccionado.id
        );

        if (productoExistente) {
        productoExistente.cantidad += 1;
        } else {
        // si es nuevo, crea nuevo item (objeto) y se agrega a mi array de carrito
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }

        mostrarToast("Producto agregado al carrito 🛒");
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    if (event.target.classList.contains("button-eliminar-carrito")) {
        // obtengo id del elemento que seleccioné en el html
        const itemABorrar = parseInt(event.target.dataset.id);
        // busco indice dentro de mi array carrito en base al id del producto seleccionado
        const index = carrito.findIndex((item) => item.id === itemABorrar);

        if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
        } else {
        carrito.splice(index, 1);
        }

        // actualizo el localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarToast("Producto eliminado del carrito ❌", "#e74c3c");
        actualizarCarrito();
    }
    });

    // simula la finalización de la compra
    finalizarCompraBtn.addEventListener("click", () => {
    if (carrito.length === 0) {
        mostrarToast("Tu carrito está vacío", "#f39c12");
        return;
    }

    // borro todo y actualizo
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    mostrarToast("¡Gracias por tu compra!", "#2ecc71");
    });

    // para que el carrito siempre muestre cantidadItems si no se borró el almacenamiento
    // (se llama también desde el fetch para asegurar que renderice bien con los productos)
