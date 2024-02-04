import { open } from "node:fs/promises";
import {state} from "../state/state.mjs";

export const add = async (data) => {
    const {new_file_name} = data;
    const {workDirectory} = state.getState();
    let file = null;

    try {
        file = await open(`${workDirectory}/${new_file_name}`, "wx");
    } catch (e) {
        if (e.code === "EEXIST") {
            throw ERROR_MESSAGE;
        }
    } finally {
        file?.close();
    }
};