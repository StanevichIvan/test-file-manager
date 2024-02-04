import path from "path";
import { rename as renameFs } from "node:fs/promises";
import {state} from "../state/state.mjs";

export const mv = async (data) => {
    const {path_to_file, path_to_new_directory} = data;
    const {workDirectory} = state.getState();
    const isAbsolutePath = path_to_file.startsWith('/');
    const fileToOpen = isAbsolutePath ? path.resolve(path_to_file) : path.resolve(`${workDirectory}/${path_to_file}`);
    const latsSlashIndex = fileToOpen.lastIndexOf('/');
    const newPath = path_to_new_directory.startsWith('/') ? path.resolve(path_to_new_directory) : path.resolve(`${workDirectory}/${path_to_new_directory}`);
    const fileName = fileToOpen.substring(latsSlashIndex + 1);
    const newFileName = `${newPath}/${fileName}`;

    try {
        await renameFs(
            fileToOpen,
            newFileName
        );
    } catch (e) {
        if (e.code === "EEXIST") {
            throw 'file rename error';
        }
    }
};