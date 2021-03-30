import { ReadStream, WriteStream } from 'fs';

declare const clikey: (
  msg: string,
  options?: {
    stdout?: ReadStream,
    stdin?: WriteStream,
    encoding?: 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex',
    lineBreak?: boolean,
  }
) => Promise<string>;

export = clikey;
