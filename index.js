#!/usr/bin/env node
const dnstls = require('dns-over-tls');
const { parse } = require('./lib/utils');

(() => {
  const options = parse(process.argv.splice(2));
  dnstls
    .query(options)
    .then(r => {
      process.stdout.write(JSON.stringify(r, null, 2));
      process.stdout.write('\n');
    })
    .catch(err => {
      process.stdout.write(err);
      process.exit(1);
    });
})();
