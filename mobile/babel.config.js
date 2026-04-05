module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Для работы с алиасами workspace
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@nono-art/api': '../libs/api/src',
            '@nono-art/api-types': '../libs/api-types/src',
            '@nono-art/domain': '../libs/domain/src',
            '@nono-art/types': '../libs/types/src',
            '@nono-art/utils': '../libs/utils/src',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
      // Если используете react-native-reanimated
      'react-native-reanimated/plugin',
    ],
  };
};
