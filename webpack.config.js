const path = require("node:path");

const Copy = require("copy-webpack-plugin");
const ESLint = require("eslint-webpack-plugin");
const sourceMap = require("source-map-support");
const Terser = require("terser-webpack-plugin");

sourceMap.install({
  environment: "node",
  handleUncaughtExceptions: true,
  hookRequire: true
});

module.exports = function compile(initial) {
  return {
    ...initial,
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist")
    },
    target: "node",
    mode: ["staging", "production"].includes(process.env.NODE_ENV) ? "production" : "development",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "swc-loader",
            options: {
              sync: true,
              swcrc: true
            }
          }
        }
      ]
    },
    optimization: {
      ...initial.optimization,
      minimizer: [
        new Terser({
          extractComments: false,
          parallel: true,
          terserOptions: {
            compress: {
              passes: 2,
              keep_classnames: true,
              keep_fnames: true
            },
            format: {
              comments: false
            },
            mangle: {
              keep_classnames: true,
              keep_fnames: true
            }
          }
        })
      ]
    },
    plugins: [
      ...initial.plugins,
      new Copy({
        patterns: [
          {
            from: "resources",
            to: "resources"
          }
        ]
      }),
      new ESLint({
        extensions: ["js", "ts"]
      })
    ]
  };
};
