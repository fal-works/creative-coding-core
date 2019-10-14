import typescript from "rollup-plugin-typescript2";
import cleanup from "rollup-plugin-cleanup";

const version = "0.1.7";
const cleanBuild = false;

const moduleName = "creative-coding-core";
const umdName = "CreativeCodingCore";
const year = "2019";
const description = `* Utility library that might be useful for creative coding.`;

const bannerComment = `/**
${description}
 * GitHub repository: {@link https://github.com/fal-works/${moduleName}}
 * @module ${moduleName}
 * @copyright ${year} FAL
 * @author FAL <contact@fal-works.com>
 * @license MIT
 * @version ${version}
 */
`;

export default {
  input: `src/${moduleName}.ts`,
  output: [
    {
      file: `lib/${moduleName}.js`,
      format: "umd",
      name: umdName,
      sourcemap: false,
      banner: bannerComment,
      preferConst: true
    },
    {
      file: `lib/${moduleName}.mjs`,
      format: "es",
      sourcemap: false,
      banner: bannerComment,
      preferConst: true
    }
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
      celan: cleanBuild
    }),
    cleanup({
      comments: /^\*\*/, // preserve multiline comments
      sourcemap: false,
      extensions: ["ts"]
    })
  ]
};
