const commandFileMap = {
    up: import('../commands/up.mjs').then(m => m.goUp),
    cd: import('../commands/cd.mjs').then(m => m.cd),
}

export class Mediator {
    async onCommand(command, params) {
        const commandHandler = await commandFileMap[command];
        commandHandler(params);
    }
}