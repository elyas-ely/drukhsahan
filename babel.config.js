module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@functions": "./config/functions",
            "@validations": "./config/validations",
            "@components": "./components",
            "@contexts": "./config/contexts",
            "@constants": "./config/constants",
            "@utils": "./utils",
          },
        },
      ],
    ],
  }
}
