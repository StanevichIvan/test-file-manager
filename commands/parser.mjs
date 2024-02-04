const supportedCommands = {
    up: '',
    cd: ['path_to_directory'],
    ls: '',
    cat: ['path_to_file'],
    add: ['new_file_name'],
    rn: ['path_to_file', 'new_filename'],
    cp: ['path_to_file', 'path_to_new_directory'],
    mv: ['path_to_file', 'path_to_new_directory'],
    rm: ['path_to_file'],
};
export const parseCommand = (data) => {
    const params = data.split(' ').filter(Boolean);
    const [command] = params;
    if (!supportedCommands.hasOwnProperty(command)) {
        throw `${command} unsupported`;
    }

    let paramsData = {};
    if (Array.isArray(supportedCommands[command])) {
        for (const [key, param] of Object.entries(supportedCommands[command])) {
            paramsData[param] = params[Number(key) + 1];
        }
    }

    return {
        command,
        params: paramsData
    };
};