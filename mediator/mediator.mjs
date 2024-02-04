const commandFileMap = {
    up: import('../commands/up.mjs').then(m => m.goUp),
    cd: import('../commands/cd.mjs').then(m => m.cd),
    ls: import('../commands/ls.mjs').then(m => m.ls),
    cat: import('../commands/cat.mjs').then(m => m.cat),
    add: import('../commands/add.mjs').then(m => m.add),
    rn: import('../commands/rn.mjs').then(m => m.rn),
    cp: import('../commands/cp.mjs').then(m => m.cp),
}

export class Mediator {
    async onCommand(command, params) {
        const commandHandler = await commandFileMap[command];
        commandHandler(params);
    }
}