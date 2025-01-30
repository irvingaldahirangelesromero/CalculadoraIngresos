const txtDescripcion = document.getElementById("txtDescripcion") as HTMLInputElement;
const txtMonto = document.getElementById("txtMonto") as HTMLInputElement;

const btnIngreso = document.getElementById("btnIngreso") as HTMLButtonElement;
const btnEgreso = document.getElementById("btnEgreso") as HTMLButtonElement;

const res = document.getElementById("res") as HTMLElement;
const contenedorHistorial = document.getElementById("contenedorHistorial") as HTMLElement;

type TipoTransaccion = "ingreso" | "gasto";

type Transaccion = {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
};

let transacciones: Transaccion[] = [];
let balanceTotal = 0;

function agregarTransaccion(tipo: TipoTransaccion) {
    const descripcion = txtDescripcion.value.trim();
    const monto = parseFloat(txtMonto.value);

    if (descripcion === "" || isNaN(monto) || monto <= 0) {
        alert("Debe ingresar una descripción y un monto válido.");
        return;
    }

    const nuevaTransaccion: Transaccion = {
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
