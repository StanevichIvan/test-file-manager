import path from "path";
import { rename as renameFs } from "node:fs/promises";
import {state} from "../state/state.mjs";

export const rn = async (data) => {
    const {path_to_file, new_filename} = data;
    const {workDirectory} = state.getState();
    const isAbsolutePath = path_to_file.startsWith('/');
    const fileToOpen = isAbsolutePath ? path.resolve(path_to_file) : path.resolve(`${workDirectory}/${path_to_file}`);
    const latsSlashIndex = fileToOpen.split('').findLastIndex(v => v === '/');
    const newFileName = `${fileToOpen.split('').slice(0, latsSlashIndex).join('')}/${new_filename}`;

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