let ingresos = 0;
let gastos = 0;
let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
movimientos.forEach(function(movimiento) {

    if (movimiento.tipo === "ingreso") {
        ingresos = ingresos + movimiento.cantidad;
    } else {
        gastos = gastos + movimiento.cantidad;
    }

});
const ahorroInicial = ingresos - gastos;

document.getElementById("totalIngresos").textContent =
    "$" + ingresos.toFixed(2);

document.getElementById("totalGastos").textContent =
    "$" + gastos.toFixed(2);

document.getElementById("totalAhorro").textContent =
    "$" + ahorroInicial.toFixed(2);

mostrarMovimientos();
const boton = document.getElementById("botonAgregar");

boton.addEventListener("click", function() {

    const descripcion = document.getElementById("descripcion").value;
    const cantidad = Number(document.getElementById("cantidad").value);
    const tipo = document.getElementById("tipo").value;

    if (descripcion === "" || cantidad <= 0) {
        alert("Por favor, escribe una descripción y una cantidad válida.");
        return;
    }

    if (tipo === "ingreso") {
        ingresos = ingresos + cantidad;
    } else {
        gastos = gastos + cantidad;
    }
movimientos.push({
    descripcion: descripcion,
    cantidad: cantidad,
    tipo: tipo
});
localStorage.setItem("movimientos", JSON.stringify(movimientos));
mostrarMovimientos();
    const ahorro = ingresos - gastos;

    document.getElementById("totalIngresos").textContent =
        "$" + ingresos.toFixed(2);

    document.getElementById("totalGastos").textContent =
        "$" + gastos.toFixed(2);

    document.getElementById("totalAhorro").textContent =
        "$" + ahorro.toFixed(2);

    document.getElementById("descripcion").value = "";
    document.getElementById("cantidad").value = "";

});
function mostrarMovimientos() {

    const lista = document.getElementById("listaMovimientos");

    lista.innerHTML = "";

    movimientos.forEach(function(movimiento, indice) {

        const nuevoMovimiento = document.createElement("div");
nuevoMovimiento.classList.add("movimiento");
        if (movimiento.tipo === "ingreso") {
 
       nuevoMovimiento.innerHTML =
    "🟢 " + movimiento.descripcion + " +$" + movimiento.cantidad;

} else {

    nuevoMovimiento.innerHTML =
        "🔴 " + movimiento.descripcion + " -$" + movimiento.cantidad;

}
const botonEliminar = document.createElement("button");

botonEliminar.textContent = "🗑️ Eliminar";

botonEliminar.onclick = function() {
    eliminarMovimiento(indice);
};

nuevoMovimiento.appendChild(botonEliminar);
lista.appendChild(nuevoMovimiento);
    });

}
function eliminarMovimiento(indice) {

    const movimiento = movimientos[indice];

    if (movimiento.tipo === "ingreso") {
        ingresos = ingresos - movimiento.cantidad;
    } else {
        gastos = gastos - movimiento.cantidad;
    }

    movimientos.splice(indice, 1);
localStorage.setItem("movimientos", JSON.stringify(movimientos));
    const ahorro = ingresos - gastos;

    document.getElementById("totalIngresos").textContent =
        "$" + ingresos.toFixed(2);

    document.getElementById("totalGastos").textContent =
        "$" + gastos.toFixed(2);

    document.getElementById("totalAhorro").textContent =
        "$" + ahorro.toFixed(2);

    mostrarMovimientos();
    }
    const botonCalcular = document.getElementById("botonCalcular");

