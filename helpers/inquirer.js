const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`,
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`,
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`,
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendietes`,
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`,
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`,
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log('==========================='.green);
    console.log('   Seleccione una opción   '.green);
    console.log('===========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const inquirerPausa = async () => {
    const confirmacion = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.green} para continuar`,
        },
    ];
    console.log('\n');

    await inquirer.prompt(confirmacion);
};

const leerInput = async () => {
    const entrada = [
        {
            type: 'input',
            name: 'desc',
            message: 'Descripción: ',
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese una descripción';
                }
                return true;
            },
        },
    ];

    const { desc } = await inquirer.prompt(entrada);
    return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        const idx = `${index + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        };
    });

    choices.unshift({ value: '0', name: `${'0.'.green} Cancelar` });

    const preguntas = [
        { type: 'list', name: 'id', message: 'Borrar', choices },
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
};

const confirmar = async (message) => {
    const pregunta = [{ type: 'confirm', name: 'ok', message }];
    const { ok } = await inquirer.prompt(pregunta);
    return ok;
};

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
};
