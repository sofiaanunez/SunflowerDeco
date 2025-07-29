    const section = document.querySelector("#seccion-flores");
    const itemsCarrito = document.getElementById("items-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const toggleButton = document.getElementById("toggle-carrito");
    const carritoContenedor = document.getElementById("carrito");

    const flores = productos.map(
        (producto) =>
            `<div class="card" style="width:300px">
                <img src="./images/logo.png" class="card-img-top" alt="${producto.especie}"/>
                <div class="card-body">
                    <h5 class="card-title">${producto.especie} - ${producto.color}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                </div>
            </div>`
    );

    section.innerHTML = flores.join("");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    toggleButton.addEventListener("click", () => {
        carritoContenedor.classList.toggle("mostrar");
    });

    function actualizarCarrito() {
        itemsCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <span>${producto.especie} - $${producto.precio}</span>
                <button class="btn-eliminar-carrito" data-index="${index}">🗑️</button>
            `;
            itemsCarrito.appendChild(div);
            total += producto.precio;
        });

        totalCarrito.textContent = `Total: $${total}`;
        document.getElementById("cantidad").textContent = carrito.length;
    }

    document.addEventListener("click", function(event){
        if(event.target.classList.contains("agregar-carrito")){
            const id = parseInt(event.target.dataset.id);
            const producto = productos.find(prod => prod.id === id);
            carrito.push(producto);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }

        if (event.target.classList.contains("btn-eliminar-carrito")) {
            const index = parseInt(event.target.dataset.index);
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }
    });

    actualizarCarrito();
