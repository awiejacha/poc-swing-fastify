import fp from 'fastify-plugin';

export default fp(async ($) => {
  $.addHook('preSerialization', async (request, reply, payload: any) => {
    if (typeof payload !== 'object' || payload === null) {
      return;
    }

    const decoratedPayload = { ...payload };

    if (!payload.statusCode) {
      // eslint-disable-next-line no-param-reassign
      decoratedPayload.statusCode = reply.statusCode;
    }

    // eslint-disable-next-line consistent-return
    return decoratedPayload;
  });
});
