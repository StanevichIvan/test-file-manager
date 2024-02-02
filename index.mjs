import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {parseArgs} from './helpers/cli/args.mjs';
import {createState} from './state/state.mjs';
import {printGreeting} from "./helpers/outputs/greeteng.mjs";
import {printFarewell} from "./helpers/outputs/farewell.mjs";
import {printWorkDir} from "./helpers/outputs/workdir.mjs";

async function runFileManager() {
    const state = createState();
    const args = parseArgs();

    state.setState({currentUser: args['username'] ?? 'Anonymous'});
    printGreeting(state.getState().currentUser);
    printWorkDir(path.resolve(state.getState().workDirectory));

    process.stdin.on("data", data => {
        data = data.toString().toUpperCase()
        process.stdout.write(data + "\n")
    });

    process.on('exit', () => {
        printFarewell(state.getState().currentUser);
    });

    process.on('SIGINT', () => {
        printFarewell(state.getState().currentUser);
        process.exit()
    });
}

await runFileManager();
