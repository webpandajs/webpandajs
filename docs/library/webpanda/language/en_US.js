webpanda.language ({

    10000001: 'Error command',
    10000002: 'Template content',
    10000003: 'Warning command',
    10000004: 'Reference information',

    10001000: 'Plugin of type "${1}" is missing',

    20000001: 'The "${1}" command cannot exist in the same tag at the same time or more than one',
    20000002: 'The "${1}" command cannot have more than one tag',
    20000003: 'The "${1}" command cannot be empty',
    20000004: '"${1}" template syntax error',
    20000005: '"${1}" command is invalid, missing attribute name',
    20000006: '"${1}" command is invalid, missing class name',
    20000007: '"${1}" command is invalid, missing style key name',
    20000008: 'The "${1}" command is missing event name',
    20000009: '"${1}" command syntax errors, "else if | else" command before the node must exist at the same level of "if", "else" command before node must exist at the same level of "else if | if" command',

    30000001: 'Render error, "${1}" is render data attribute, cannot be defined as traversal unit key name',
    30000002: 'Render error, "${1}" is a render data attribute, cannot be defined as a traversal unit value name',
    30000003: 'Render error, "${1}" is render data attribute, cannot be defined as traversal unit index name',
    30000004: 'Render error, "${1}" is not an object',
    30000005: 'Render error, "${1}" is not a string',
    30000006: 'Render error, the selector is an abstract node tree, no valid node was found to render',
    30000007: 'Render error, "${1}" loop identifier duplicate, custom loop identifier must be a unique value',
    30000008: 'The precompiled declaration "${1}" is undefined',

    40000001: 'The initialization of "${2}" data project is abnormal, and there is a mutual inheritance relationship between "${1}" data project and "${2}" data project, resulting in incomplete inheritance defect of data project preparation',
    40000002: 'The initialization of the "${2}" data project is not complete. The "${1}" data project and the "${2}" data project have defects in mounting each other',
    40000003: '"${1}" data project already exists, data project duplication is prevented',
    40000004: 'Failed to create render filter node because filter "${2}" was configured incorrectly for data project "${1}"',
    40000005: 'Project "${1}" fails to inherit parent data project "${2}"',
    40000006: 'Failed to mount data project "${2}" to data project "${1}"',
    40000007: 'webpanda.data ({ name: "${1}", ... })',
    40000008: 'The event "${2}" defined by data project "${1}" is unavailable',
    40000009: 'Description Source data project "${1}" failed to clone target data project "${2}"',
    40000010: 'Project "${1}" does not exist',
    40000011: 'The data project "${1}" cannot inherit itself',
    
    50000001: 'The "${1}" page does not exist',
    50000002: 'The page with data project name "${1}" does not exist',
    50000003: 'Page loading aborted, "${1}" data project creation import resource invalid',
    50000004: 'Project file "${2}" failed to load on "${1}" page',
    50000005: 'Prevent violent refresh, page daemon start! ...... More Technical Support: ${1}',
    50000006: 'webpanda.config Globally defined event "${1}" is not available',
    50000007: 'The data project "${1}" is abstract data and cannot be used to render pages',

});
