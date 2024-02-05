import path from "path";
import {access} from "node:fs/promises";
import {state} from "../state/state.mjs";
import {ExecutionError} from "../errors/execution.mjs";

export const cd = async (params) => {
    const {workDirectory} = state.getState();
    const newPath = params['path_to_directory'] ?? '';
    const isAbsolutePath = newPath.startsWith('/');
    const dirToNavigate = isAbsolutePath ? path.resolve(newPath) : path.resolve(`${workDirectory}/${newPath}`);

    try {
        await access(dirToNavigate);
    } catch (e) {
        throw new ExecutionError(e);
    }

    state.setState({workDirectory: dirToNavigate});
    console.log(state.getState().workDirectory);
};