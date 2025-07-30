    const section = document.querySelector("#seccion-flores");
    const carritoCompras = document.querySelector("#carrito");
    const buttonCarrito = document.querySelector("#toggle-carrito");
    const items = document.querySelector("#items");
    const cantidadItems = document.querySelector("#cantidad");
    const total = document.querySelector("#total")

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
    let carrito = JSON.parse(localStorage.getItem("carrito"));

    if (!Array.isArray(carrito)) {
        carrito = [];
    }

    buttonCarrito.addEventListener("click", () => {
        carritoCompras.classList.toggle("mostrar");
    });

    function actualizarCarrito() {
        // info carrito de compras
        items.innerHTML = "";
        let precioTotal = 0;

        carrito.forEach((producto) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <span>${producto.especie} - ${producto.cantidad}</span>
                <button class="button-eliminar-carrito" data-id="${producto.id}">🗑️</button>
            `;
            items.appendChild(div);
            precioTotal += producto.precio * producto.cantidad;
        });

        total.textContent = `total: $${precioTotal}`;
        cantidadItems.textContent = carrito.length;
    }

    document.addEventListener("click", (event) =>{
        if(event.target.classList.contains("agregar-carrito")){
            const id = parseInt(event.target.dataset.id);
            const productoSeleccionado = productos.find(prod => prod.id == id);
            console.log(productoSeleccionado);
            const productoExistente = carrito.find(item => item.id === productoSeleccionado.id);
            if(productoExistente){
                productoExistente.cantidad +=1;
            }else{
                //si es nuevo, crea nuevo item (objeto) y se agrega a mi array de carrito
                carrito.push({...productoSeleccionado, cantidad:1});
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }

        if(event.target.classList.contains("button-eliminar-carrito")){
            // obtengo id del elemento que seleccioné en el html
            const itemABorrar = parseInt(event.target.dataset.id);
            // busco indice dentro de mi array carrito en base al id del producto seleccionado
            const index = carrito.findIndex(item => item.id === itemABorrar);

            if(carrito[index].cantidad > 1){
                carrito[index].cantidad -= 1;
            }else{
                carrito.splice(index,1);
            }
            
            //actualizo el localStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        }

    });

    // para que el carrito siempre muestre cantidadItems si no se borró el almacenamiento
    actualizarCarrito();