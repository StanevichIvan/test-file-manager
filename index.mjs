import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {parseArgs} from './helpers/cli/args.mjs';
import {printGreeting} from "./helpers/outputs/greeteng.mjs";
import {printFarewell} from "./helpers/outputs/farewell.mjs";
import {printWorkDir} from "./helpers/outputs/workdir.mjs";
import {Mediator} from "./mediator/mediator.mjs";
import {parseCommand} from "./commands/parser.mjs";
import {printInvalidInput} from "./helpers/outputs/errors.mjs";
import {state} from "./state/state.mjs";

const onData = state => mediator => async (data) => {
    data = data.toString().replace(/\n/g, ' ');

    try {
        const { command, params } = parseCommand(data);
        await mediator.onCommand(command, params);
    } catch (e) {
        printInvalidInput();
    }
};

async function runFileManager() {
    const args = parseArgs();
    const appMediator = new Mediator();

    state.setState({currentUser: args['username'] ?? 'Anonymous'});
    printGreeting(state.getState().currentUser);
    printWorkDir(state.getState().workDirectory);

    process.stdin.on("data", onData(state)(appMediator));

    process.on('exit', () => {
        printFarewell(state.getState().currentUser);
    });

    process.on('SIGINT', () => {
        printFarewell(state.getState().currentUser);
        process.exit()
    });
}

await runFileManager();
