
function generarTurnos() {
    alert("Bienvenido/a a la central de turnos");

    const diasDisponibles = ['Lunes', 'Martes', 'Miércoles'];
    const horariosDisponibles = ['10:00 AM', '2:00 PM', '6:00 PM'];

    let turno = 1;

    do {
    const nombre = prompt("Ingresa tu nombre:");
    const apellido = prompt("Ingresa tu apellido:");

    const diaElegido = prompt("Elige un día:\n1. Lunes\n2. Miercoles\n3. Viernes");
    const horarioElegido = prompt("Elige un horario:\n1. 10:00 AM\n2. 2:00 PM\n3. 6:00 PM");

    let dia = '';
    if (diaElegido >= 1 && diaElegido <= 3) {
        dia = diasDisponibles[diaElegido - 1];
    } else {
        alert("Opción de día no válida.");
        return;
        
    }

    let horario = '';
    if (horarioElegido >= 1 && horarioElegido <= 3) {
        horario = horariosDisponibles[horarioElegido - 1];
    } else {
        alert("Opción de horario no válida.");
        return;
    }

    alert(`Turno # ${turno}:\nNombre: ${nombre}\nApellido: ${apellido}\nDía: ${dia}\nHorario: ${horario}`);

    turno++;

    alert("Turno agendado");

    if (turno <= 10) {
        const opcion = confirm("¿Quieres generar otro turno?");

        if (!opcion) {
        alert("Generación de turnos finalizada.");
        return;
        }
    } else {
        alert("Se han agotado todos los turnos para esta semana. Intentelo el lunes que viene.");
        return;
    }
    } while (true);
}

generarTurnos();