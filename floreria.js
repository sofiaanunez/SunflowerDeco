
const mensajeCotizacion = document.getElementById('mensaje');

let flores = [];
flores.push({id:1, especie: "Rosas", color:"Rojas", precioUnidad:4000});
flores.push({id:2, especie: "Jazmines", color:"Blancos", precioUnidad:3000});
flores.push({id:3, especie: "Orquideas", color:"Violetas", precioUnidad:6000});
flores.push({id:4, especie: "Fresias", color:"Multicolor", precioUnidad:500});

flores.sort((a,b) => (a));

    function calcularPrecio(florSeleccionada, cuanto){

    let total = florSeleccionada.precioUnidad * cuanto;

        switch(florSeleccionada.especie.toLowerCase()){
            case "rosas":
            case "orquideas":
            case "fresias":
                mensajeCotizacion.textContent =`Las ${cuanto} ${florSeleccionada.especie} ${florSeleccionada.color} salen: $${total.toLocaleString('es-AR')}`;
                break;
            case "jazmines":
                mensajeCotizacion.textContent = `Los ${cuanto} ${florSeleccionada.especie} ${florSeleccionada.color} salen: $${total.toLocaleString('es-AR')}`;
                break;
            default:
                consultarStock();
        }
    }

    function elegirEspecie(){
    let mensaje = `¡Elegí tu regalo especial! \n`;

    flores.forEach(flor => {
        mensaje += `${flor.id} - ${flor.especie} ${flor.color} $${flor.precioUnidad} c/u \n`;
    });
    let input = prompt(mensaje);

    if(input === null){
        return;
    }
    let florSeleccionada;
    /*para buscar por id o nombre de especie*/
    if (!isNaN(input)) {
        florSeleccionada = flores.find(flor => flor.id === parseInt(input));
    } else {
        florSeleccionada = flores.find(flor => flor.especie.toLowerCase() === input.toLowerCase());
    }

    if(!florSeleccionada){
        consultarStock();
        return;
    }

    let cuanto = prompt(`¿Cuántas ${florSeleccionada.especie} te gustaría comprar?`);
    if(florSeleccionada && cuanto != null){
        calcularPrecio(florSeleccionada, cuanto);
    }else{
        consultarStock();
        return;
    }

    }

    function consultarStock(){
        elegirEspecie();
    }