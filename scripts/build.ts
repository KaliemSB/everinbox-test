import { $, build } from 'bun';

await $`rm -rf dist`;

const optionalRequirePackages = [
  'class-transformer',
  'class-validator',
  '@nestjs/microservices',
  '@nestjs/websockets',
  '@fastify/static',
  'mqtt',
  'ioredis',
  'nats',
  'amqplib',
  'kafkajs',
  '@grpc/grpc-js',
  'amqp-connection-manager',
];

const result = await build({
  entrypoints: ['./src/main.ts'],
  outdir: './dist',
  target: 'bun',
  minify: {
    syntax: true,
    whitespace: true,
  },
  external: optionalRequirePackages.filter((pkg) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(pkg);
      return false;
    } catch {
      return true;
    }
  }),
  splitting: true,
});

if (!result.success) {
  console.log(result.logs[0]);
  process.exit(1);
}

console.log('Built successfully!');
