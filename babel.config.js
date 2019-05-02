module.exports = {
  env: {
    development: {
      presets: ['next/babel'],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        'inline-dotenv',
        ['styled-components', { ssr: true, displayName: true }],
      ],
    },
    production: {
      presets: ['next/babel'],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        'transform-inline-environment-variables',
        ['react-intl', { messagesDir: 'translations/.messages/' }],
        ['styled-components', { ssr: true, displayName: true }],
      ],
    },
    test: {
      presets: [
        [
          'next/babel',
          {
            'preset-env': {
              modules: 'commonjs',
            },
          },
        ],
      ],
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    extract: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        ['react-intl', { messagesDir: 'translations/.messages/' }],
      ],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          common: './client/common',
          components: './client/components',
          containers: './client/containers',
          routes: './server/routes',
          reducers: './client/reducers',
        },
      },
    ],
    ['styled-components', { ssr: true, displayName: true }],
  ],
}
