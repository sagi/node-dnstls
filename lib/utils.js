"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types = new Set([
    'txt',
    'a',
    'aaaa',
    'ns',
    'mx',
    'loc',
    'cname',
    'caa',
    'ptr',
    'any',
]);
const classes = new Set(['in', 'ch', 'hs']);
const helps = new Set(['-h', '--help']);
exports.isType = (arg) => types.has(arg.trim().toLowerCase());
exports.isClass = (arg) => classes.has(arg.trim().toLowerCase());
exports.isMinusArg = (arg) => arg.trim().startsWith('-');
exports.isPlusArg = (arg) => arg.trim().startsWith('+');
exports.isServer = (arg) => arg.trim().startsWith('@');
exports.isHelp = (arg) => helps.has(arg.trim().toLowerCase());
exports.usage = () => {
    const msg = `Usage: dnstls name [type] [class] [@server] [-p<port>] [+tls-host=<host>]\n`;
    process.stdout.write(msg);
};
exports.parse = (argv) => {
    if (argv.length === 0) {
        exports.usage();
        process.exit(0);
    }
    const options = {
        host: '1.1.1.1',
        klass: 'in',
        name: '',
        port: 853,
        servername: 'cloudflare-dns.com',
        type: 'a',
    };
    argv.forEach((arg) => {
        if (exports.isType(arg)) {
            options.type = arg;
        }
        else if (exports.isClass(arg)) {
            options.klass = arg;
        }
        else if (exports.isServer(arg)) {
            options.host = arg.substring(1);
        }
        else if (exports.isHelp(arg)) {
            exports.usage();
            process.exit(0);
        }
        else if (exports.isMinusArg(arg)) {
            options.port = parseInt(arg.substring(2), 10);
        }
        else if (exports.isPlusArg(arg)) {
            const [plusArg, plusArgValue] = arg.split('=');
            options.servername = plusArgValue;
        }
        else {
            options.name = arg;
        }
    });
    return options;
};
