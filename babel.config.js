module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/Screens',
          '@components': './src/Components',
          '@redux': './src/Redux',
          '@navigation': './src/Navigation',
          '@constants': './src/Constants',
          '@API': './src/API',
          '@functions': './src/Functions',
        },
      },
    ],
    'jest-hoist',
  ],
};
