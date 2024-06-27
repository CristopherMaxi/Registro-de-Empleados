class Persona {
    constructor(firstName, lastName, gender, maritalStatus, salary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.salary = salary;
    }
}

let personas = [];
let editIndex = -1;

function capturar() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const maritalStatus = document.getElementById('maritalStatus').value;
    const salary = document.getElementById('salary').value;
    
    return new Persona(firstName, lastName, gender, maritalStatus, salary);
}

function agregar() {
    const persona = capturar();
    if (validar(persona)) {
        if (editIndex === -1) {
            personas.push(persona);
        } else {
            personas[editIndex] = persona;
            editIndex = -1;
        }
        actualizarTabla();
        limpiarFormulario();
    } else {
        alert('Todos los campos son obligatorios y el sueldo debe ser un número.');
    }
}

function validar(persona) {
    return persona.firstName !== '' && persona.lastName !== '' && persona.gender !== '' && persona.maritalStatus !== '' && persona.salary !== '' && !isNaN(persona.salary);
}

function actualizarTabla() {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';
    
    personas.forEach((persona, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${persona.firstName}</td>
            <td>${persona.lastName}</td>
            <td>${persona.gender}</td>
            <td>${persona.maritalStatus}</td>
            <td>${persona.salary}</td>
            <td>
                <button onclick="editar(${index})">Editar</button>
                <button onclick="eliminar(${index})">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function limpiarFormulario() {
    document.getElementById('employeeForm').reset();
    editIndex = -1;
}

function editar(index) {
    const persona = personas[index];
    document.getElementById('firstName').value = persona.firstName;
    document.getElementById('lastName').value = persona.lastName;
    document.querySelector(`input[name="gender"][value="${persona.gender}"]`).checked = true;
    document.getElementById('maritalStatus').value = persona.maritalStatus;
    document.getElementById('salary').value = persona.salary;
    
    editIndex = index;
}

function eliminar(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        personas.splice(index, 1);
        actualizarTabla();
    }
}

function filtrarPorGenero(genero) {
    const tbody = document.querySelector('#employeeTable tbody');
    tbody.innerHTML = '';
    
    personas.filter(persona => persona.gender === genero).forEach((persona, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${persona.firstName}</td>
            <td>${persona.lastName}</td>
            <td>${persona.gender}</td>
            <td>${persona.maritalStatus}</td>
            <td>${persona.salary}</td>
            <td>
                <button onclick="editar(${index})">Editar</button>
                <button onclick="eliminar(${index})">Eliminar</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function mostrarTodos() {
    actualizarTabla();
}
