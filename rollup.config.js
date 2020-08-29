module.exports = {
  external: [
    'react',
  ],
  input: 'lib/es/index.js',
  output: {
    name: 'konjac',
    globals: {
      react: 'React'
    },
    file: 'lib/umd/konjac.js',
    format: 'umd'
  }
}
