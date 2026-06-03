# Planted Bugs — ticket source

5 deliberate bugs in `app.js`. One ticket each.

| # | Feature | Symptom | Root cause | Fix |
|---|---------|---------|------------|-----|
| 1 | Counter | "-1" button increases count | `decrement` handler uses `count += 1` | change to `count -= 1` |
| 2 | Tip Calculator | Total is wrong (e.g. "5020", or no division) | string concat + no `/100` | `parseFloat(bill) + parseFloat(bill) * (parseFloat(tip)/100)` |
| 3 | Todo List | "Remaining" never drops when task done | counts `todos.length` | count `todos.filter(t => !t.done).length` |
| 4 | Todo List | Blank tasks get added | no empty-input guard | skip when `text.trim() === ""` |
| 5 | Greeting | Nothing happens, console TypeError | wrong id `greetings` | use `greeting` |

## Run

Open `index.html` in browser. No build step.
