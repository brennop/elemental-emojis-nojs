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
    progress ? JSON.parse(progress) : ["water", "air", "fire", "earth"]
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

const styles = `
<style>
  * {
    cursor: default;
    box-sizing: border-box;
    font-size: 100%;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  h1 {
    font-size: 2rem;
  }

  body {
    color: #333;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu,
      Cantarell, "Helvetica Neue", "Noto Color Emoji", "Apple Color Emoji",
      "Segoe UI Emoji", sans-serif;
    padding: 1em
  }

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

  label {
    border-radius: 0.8rem;
    padding: 1em;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.15s ease-out;
    justify-content: space-between;

    position: relative;
    box-shadow: inset 0 0 0px 0px #2fd3fc20;
  }

  label:hover {
    background: #2fd3fc20;
  }

  .selected {
    box-shadow: inset 0 0 0px 6px #2fd3fc20;
  }

  form  {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
    gap: 1em;
    align-content: start;
    border: 1px solid #888;
    border-radius: 1em;
    padding: 1em;
    overflow-y: auto;
  }

  label {
    height: 6rem;
    width: 6rem;
  }

  div  {
    font-size: 2rem;
    font-family: "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji";
  }

  span  {
    font-size: .8rem;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu,
      Cantarell, "Helvetica Neue", "Noto Color Emoji", "Apple Color Emoji",
      "Segoe UI Emoji", sans-serif;
  }

  button {
    background: none;
    border: none;
    padding: 0;
  }
</style>
`;
