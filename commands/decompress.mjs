import path from "path";
import {createWriteStream} from "node:fs";
import {pipeline} from "node:stream/promises";
import {createGzip, createBrotliDecompress} from "node:zlib";
import {state} from "../state/state.mjs";

export const decompress = async (data) => {
    const {path_to_file, path_to_destination} = data;
    const {workDirectory} = state.getState();
    const isAbsolutePath = path_to_file.startsWith('/');
    const fileToOpen = isAbsolutePath ? path.resolve(path_to_file) : path.resolve(`${workDirectory}/${path_to_file}`);
    const filename = fileToOpen.substring(fileToOpen.lastIndexOf('/') + 1);
    const destFile = path_to_destination.startsWith('/') ?
        path.resolve(path_to_destination) :
        path.resolve(`${workDirectory}/${path_to_destination}`);

    await pipeline(
        createBrotliDecompress(fileToOpen),
        createGzip(),
        createWriteStream(`${destFile}`)
    );
};