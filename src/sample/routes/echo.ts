import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import AbortError from '../errors/AbortError';

type Request<Params = Record<string, unknown>, Querystring = Record<string, unknown>> = FastifyRequest<{
  Params: {
    sampleParam: string;
  } & Params;
  Querystring: {
    sampleQuery: string;
  } & Querystring;
}>;

const echo: FastifyPluginAsync = async ($) => {
  $.get('/echo/:sampleParam', {
    schema: {
      params: {
        $ref: 'echoRequestParams#',
      },
      querystring: {
        $ref: 'echoRequestQuery#',
      },
      headers: {},
    },
    handler: async (request: Request) => {
      const { sampleParam } = request.params;
      const { sampleQuery } = request.query;
      const response = await $.echoGetRequest(sampleParam, sampleQuery);

      if (!response) {
        throw new AbortError('Response not found');
      }

      return {
        echo: response,
      };
    },
  });
};

export default echo;
