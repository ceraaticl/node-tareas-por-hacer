require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
// const { mostrarMenu, pausa } = require('./helpers/mensajes');
const {
    inquirerMenu,
    inquirerPausa,
    leerInput,
} = require('./helpers/inquirer');
const Tareas = require('./models/Tareas');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        // opt = await mostrarMenu();
        // await pausa();

        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput();
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas.listadoArr);
                break;
        }
        guardarDB(tareas.listadoArr);
        await inquirerPausa();
    } while (opt !== '0');
};

main();
