import typescript from "rollup-plugin-typescript2";
import cleanup from "rollup-plugin-cleanup";

// ----------------------------------------------------------------------------

const version = "0.7.2";
const cleanBuild = true;

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

export const input = `src/${moduleName}.ts`;

export const createPlugins = compilerOptionsOverride => [
  typescript({
    useTsconfigDeclarationDir: true,
    celan: cleanBuild,
    tsconfigOverride: compilerOptionsOverride
      ? { compilerOptions: compilerOptionsOverride }
      : undefined
  }),
  cleanup({
    comments: /^\*\*/, // preserve jsdoc comments
    sourcemap: false,
    extensions: ["ts"]
  })
];
