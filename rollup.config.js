import typescript from "rollup-plugin-typescript2";

const moduleName = "creative-coding-core";
const umdName = "CreativeCodingCore";
const version = "0.1.5";
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
      useTsconfigDeclarationDir: true
    })
  ]
};
