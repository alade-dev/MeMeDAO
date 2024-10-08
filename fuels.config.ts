import { createConfig } from 'fuels';

export default createConfig({
  contracts: [
        'sway/meme',
        'sway/src-20',
        'sway/token_factory'
  ],
  output: './src/sway-api',
});

/**
 * Check the docs:
 * https://docs.fuel.network/docs/fuels-ts/fuels-cli/config-file/
 */
