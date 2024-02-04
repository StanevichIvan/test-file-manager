import {InputValidationError} from "../errors/input-validation.mjs";

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
    os: ['flag'],
    hash: ['path_to_file'],
    compress: ['path_to_file', 'path_to_destination'],
    decompress: ['path_to_file', 'path_to_destination'],
};
export const parseCommand = (data) => {
    const params = data.split(' ').filter(Boolean);
    const [command] = params;
    if (!supportedCommands.hasOwnProperty(command)) {
        throw new InputValidationError(`${command} unsupported`);
    }

    let paramsData = {};
    if (Array.isArray(supportedCommands[command])) {
        if (supportedCommands[command].length > (params.length - 1)) {
            throw new InputValidationError('params are missing');
        }
        for (const [key, param] of Object.entries(supportedCommands[command])) {
            paramsData[param] = params[Number(key) + 1];
        }
    }

    return {
        command,
        params: paramsData
    };
};