import path from "path";
import {state} from "../state/state.mjs";

const ROOT_DIR = '/';

export const goUp = () => {
    const {workDirectory} = state.getState();

    if (state.getState().workDirectory !== ROOT_DIR) {
        state.setState({workDirectory: path.resolve(workDirectory + '/../')});
        console.log(state.getState().workDirectory);
    }
};