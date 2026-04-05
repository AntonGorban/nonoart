const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  '@nono-art/api': path.resolve(__dirname, '../libs/api/src'),
  '@nono-art/api-types': path.resolve(__dirname, '../libs/api-types/src'),
  '@nono-art/domain': path.resolve(__dirname, '../libs/domain/src'),
  '@nono-art/types': path.resolve(__dirname, '../libs/types/src'),
  '@nono-art/utils': path.resolve(__dirname, '../libs/utils/src'),
};

config.server = {
  host: '0.0.0.0',
};

module.exports = config;
