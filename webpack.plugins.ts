import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure"
  }),
  new CopyPlugin({
    patterns: [
      {
        from: "src/public/assets",
        to: "main_window/static"
      }
    ]
  })
];
