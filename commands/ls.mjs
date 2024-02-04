import {readdir} from "node:fs/promises";
import {state} from "../state/state.mjs";
import {printTable} from "../helpers/outputs/files-table.mjs";

export const ls = async () => {
    const {workDirectory} = state.getState();

    const filesList = await readdir(workDirectory, {withFileTypes: true});
    const directories = filesList.filter(d => d.isDirectory()).map(d => d.name);
    const files = filesList.filter(d => d.isFile()).map(d => d.name);

    printTable({directories, files});
};