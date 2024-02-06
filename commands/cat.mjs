import path from "path";
import {createReadStream} from "node:fs";
import {state} from "../state/state.mjs";

export const cat = async (params) => {
    const filePath = params['path_to_file'];
    const {workDirectory} = state.getState();
    const isAbsolutePath = filePath.startsWith('/');
    const fileToOpen = isAbsolutePath ? path.resolve(filePath) : path.resolve(`${workDirectory}/${filePath}`);

    return new Promise((res, rej) => {
        const stream = createReadStream(fileToOpen, {
            autoClose: true,
            encoding: 'utf8'
        });
        stream.on('data', console.log)
        stream.on('error', rej)
        stream.on('end', () => {
            stream.close();
            res();
        });
    });
};