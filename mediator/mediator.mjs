const commandFileMap = {
    up: import('../commands/up.mjs').then(m => m.goUp),
    cd: import('../commands/cd.mjs').then(m => m.cd),
    ls: import('../commands/ls.mjs').then(m => m.ls),
    cat: import('../commands/cat.mjs').then(m => m.cat),
    add: import('../commands/add.mjs').then(m => m.add),
    rn: import('../commands/rn.mjs').then(m => m.rn),
    cp: import('../commands/cp.mjs').then(m => m.cp),
    mv: import('../commands/mv.mjs').then(m => m.mv),
    rm: import('../commands/rm.mjs').then(m => m.rm),
    os: import('../commands/os.mjs').then(m => m.os),
    hash: import('../commands/hash.mjs').then(m => m.hash),
    compress: import('../commands/compress.mjs').then(m => m.compress),
    decompress: import('../commands/decompress.mjs').then(m => m.decompress),
}

export class Mediator {
    async onCommand(command, params) {
        const commandHandler = await commandFileMap[command];
        commandHandler(params);
    }
}