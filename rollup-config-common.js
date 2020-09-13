import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";

// ----------------------------------------------------------------------------

const version = "0.10.0";

const moduleName = "creative-coding-core";
const umdName = "CreativeCodingCore";
const year = "2019-2020";
const description = `* Utility library that might be useful for creative coding.`;

const bannerComment = `/**
 * ${moduleName}
 *
${description}
 * GitHub repository: {@link https://github.com/fal-works/${moduleName}}
 *
 * @module ${moduleName}
 * @copyright ${year} FAL
 * @author FAL <contact@fal-works.com>
 * @license MIT
 * @version ${version}
 */
`;

const distributionDirectory = "lib";

// ----------------------------------------------------------------------------

export { distributionDirectory, moduleName, umdName, bannerComment };

export const input = `out/${moduleName}.js`;

export const createPlugins = () => [
  resolve(),
  cleanup({
    comments: /^\*\*/, // preserve jsdoc comments
    sourcemap: false,
    extensions: ["js"],
  }),
];
