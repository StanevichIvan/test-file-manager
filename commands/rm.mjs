import path from "path";
import { rm as removeFile } from "node:fs/promises";
import {state} from "../state/state.mjs";

export const rm = async (data) => {
    const {path_to_file} = data;
    const {workDirectory} = state.getState();
    const filePath = path_to_file.startsWith('/') ? path.resolve(path_to_file) : path.resolve(`${workDirectory}/${path_to_file}`);

    try {
        await removeFile(filePath);
    } catch (e) {
        if (e.code === "EEXIST") {
            throw 'file delete error';
        }
    }
};