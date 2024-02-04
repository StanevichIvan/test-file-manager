import path from "path";
import {state} from "../state/state.mjs";

export const cd = (params) => {
    const {workDirectory} = state.getState();
    const newPath = params['path_to_directory'] ?? '';
    const isAbsolutePath = newPath.startsWith('/');
    const dirToNavigate = isAbsolutePath ? newPath : path.resolve(workDirectory + newPath);

    state.setState({workDirectory: dirToNavigate});
    console.log(state.getState().workDirectory);
};