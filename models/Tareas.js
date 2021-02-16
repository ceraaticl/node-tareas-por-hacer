const Tarea = require('./Tarea');
require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => (this._listado[tarea.id] = tarea));
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}.`.green;
            const { desc, completadoEl } = tarea;
            const estado = completadoEl ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarCompletadas(completadas = true) {
        console.log();
        let idx = 1;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadoEl } = tarea;
            const estado = completadoEl ? 'Completada'.green : 'Pendiente'.red;
            if (completadas) {
                if (completadoEl) {
                    console.log(
                        `${(idx + '.').green} ${desc} :: ${completadoEl.green}`
                    );
                    idx += 1;
                }
            } else {
                if (!completadoEl) {
                    console.log(`${(idx + '.').green} ${desc} :: ${estado}`);
                    idx += 1;
                }
            }
        });
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completadoEl) {
                tarea.completadoEl = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEl = null;
            }
        });
    }
}

module.exports = Tareas;
