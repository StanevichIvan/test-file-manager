import {EOL, cpus, homedir, userInfo, arch} from 'node:os';

export const os = (data) => {
    const {flag} = data;

    if (flag === '--EOL') {
        console.log(EOL);
        return;
    }

    if (flag === '--cpus') {
        console.log(cpus());
        return;
    }

    if (flag === '--homedir') {
        console.log(homedir());
        return;
    }

    if (flag === '--username') {
        console.log(userInfo().username);
        return;
    }

    if (flag === '--architecture') {
        console.log(arch());
        return;
    }

    throw 'invalid input';
}