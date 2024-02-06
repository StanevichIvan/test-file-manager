import path from "path";
import os from "node:os";


export const createState = () => {
    let state = {
        workDirectory: path.resolve(os.homedir()),
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
