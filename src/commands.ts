
export const commandsList = [
    // Bake commands
    {
        cmdName: "bakeModel",
        cmd: "bake model",
        successMessage: "Model successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter model name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bakeController",
        cmd: "bake controller",
        successMessage: "Controller successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter controller name...',
                type: 'input'
            },
            {
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bakeCell",
        cmd: "bake cell",
        successMessage: "Cell successfully created!",
        arguments: [
            {
                name: 'Cell name',
                call: '',
                placeholder: 'Please enter cell name...',
                type: 'input'
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input'
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bakeCommand",
        cmd: "bake command",
        successMessage: "Command successfully created!",
        arguments: [
            {
                name: 'Command name',
                call: '',
                placeholder: 'Please enter command name...',
                type: 'input'
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeShell",
        cmd: "bake shell",
        successMessage: "Shell successfully created!",
        arguments: [
            {
                name: 'Shell name',
                call: '',
                placeholder: 'Please enter shell name...',
                type: 'input'
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeForm",
        cmd: "bake form",
        successMessage: "Form successfully created!",
        arguments: [
            {
                name: 'Form name',
                call: '',
                placeholder: 'Please enter form name...',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeHelper",
        cmd: "bake helper",
        successMessage: "Helper successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter helper name...',
                type: 'input'
            },
            {
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakePlugin",
        cmd: "bake plugin",
        successMessage: "Plugin successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter plugin name...',
                type: 'input'
            },
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeMigration",
        cmd: "bake migration",
        successMessage: "Migration successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter migration name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "migrationsSnapshot",
        cmd: "bake migration_snapshot",
        successMessage: "Migration snapshot successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter migration name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeBehavior",
        cmd: "bake behavior",
        successMessage: "Behavior successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter behavior name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeTask",
        cmd: "bake task",
        successMessage: "Task successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter task name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeMailer",
        cmd: "bake mailer",
        successMessage: "Mailer successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter mailer name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeFixture",
        cmd: "bake fixture",
        successMessage: "Fixture successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter fixture name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    { 
        cmdName: "bakeMiddleware",
        cmd: "bake middleware",
        successMessage: "Middleware successfully created!",
        arguments: [
            {
                call: '',
                placeholder: 'Please enter middleware name...',
                type: 'input'
            },
            {
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bakeComponent",
        humanName: "Component",
        cmd: "bake component",
        arguments: [
            {
                name: 'Component name',
                call: '',
                placeholder: 'Please enter component name...',
                type: 'input'
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input'
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bakeTemplate",
        cmd: "bake template",
        successMessage: "Template successfully created!",
        arguments: [
            {
                name: 'Model name',
                call: '',
                placeholder: 'Please enter model name...',
                type: 'input'
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input'
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true,
        }
    },
    {
        cmdName: "bakeTest",
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
                type: 'input'
            },
            {
                name: 'Plugin',
                call: '--plugin',
                placeholder: 'Please enter plugin name or leave empty',
                type: 'input'
            },
            {
                name: 'Prefix',
                call: '--prefix',
                placeholder: 'Please enter prefix name or leave empty',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: true,
            forceOverwrite: true
        }
    },
    // Migrations commands
    { 
        cmdName: "migrationsMigrate",
        cmd: "migrations migrate",
        successMessage: "Migration(s) successfully migrated!",
        arguments: [],
        options: {
            openFileCreated: false,
            forceOverwrite: false,
        }
    },
    // Cache commands
    { 
        cmdName: "cacheClear",
        cmd: "cache clear",
        successMessage: "Cache successfully cleared!",
        arguments: [
            {
                name: 'Type',
                call: '',
                placeholder: 'Please enter cache type...',
                type: 'input'
            }
        ],
        options: {
            openFileCreated: false,
            forceOverwrite: false,
        }
    },
    { 
        cmdName: "cacheClearAll",
        cmd: "cache clear_all",
        successMessage: "Caches successfully cleared!",
        arguments: [],
        options: {
            openFileCreated: false,
            forceOverwrite: false,
        }
    },

]