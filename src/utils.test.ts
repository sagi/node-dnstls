import * as i from './utils';

describe('dnstls tests', () => {
  test('isType', () => {
    expect(i.isType('txt')).toBe(true);
    expect(i.isType('bla')).toBe(false);
  });

  test('isClass', () => {
    expect(i.isClass('ch')).toBe(true);
    expect(i.isClass('nop')).toBe(false);
  });

  test('isMinusArg', () => {
    expect(i.isMinusArg('-p123')).toBe(true);
    expect(i.isMinusArg('-p')).toBe(true);
    expect(i.isMinusArg('+aa')).toBe(false);
  });

  test('isPlusArg', () => {
    expect(i.isPlusArg('+tls-host=cloudflare-dns.com')).toBe(true);
    expect(i.isPlusArg('+tls-host=')).toBe(true);
    expect(i.isPlusArg('+tls-host')).toBe(true);
    expect(i.isPlusArg('-p')).toBe(false);
  });

  test('isServer', () => {
    expect(i.isServer('@1.1.1.1')).toBe(true);
    expect(i.isServer('1.1.1.1')).toBe(false);
  });

  test('parse', () => {
    const options1 = {
      host: '1.1.1.1',
      klass: 'in',
      name: 'sagi.io',
      port: 853,
      servername: 'cloudflare-dns.com',
      type: 'a',
    };
    expect(i.parse(['sagi.io'])).toEqual(options1);

    const options2 = {
      host: '9.9.9.9',
      klass: 'in',
      name: 'sagi.io',
      port: 853,
      servername: 'dns.quad9.net',
      type: 'a',
    };
    expect(i.parse(['@9.9.9.9', '+tls-host=dns.quad9.net', 'sagi.io'])).toEqual(
      options2
    );

    const options3 = {
      host: '9.9.9.9',
      klass: 'in',
      name: 'sagi.io',
      port: 443,
      servername: 'dns.quad9.net',
      type: 'a',
    };
    expect(
      i.parse(['-p443', '@9.9.9.9', '+tls-host=dns.quad9.net', 'sagi.io'])
    ).toEqual(options3);

    const options4 = {
      host: '9.9.9.9',
      klass: 'ch',
      name: 'authors.bind',
      port: 443,
      servername: 'dns.quad9.net',
      type: 'txt',
    };
    expect(
      i.parse([
        'txt',
        'ch',
        '-p443',
        '@9.9.9.9',
        '+tls-host=dns.quad9.net',
        'authors.bind',
      ])
    ).toEqual(options4);

    const exit = jest.spyOn(process, 'exit');
    const write = jest.spyOn(process.stdout, 'write');
    exit.mockImplementation(() => `doesn't matter`);
    write.mockImplementation(() => `doesn't matter`);

    i.parse([]);
    expect(exit).toHaveBeenCalledWith(0);
    expect(write).toHaveBeenCalled();

    exit.mockClear();
    write.mockClear();
    i.parse(['-h']);
    expect(exit).toHaveBeenCalledWith(0);
    expect(write).toHaveBeenCalled();
  });
});
