import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createState = () => {
    let state = {
        workDirectory: path.resolve('~'),
    };

    return {
        getState() {
            return state;
        },
        setState(patch) {
            state = {...state, ...patch};
        }
    };
};

export const state = createState();
