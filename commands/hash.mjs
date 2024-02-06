import path from "path";
import { stdout } from "node:process";
import {state} from "../state/state.mjs";
import { createReadStream } from "node:fs";

export const hash = async (data) => {
    const { path_to_file } = data;
    const { createHash } = await import("node:crypto");
    const fileHash = createHash("sha256");
    const {workDirectory} = state.getState();
    const isAbsolutePath = path_to_file.startsWith('/');
    const fileToOpen = isAbsolutePath ? path.resolve(path_to_file) : path.resolve(`${workDirectory}/${path_to_file}`);

    const input = createReadStream(fileToOpen);
    input.pipe(fileHash).setEncoding("hex").pipe(stdout);
};