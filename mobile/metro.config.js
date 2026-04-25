const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// config.resolver.extraNodeModules = {
//   '@nono-art/api': path.resolve(__dirname, '../libs/api/src'),
//   '@nono-art/api-types': path.resolve(__dirname, '../libs/api-types/src'),
//   '@nono-art/dal': path.resolve(__dirname, '../libs/dal/src'),
//   '@nono-art/domain': path.resolve(__dirname, '../libs/domain/src'),
//   '@nono-art/types': path.resolve(__dirname, '../libs/types/src'),
//   '@nono-art/ui-mobile': path.resolve(__dirname, '../libs/ui-mobile/src'),
//   '@nono-art/utils': path.resolve(__dirname, '../libs/utils/src'),
// };

// Путь к корню вашего монорепозитория
// const monorepoRoot = path.resolve(__dirname, '..');
// const projectRoot = __dirname;

// const config = getDefaultConfig(projectRoot);

// 1️⃣ Наблюдаем за всеми файлами в монорепозитории
// config.watchFolders = [monorepoRoot];

// 2️⃣ Указываем Metro, где искать пакеты
// config.resolver.nodeModulesPaths = [
//   path.resolve(projectRoot, 'node_modules'),
//   path.resolve(monorepoRoot, 'node_modules'),
// ];

// 💡 Если вы используете pnpm, добавьте эти строки
// config.resolver.unstable_enableSymlinks = true;
// config.watchFolders.push(path.resolve(monorepoRoot, 'node_modules/.pnpm'));

// module.exports = config;

config.server = {
  host: '0.0.0.0',
};

module.exports = config;
