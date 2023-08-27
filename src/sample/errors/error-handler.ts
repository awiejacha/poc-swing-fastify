import fp from 'fastify-plugin';
import AbortError from './AbortError';

export default fp(async ($) => {
  $.setErrorHandler((error, request, reply) => {
    if (error instanceof AbortError) {
      reply.status(409).send({
        message: error.message,
        error: 'Abort',
        statusCode: 409,
      });
      return;
    }

    reply.send(error);
  });
});
