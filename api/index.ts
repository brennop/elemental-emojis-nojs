import { NowRequest, NowResponse } from "@vercel/node";
import elements from "../elements.json";
import recipes from "../recipes.json";
import styles from "../styles.js";
import { minify } from "html-minifier";

export default function (req: NowRequest, res: NowResponse) {
  const { progress } = req.cookies;

  const params = req.query;

  const inputs = Object.keys(params);

  const recipe = recipes.find(
    (recipe) =>
      recipe.inputs.sort().toString() === [...new Set(inputs)].sort().toString()
  );

  const state = new Set(
    progress ? JSON.parse(progress) : ["water", "air", "fire", "earth"]
  );

  if (recipe) state.add(recipe.output);

  res.setHeader(
    "Set-Cookie",
    `progress=${JSON.stringify([...state])}; Max-Age=31557600`
  );

  const result = minify(
    `
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Elemental Emojis</title>
  <style>
${styles}
  </style>
</head>

<body>
  <h1>⚛ Elemental Emojis</h1>
  <form>
    ${[...state].reduce(generateHiddenInputs, "")}
    ${[...state].reduce(generateElement, "")}
  </form> 
  <span class="progress">${[...state].length}/${elements.length}</span>
</body>
</html>
  `,
    {
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true,
      minifyCSS: true,
    }
  );

  res.send(result);
}

function generateElement(string, value) {
  const element = elements.find((element) => element.name === value);

  if (!element) return "";

  return `
  ${string}
  <label class="primary" for=${element.name}>
    <div>${element.emoji}</div>
    <span>${element.displayName}</span>
  </label>
  <button class="secondary">
    <label for=${element.emoji} class="${element.name}">
      <div>${element.emoji}</div>
      <span>${element.displayName}</span>
    </label>
    <input type="checkbox" name=${element.name} id=${element.emoji} />
  </button>
  `;
}

function generateHiddenInputs(string, value) {
  const element = elements.find((element) => element.name === value);

  if (!element) return "";
  return `
  ${string}
  <input class="normal" type="checkbox" name=${element.name} id=${element.name} />
 `;
}
