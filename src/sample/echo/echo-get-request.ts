import fp from 'fastify-plugin';
import * as crypto from 'crypto';
import { Maybe } from '../../types';

export type EchoGetRequest = (sampleParam: string, sampleQuery: string) => Promise<Maybe<string>>;

// Let's pretend that we have some auth headers to pass
const requestHeaders = () => {
  const apiKey = process.env.SAMPLE_ECHO_REQUEST_API_KEY;
  const apiTimestamp = Math.floor(Date.now() / 1000);
  const apiToken = crypto
    .createHash('sha1')
    .update(`${apiKey}${apiTimestamp}${process.env.SAMPLE_ECHO_REQUEST_API_SECRET}`)
    .digest('hex');

  return {
    'X-Api-Key': apiKey,
    'X-Api-Timestamp': apiTimestamp,
    'X-Api-Token': apiToken,
    'X-Api-Version': 1,
  };
};

const echoGetRequest: EchoGetRequest = async (sampleParam, sampleQuary) => {
  const url = `${process.env.SAMPLE_ECHO_REQUEST_URL}?param=${sampleParam}&query=${sampleQuary}`;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - fetch in Node 18 is still experimental
  const response = await fetch(url, {
    method: 'GET',
    headers: requestHeaders(),
  });

  if (response.ok) {
    return response.json();
  }

  if (response.status === 404) {
    return null;
  }

  throw new Error(`Get error code: ${response.status}, message: '${response.json || ''}'`);
};

export default fp(async ($) => {
  $.decorate('echoGetRequest', echoGetRequest);
});

declare module 'fastify' {
  export interface FastifyInstance {
    echoGetRequest: EchoGetRequest;
  }
}
