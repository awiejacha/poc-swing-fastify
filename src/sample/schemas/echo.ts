import fp from 'fastify-plugin';

export default fp(async ($) => {
  $.addSchema({
    $id: 'echoRequestParams',
    type: 'object',
    properties: {
      sampleParam: {
        type: 'string',
        pattern: '^[0-9a-zA-Z]+$',
      },
    },
    required: ['sampleParam'],
  }).addSchema({
    $id: 'echoRequestQuery',
    type: 'object',
    properties: {
      sampleQuery: {
        type: 'string',
        pattern: '^[0-9a-zA-Z]+$',
      },
    },
    required: ['sampleQuery'],
  });
});
