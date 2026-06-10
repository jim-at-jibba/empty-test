// Buggy Demo App
// Contains several deliberate bugs. See BUGS.md.

// ---------- Counter ----------
let count = 0;
const countEl = document.getElementById("count");

document.getElementById("increment").addEventListener("click", () => {
  count += 1;
  countEl.textContent = count;
});

document.getElementById("decrement").addEventListener("click", () => {
  count -= 1;
  countEl.textContent = count;
});

document.getElementById("reset").addEventListener("click", () => {
  count = 0;
  countEl.textContent = count;
});

// ---------- Tip Calculator ----------
document.getElementById("calc-tip").addEventListener("click", () => {
  const bill = document.getElementById("bill").value;
  const tip = document.getElementById("tip").value;

  // BUG 2: values are strings, so this concatenates instead of adding.
  // Also the tip percentage is never divided by 100.
  const total = bill + tip;

  document.getElementById("total").textContent = total;
});

// ---------- Todo List ----------
let todos = [];
const listEl = document.getElementById("todo-list");
const remainingEl = document.getElementById("remaining");

function renderTodos() {
  listEl.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) li.classList.add("done");

    li.addEventListener("click", () => {
      todo.done = !todo.done;
      renderTodos();
    });

    listEl.appendChild(li);
  });

  // BUG 3: counts all todos as remaining, ignoring completed ones
  remainingEl.textContent = todos.length;
}

document.getElementById("add-todo").addEventListener("click", () => {
  const input = document.getElementById("todo-input");
  const text = input.value;

  // BUG 4: missing check for empty input — blank todos get added
  todos.push({ text: text, done: false });
  input.value = "";
  renderTodos();
});

// ---------- Greeting ----------
document.getElementById("greet").addEventListener("click", () => {
  const name = document.getElementById("name-input").value;

  // BUG 5: wrong element id — writes to "greetings" which does not exist,
  // throwing a TypeError so nothing shows up.
  document.getElementById("greetings").textContent = "Hello, " + name + "!";
});
