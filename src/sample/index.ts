import { FastifyPluginAsync } from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';
import errorHandler from './errors/error-handler';

const campaigns: FastifyPluginAsync = async ($) => {
  $.register(errorHandler);
  $.register(AutoLoad, {
    dir: join(__dirname, 'schemas'),
  });
  $.register(AutoLoad, {
    dir: join(__dirname, 'echo'),
  });
  $.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/sample' },
  });
};

export default campaigns;
