import {
  distributionDirectory,
  moduleName,
  umdName,
  bannerComment,
  input,
  createPlugins,
} from "./rollup-config-common";

export default {
  input,
  output: {
    file: `${distributionDirectory}/${moduleName}.js`,
    format: "umd",
    name: umdName,
    sourcemap: false,
    banner: bannerComment,
    preferConst: true,
  },
  plugins: createPlugins(),
};
