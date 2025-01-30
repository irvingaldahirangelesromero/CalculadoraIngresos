"use strict";
const txtDescripcion = document.getElementById("txtDescripcion");
const txtMonto = document.getElementById("txtMonto");
const btnIngreso = document.getElementById("btnIngreso");
const btnEgreso = document.getElementById("btnEgreso");
const res = document.getElementById("res");
const contenedorHistorial = document.getElementById("contenedorHistorial");
let transacciones = [];
let balanceTotal = 0;
function agregarTransaccion(tipo) {
    const descripcion = txtDescripcion.value.trim();
    const monto = parseFloat(txtMonto.value);
    if (descripcion === "" || isNaN(monto) || monto <= 0) {
        alert("Debe ingresar una descripción y un monto válido.");
        return;
    }
    const nuevaTransaccion = {
        id: Date.now(),
        monto,
        descripcion,
        tipo
    };
    transacciones.push(nuevaTransaccion);
    actualizarBalance();
    mostrarHistorial();
    // Limpiar campos
    txtDescripcion.value = "";
    txtMonto.value = "";
}
function actualizarBalance() {
    balanceTotal = transacciones.reduce((total, transaccion) => {
        return transaccion.tipo === "ingreso" ? total + transaccion.monto : total - transaccion.monto;
    }, 0);
    res.textContent = `Balance: $${balanceTotal.toFixed(2)}`;
}
function mostrarHistorial() {
    contenedorHistorial.innerHTML = "";
    transacciones.forEach(transaccion => {
        const div = document.createElement("div");
        div.textContent = `${transaccion.descripcion}: $${transaccion.monto.toFixed(2)}`;
        div.style.color = transaccion.tipo === "ingreso" ? "green" : "red";
        div.style.fontWeight = "bold";
        contenedorHistorial.appendChild(div);
    });
}
btnIngreso.addEventListener("click", (e) => {
    e.preventDefault();
    agregarTransaccion("ingreso");
});
btnEgreso.addEventListener("click", (e) => {
    e.preventDefault();
    agregarTransaccion("gasto");
});
