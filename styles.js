export default `* {
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
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

input[type="checkbox"] {
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
  transition: 0.15s ease-out background;
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

form {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6em, 1fr));
  gap: 1em;
  align-content: start;
  border: 1px solid #888;
  border-radius: 1em;
  padding: 1em;
  overflow-y: auto;
  flex: 1;
}

label {
  height: 6rem;
  width: 6rem;
}

div {
  font-size: 2rem;
  font-family: "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji";
  cursor: pointer;
}

span {
  font-size: 0.8rem;
  font-family: -apple-system, BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu,
    Cantarell, "Helvetica Neue", "Noto Color Emoji", "Apple Color Emoji",
    "Segoe UI Emoji", sans-serif;
}

button {
  background: none;
  border: none;
  padding: 0;
}

.progress {
  color: #bbb;
  font-size: 4rem;
  padding: 0.2em;
  cursor: default;
}
`;