botonCalcular.addEventListener("click", function() {

    const meta = Number(document.getElementById("metaAhorro").value);

    const ahorroMensual = Number(
        document.getElementById("ahorroMensual").value
    );
const mesesDeseados = Number(
    document.getElementById("mesesDeseados").value
);
    if (meta <= 0 || ahorroMensual <= 0) {
        alert("Ingresa cantidades válidas.");
        return;
    }

    const meses = Math.ceil(meta / ahorroMensual);
const años = Math.floor(meses / 12);

const mesesRestantes = meses % 12;

let tiempo = "";
    if (años > 0) {

    const textoAños = años === 1 ? "año" : "años";
    const textoMeses = mesesRestantes === 1 ? "mes" : "meses";

    if (mesesRestantes === 0) {
        tiempo = años + " " + textoAños;
    } else {
        tiempo = años + " " + textoAños +
                 " y " + mesesRestantes + " " + textoMeses;
    }

} else {

    const textoMeses = meses === 1 ? "mes" : "meses";

    tiempo = meses + " " + textoMeses;
}

let resultado =
    "🎯 <strong>Meta:</strong> $" + meta.toFixed(2) +
    "<br>💰 <strong>Ahorro mensual:</strong> $" + ahorroMensual.toFixed(2) +
    "<br>⏱️ <strong>Tiempo estimado:</strong> " + tiempo;

if (mesesDeseados > 0) {

    const necesarioPorMes = meta / mesesDeseados;

    resultado +=
        "<br><br>📅 Si quieres alcanzar tu meta en " +
        mesesDeseados + " meses:" +
        "<br>💵 Necesitas ahorrar <strong>$" +
        necesarioPorMes.toFixed(2) +
        " al mes</strong>.";
}
document.getElementById("resultadoAhorro").innerHTML = resultado;

if (mesesDeseados > 0) {

    const necesarioPorMes = meta / mesesDeseados;

    let porcentaje = (ahorroMensual / necesarioPorMes) * 100;

    if (porcentaje > 100) {
        porcentaje = 100;
    }

    const barra = document.getElementById("barraProgreso");

    barra.style.width = porcentaje + "%";

    if (porcentaje < 50) {
        barra.style.backgroundColor = "#dc2626";
    } else if (porcentaje < 100) {
        barra.style.backgroundColor = "#f59e0b";
    } else {
        barra.style.backgroundColor = "#16a34a";
    }

    document.getElementById("porcentajeProgreso").textContent =
        "Vas al " + Math.round(porcentaje) +
        "% del ahorro mensual necesario.";
const mensaje = document.getElementById("mensajeAhorro");

if (porcentaje < 50) {
    mensaje.style.backgroundColor = "#fee2e2";
    mensaje.style.color = "#991b1b";
} else if (porcentaje < 100) {
    mensaje.style.backgroundColor = "#fef3c7";
    mensaje.style.color = "#92400e";
} else {
    mensaje.style.backgroundColor = "#dcfce7";
    mensaje.style.color = "#166534";
}
const totalEnPlazo = ahorroMensual * mesesDeseados;
const faltanteTotal = meta - totalEnPlazo;
    const diferencia = necesarioPorMes - ahorroMensual;

    if (diferencia > 0) {

    document.getElementById("mensajeAhorro").innerHTML =
        "💰 En " + mesesDeseados + " meses juntarías <strong>$" +
        totalEnPlazo.toFixed(2) + "</strong>." +
        "<br>⚠️ Te faltarían <strong>$" +
        faltanteTotal.toFixed(2) + "</strong> para alcanzar tu meta." +
        "<br>📈 Necesitas aumentar tu ahorro en <strong>$" +
        diferencia.toFixed(2) + " al mes</strong>.";

    } else {

    const excedente = totalEnPlazo - meta;

    if (excedente > 0) {

        document.getElementById("mensajeAhorro").innerHTML =
            "✅ <strong>¡Excelente!</strong> Alcanzarías tu meta." +
            "<br>💰 En " + mesesDeseados + " meses juntarías <strong>$" +
            totalEnPlazo.toFixed(2) + "</strong>." +
            "<br>🎉 Tendrías <strong>$" +
            excedente.toFixed(2) + "</strong> adicionales.";

    } else {

        document.getElementById("mensajeAhorro").innerHTML =
            "✅ <strong>¡Perfecto!</strong> Ahorrando esa cantidad llegarías exactamente a tu meta.";

    }

}
    }

});                                 
const consejos = [
    "💰 Aparta una parte de tus ingresos antes de comenzar a gastar.",
    "🛒 Antes de comprar algo, pregúntate si realmente lo necesitas.",
    "📋 Lleva un registro de tus gastos para saber en qué se va tu dinero.",
    "🎯 Establece una meta de ahorro específica y alcanzable.",
    "🍔 Reducir pequeños gastos frecuentes puede generar un gran ahorro.",
    "💳 Evita utilizar crédito para compras que no puedas pagar después.",
    "🏦 Intenta crear un fondo para gastos inesperados.",
    "📅 Planea tus gastos antes de comenzar cada mes."
];

