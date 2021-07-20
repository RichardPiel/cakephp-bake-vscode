
export const commandsList = [
    // Bake commands
    {
        cmdName: "bake.model",
        cmd: "bake model",
        successMessage: "Model successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter model name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bake.controller",
        cmd: "bake controller",
        successMessage: "Controller successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter controller name...',
                type: 'input',
                required: true
            },
            {
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input',
                required: false
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bake.cell",
        cmd: "bake cell",
        successMessage: "Cell successfully created!",
        arguments: [
            {
                name: 'Cell name',
                call: '',
                placeholder: 'Please enter cell name...',
                type: 'input',
                required: true
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input',
                required: false
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bake.command",
        cmd: "bake command",
        successMessage: "Command successfully created!",
        arguments: [
            {
                name: 'Command name',
                call: '',
                placeholder: 'Please enter command name...',
                type: 'input',
                required: true
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.shell",
        cmd: "bake shell",
        successMessage: "Shell successfully created!",
        arguments: [
            {
                name: 'Shell name',
                call: '',
                placeholder: 'Please enter shell name...',
                type: 'input',
                required: true
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.form",
        cmd: "bake form",
        successMessage: "Form successfully created!",
        arguments: [
            {
                name: 'Form name',
                call: '',
                placeholder: 'Please enter form name...',
                type: 'input',
                required: true
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.helper",
        cmd: "bake helper",
        successMessage: "Helper successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter helper name...',
                type: 'input',
                required: true
            },
            {
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input',
                required: false
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.plugin",
        cmd: "bake plugin",
        successMessage: "Plugin successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter plugin name...',
                type: 'input',
                required: true
            },
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.migration",
        cmd: "bake migration",
        successMessage: "Migration successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter migration name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "migrations.snapshot",
        cmd: "bake migration_snapshot",
        successMessage: "Migration snapshot successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter migration name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.behavior",
        cmd: "bake behavior",
        successMessage: "Behavior successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter behavior name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.task",
        cmd: "bake task",
        successMessage: "Task successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter task name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.mailer",
        cmd: "bake mailer",
        successMessage: "Mailer successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter mailer name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.fixture",
        cmd: "bake fixture",
        successMessage: "Fixture successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter fixture name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.policy",
        cmd: "bake policy",
        successMessage: "Policy successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter policy name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bake.middleware",
        cmd: "bake middleware",
        successMessage: "Middleware successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter middleware name...',
                type: 'input',
                required: true
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bake.component",
        humanName: "Component",
        cmd: "bake component",
        successMessage: "Component successfully created!",
        arguments: [
            {
                name: 'Component name',
                call: '',
                placeholder: 'Please enter component name...',
                type: 'input',
                required: true
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input',
                required: false
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bake.template",
        cmd: "bake template",
        successMessage: "Template successfully created!",
        arguments: [
            {
                name: 'Model name',
                call: '',
                placeholder: 'Please enter model name...',
                type: 'input',
                required: true
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input',
                required: false
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bake.test",
        cmd: "bake test",
        successMessage: "Test successfully created!",
        arguments: [
            {
                name: 'Class type',
                call: '',
                placeholder: 'Please select class type...',
                type: 'pick',
                values: [
                    { label: 'Entity' },
                    { label: 'Table' },
                    { label: 'Controller' },
                    { label: 'Component' },
                    { label: 'Behavior' },
                    { label: 'Helper' },
                    { label: 'Shell' },
                    { label: 'Task' },
                    { label: 'ShellHelper' },
                    { label: 'Cell' },
                    { label: 'Form' },
                    { label: 'Mailer' },
                    { label: 'Command' },
                ]
            },
            {
                name: 'Class name',
                call: '',
                placeholder: 'Please enter class name...',
                type: 'input',
                required: false
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input',
                required: false
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true
        }
    },
    // Migrations commands
    { 
        cmdName: "migrations.migrate",
        cmd: "migrations migrate",
        successMessage: "Migration(s) successfully migrated!",
        options: {
            openFileCreated: false,
            forceOverwrite: false,
        }
    },
    // Cache commands
    { 
        cmdName: "cache.clear",
        cmd: "cache clear",
        successMessage: "Cache successfully cleared!",
        arguments: [
            {
                name: 'Type',
                call: '',
                placeholder: 'Please enter cache type...',
                type: 'input',
                required: false
            }
        ],
        options: {
            openFileCreated: false,
            forceOverwrite: false,
        }
    },
    { 
        cmdName: "cache.clear_all",
        cmd: "cache clear_all",
        successMessage: "Caches successfully cleared!",
        options: {
            openFileCreated: false,
            forceOverwrite: false,
        }
    },

]