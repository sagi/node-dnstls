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

export const isType = (arg: string) => types.has(arg.trim().toLowerCase());
export const isClass = (arg: string) => classes.has(arg.trim().toLowerCase());
export const isMinusArg = (arg: string): boolean => arg.trim().startsWith('-');
export const isPlusArg = (arg: string): boolean => arg.trim().startsWith('+');
export const isServer = (arg: string): boolean => arg.trim().startsWith('@');
export const isHelp = (arg: string): boolean =>
  helps.has(arg.trim().toLowerCase());

export const usage = () => {
  const msg = `Usage: dnstls name [type] [class] [@server] [-p<port>] [+tls-host=<host>]\n`;
  process.stdout.write(msg);
};

export const parse = (argv: string[]) => {
  if (argv.length === 0) {
    usage();
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
  argv.forEach((arg: string) => {
    if (isType(arg)) {
      options.type = arg;
    } else if (isClass(arg)) {
      options.klass = arg;
    } else if (isServer(arg)) {
      options.host = arg.substring(1);
    } else if (isHelp(arg)) {
      usage();
      process.exit(0);
    } else if (isMinusArg(arg)) {
      options.port = parseInt(arg.substring(2), 10);
    } else if (isPlusArg(arg)) {
      const [plusArg, plusArgValue] = arg.split('=');
      options.servername = plusArgValue;
    } else {
      options.name = arg;
    }
  });
  return options;
};
