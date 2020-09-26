import { NowRequest, NowResponse } from "@vercel/node";
import elements from "../elements.json";
import recipes from "../recipes.json";

export default function (req: NowRequest, res: NowResponse) {
  const { progress } = req.cookies;

  const params = req.query;

  const inputs = Object.keys(params);

  const recipe = recipes.find(
    (recipe) =>
      recipe.inputs.sort().toString() === [...new Set(inputs)].sort().toString()
  );

  const state = new Set(
    progress ? JSON.parse(progress) : ["water", "fire", "air", "earth"]
  );

  if (recipe) state.add(recipe.output);

  res.setHeader("Set-Cookie", `progress=${JSON.stringify([...state])}`);

  res.send(`
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Elemental Emojis</title>
  ${styles}
</head>

<body>
  <h1>⚛ Elemental Emojis</h1>
  <form>
    ${[...state].reduce(generateHiddenInputs, "")}
    ${[...state].reduce(generateElement, "")}
  </form> 
</body>
</html>
  `);
}

function generateElement(string, value) {
  const element = elements.find((element) => element.name === value);

  if (!element) return "";

  return `
  ${string}
  <label class="primary" for=${element.name}>${element.emoji}</label>
  <button class="secondary">
    <label for=${element.emoji}>${element.emoji}</label>
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

const styles = `
<style>
  input[type=checkbox] {
    display: none;
  }

  .secondary {
    display: none;
  }

  .normal:checked ~ .secondary {
    display: inline;
  }

  .normal:checked ~ .primary {
    display: none;
  }
</style>
`;
