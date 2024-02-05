import path from "path";
import {createReadStream} from "node:fs";
import {state} from "../state/state.mjs";
import {ExecutionError} from "../errors/execution.mjs";

export const cat = async (params) => {
    const filePath = params['path_to_file'];
    const {workDirectory} = state.getState();
    const isAbsolutePath = filePath.startsWith('/');
    const fileToOpen = isAbsolutePath ? path.resolve(filePath) : path.resolve(`${workDirectory}/${filePath}`);

    try {
        const stream = createReadStream(fileToOpen, {
            autoClose: true,
            encoding: 'utf8'
        });
        stream.on('data', console.log)
        stream.on('end', () => {
            stream.close();
        });
    } catch (e) {
        throw e;
    }
};