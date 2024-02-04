import path from "path";
import { createReadStream, createWriteStream } from "node:fs";
import {state} from "../state/state.mjs";

export const cp = async (data) => {
    const {path_to_file, path_to_new_directory} = data;
    const {workDirectory} = state.getState();
    const fileToOpen = path_to_file.startsWith('/') ? path.resolve(path_to_file) : path.resolve(`${workDirectory}/${path_to_file}`);
    const fileToWrite = path_to_new_directory.startsWith('/') ? path.resolve(path_to_new_directory) : path.resolve(`${workDirectory}/${path_to_new_directory}`);


    try {
        await createReadStream(fileToOpen).pipe(createWriteStream(fileToWrite));
    } catch (e) {
        if (e.code === "EEXIST") {
            throw 'file rename error';
        }
    }
};