const botonConsejo = document.getElementById("botonConsejo");
const consejoTexto = document.getElementById("consejoTexto");
let ultimoConsejo = -1;
botonConsejo.addEventListener("click", function() {

   let numeroAleatorio;

do {
    numeroAleatorio = Math.floor(
        Math.random() * consejos.length
    );
} while (numeroAleatorio === ultimoConsejo);

ultimoConsejo = numeroAleatorio;

consejoTexto.textContent = consejos[numeroAleatorio];

});
let metas = JSON.parse(localStorage.getItem("metas")) || [];
const botonMeta = document.getElementById("botonMeta");

botonMeta.addEventListener("click", function() {

    const nombreMeta = document.getElementById("nombreMeta").value;

    const cantidadMeta = Number(
        document.getElementById("cantidadMeta").value
    );

    const ahorradoMeta = Number(
        document.getElementById("ahorradoMeta").value
    );

    if (nombreMeta === "" || cantidadMeta <= 0 || ahorradoMeta < 0) {
        alert("Completa correctamente los datos de tu meta.");
        return;
    }

    let porcentajeMeta = (ahorradoMeta / cantidadMeta) * 100;

    if (porcentajeMeta > 100) {
        porcentajeMeta = 100;
    }
metas.push({
    nombre: nombreMeta,
    cantidad: cantidadMeta,
    ahorrado: ahorradoMeta,
    porcentaje: porcentajeMeta
});
localStorage.setItem("metas", JSON.stringify(metas));
mostrarMetas();
    const faltanteMeta = cantidadMeta - ahorradoMeta;
const barraMeta = document.getElementById("barraMeta");

barraMeta.style.width = porcentajeMeta + "%";
if (porcentajeMeta < 50) {
    barraMeta.style.backgroundColor = "red";
} else if (porcentajeMeta < 100) {
    barraMeta.style.backgroundColor = "orange";
} else {
    barraMeta.style.backgroundColor = "green";
}
document.getElementById("porcentajeMetaTexto").textContent =
    Math.round(porcentajeMeta) + "% de tu meta completado";
    if (faltanteMeta > 0) {

        document.getElementById("resultadoMeta").innerHTML =
            "🎯 <strong>" + nombreMeta + "</strong>" +
            "<br>💰 Meta: <strong>$" + cantidadMeta.toFixed(2) + "</strong>" +
            "<br>💵 Ahorrado: <strong>$" + ahorradoMeta.toFixed(2) + "</strong>" +
            "<br>📊 Progreso: <strong>" + Math.round(porcentajeMeta) + "%</strong>" +
            "<br>⏳ Te faltan: <strong>$" + faltanteMeta.toFixed(2) + "</strong>";

    } else {

        document.getElementById("resultadoMeta").innerHTML =
            "🎉 <strong>¡Meta alcanzada!</strong>" +
            "<br>🎯 " + nombreMeta +
            "<br>💰 Has alcanzado tu objetivo de $" +
            cantidadMeta.toFixed(2);

    }

});
function mostrarMetas() {

    const listaMetas = document.getElementById("listaMetas");

    listaMetas.innerHTML = "";

    metas.forEach(function(meta, indice) {

        const tarjetaMeta = document.createElement("div");

        tarjetaMeta.classList.add("tarjeta-meta");

        let colorMeta;

if (meta.porcentaje < 50) {
    colorMeta = "#dc2626";
} else if (meta.porcentaje < 100) {
    colorMeta = "#f59e0b";
} else {
    colorMeta = "#16a34a";
}
const dineroFaltante = Math.max(0, meta.cantidad - meta.ahorrado);
tarjetaMeta.innerHTML =
    "<strong>🎯 " + meta.nombre + "</strong>" +
    "<p>Meta: <strong>$" + meta.cantidad.toFixed(2) + "</strong></p>" +
    "<p>Ahorrado: <strong>$" + meta.ahorrado.toFixed(2) + "</strong></p>" +
"<p>Te falta: <strong>$" + dineroFaltante.toFixed(2) + "</strong></p>" +
    "<div class='barra-meta-individual'>" +
        "<div style='width:" + meta.porcentaje +
        "%; background-color:" + colorMeta + ";'></div>" +
    "</div>" +

    "<p><strong>" + Math.round(meta.porcentaje) + "% completado</strong></p>" +

    "<div class='agregar-ahorro'>" +
        "<input type='number' placeholder='Cantidad a agregar' class='cantidad-agregar'>" +
        "<button class='boton-agregar-ahorro'>💰 Agregar ahorro</button>" +
    "</div>";
const botonActualizarMeta = document.createElement("button");

botonActualizarMeta.textContent = "✏️ Actualizar";
botonActualizarMeta.classList.add("boton-actualizar");
botonActualizarMeta.onclick = function() {
    actualizarMeta(indice);
};
const inputAgregar = tarjetaMeta.querySelector(".cantidad-agregar");
const botonAgregarAhorro = tarjetaMeta.querySelector(".boton-agregar-ahorro");

botonAgregarAhorro.onclick = function() {

    const cantidadAgregar = Number(inputAgregar.value);

    if (cantidadAgregar <= 0) {
        alert("Ingresa una cantidad válida.");
        return;
    }

    meta.ahorrado = meta.ahorrado + cantidadAgregar;

    meta.porcentaje = (meta.ahorrado / meta.cantidad) * 100;

    if (meta.porcentaje > 100) {
        meta.porcentaje = 100;
    }

    localStorage.setItem("metas", JSON.stringify(metas));

    mostrarMetas();
};
tarjetaMeta.appendChild(botonActualizarMeta);
    const botonEliminarMeta = document.createElement("button");

botonEliminarMeta.textContent = "🗑️ Eliminar";
botonEliminarMeta.classList.add("boton-eliminar");
botonEliminarMeta.onclick = function() {
    eliminarMeta(indice);
};

tarjetaMeta.appendChild(botonEliminarMeta);
if (meta.porcentaje >= 100) {
    const felicitacion = document.createElement("p");

    felicitacion.textContent =
        "🎉 ¡Felicidades! Has alcanzado tu meta financiera.";

    felicitacion.classList.add("meta-cumplida");

    tarjetaMeta.appendChild(felicitacion);
}
        listaMetas.appendChild(tarjetaMeta);

    });

}
function eliminarMeta(indice) {
    metas.splice(indice, 1);

    localStorage.setItem("metas", JSON.stringify(metas));

    mostrarMetas();
}
function actualizarMeta(indice) {

    const meta = metas[indice];

    const nuevoAhorrado = prompt(
        "¿Cuánto llevas ahorrado actualmente para " + meta.nombre + "?",
        meta.ahorrado
    );

    if (nuevoAhorrado === null) {
        return;
    }

    const cantidadNueva = Number(nuevoAhorrado);

    if (cantidadNueva < 0 || isNaN(cantidadNueva)) {
        alert("Ingresa una cantidad válida.");
        return;
    }

    meta.ahorrado = cantidadNueva;
    meta.porcentaje = (meta.ahorrado / meta.cantidad) * 100;

    if (meta.porcentaje > 100) {
        meta.porcentaje = 100;
    }

    localStorage.setItem("metas", JSON.stringify(metas));

    mostrarMetas();
}
mostrarMetas();