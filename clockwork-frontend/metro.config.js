/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * Supports:
 * - Path aliases like "@/components"
 * - Extra file extensions if needed
 */

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,

  resolver: {
    ...defaultConfig.resolver,
    // Add any custom extensions if needed
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
    // Support @ alias to the project root
    extraNodeModules: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  watchFolders: [
    path.resolve(__dirname, 'src'),
  ],
};
