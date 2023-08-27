import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
import sample from './sample';
import { join } from 'path';
import * as fastifyHelmet from '@fastify/helmet';
import * as fastifyJwt from '@fastify/jwt';

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  fastify.register(fastifyHelmet);
  fastify.register(fastifyJwt, {
    secret:
      process.env.JWT_SECRET ||
      'here should be rather an error that env is undefined, but let then at least the default secret be super long',
  });
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'hooks'),
  });
  fastify.register(sample, opts);
};

export default app;
export { app, options };
