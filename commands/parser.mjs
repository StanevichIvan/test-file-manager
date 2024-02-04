const supportedCommands = {
    up: '',
    cd: ['path_to_directory'],
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