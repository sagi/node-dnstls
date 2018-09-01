import dnstls from 'dns-over-tls';
import { parse } from './utils';

(async () => {
  const options = parse(process.argv.splice(2));
  const r = await dnstls.query(options);
  process.stdout.write(JSON.stringify(r, null, 2));
  process.stdout.write('\n');
})();
