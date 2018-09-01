# dnstls

DNS-over-TLS Command Line Tool.

Installation:
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
