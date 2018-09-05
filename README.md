# dnstls

[`dnstls`](https://www.npmjs.com/package/dnstls) is a Node.js [DNS over TLS](https://en.wikipedia.org/wiki/DNS_over_TLS) command line tool.

[![CircleCI](https://circleci.com/gh/sagi/node-dnstls.svg?style=svg)](https://circleci.com/gh/sagi/node-dnstls)
[![Coverage Status](https://coveralls.io/repos/github/sagi/node-dnstls/badge.svg?branch=master)](https://coveralls.io/github/sagi/node-dnstls?branch=master)
[![MIT License](https://img.shields.io/npm/l/dnstls.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![version](https://img.shields.io/npm/v/dnstls.svg?style=flat-square)](http://npm.im/dnstls)

## Installation:
~~~
$ npm i -g dnstls
~~~

Usage:
~~~
Usage: dnstls name [type] [class] [@server] [-p<port>] [+tls-host=<host>]
~~~

If only `name` (domain name) is provided, it defaults to using Cloudflare's DNS-over-TLS server
(`@1.1.1.1 +tls-host=cloudflare-dns.com`).

## Example

~~~
$ dnstls sagi.io
~~~

Output:
~~~json
{
  "id": 9013,
  "type": "response",
  "flags": 384,
  "flag_qr": true,
  "opcode": "QUERY",
  "flag_aa": false,
  "flag_tc": false,
  "flag_rd": true,
  "flag_ra": true,
  "flag_z": false,
  "flag_ad": false,
  "flag_cd": false,
  "rcode": "NOERROR",
  "questions": [
    {
      "name": "sagi.io",
      "type": "A",
      "class": "IN"
    }
  ],
  "answers": [
    {
      "name": "sagi.io",
      "type": "A",
      "ttl": 300,
      "class": "IN",
      "flush": false,
      "data": "151.101.1.195"
    },
    {
      "name": "sagi.io",
      "type": "A",
      "ttl": 300,
      "class": "IN",
      "flush": false,
      "data": "151.101.65.195"
    }
  ],
  "authorities": [],
  "additionals": []
}
~~~

Probably some time the future we'll add a `DiG`-like output.

## License
MIT
