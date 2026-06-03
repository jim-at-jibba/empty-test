# Linear Tickets — Buggy Demo App

Copy each into Linear. One ticket per bug.

---

## BUG: Counter "-1" button increases the count

**Priority:** Medium

**Description**
In the Counter card, clicking the **-1** button increases the count instead of decreasing it.

**Steps to reproduce**
1. Open `index.html`
2. Click **-1**
3. Count goes up, not down

**Expected:** Count decreases by 1.
**Actual:** Count increases by 1.

**Hint:** `app.js` — `decrement` handler uses `count += 1`.

---

## BUG: Tip calculator returns wrong total

**Priority:** High

**Description**
The Tip Calculator produces an incorrect total. Inputs are treated as strings (concatenation) and the tip percentage is never divided by 100.

**Steps to reproduce**
1. Bill = `50`, Tip % = `20`
2. Click **Calculate**
3. Total shows `5020` instead of `60`

**Expected:** `60` (50 + 20% of 50).
**Actual:** `5020` (string concatenation).

**Hint:** `app.js` — `const total = bill + tip`. Parse to numbers and apply `tip/100`.

---

## BUG: Todo "Remaining" count ignores completed tasks

**Priority:** Medium

**Description**
The "Remaining" counter shows the total number of todos and never decreases when a task is marked done.

**Steps to reproduce**
1. Add 2 tasks
2. Click one to mark it done (strikethrough)
3. Remaining still shows `2`

**Expected:** Remaining counts only incomplete tasks.
**Actual:** Remaining = total tasks.

**Hint:** `app.js` — `remainingEl.textContent = todos.length`. Filter on `!todo.done`.

---

## BUG: Blank todos can be added

**Priority:** Low

**Description**
Clicking **Add** with an empty input adds a blank todo to the list.

**Steps to reproduce**
1. Leave the todo input empty
2. Click **Add**
3. An empty list item appears

**Expected:** Empty/whitespace input is ignored.
**Actual:** Blank todo added.

**Hint:** `app.js` — `add-todo` handler has no empty-input guard. Check `text.trim()`.

---

## BUG: Greeting button does nothing (console error)

**Priority:** High

**Description**
Clicking **Greet** does nothing and throws a TypeError in the console. The handler targets element id `greetings`, which does not exist (the element is `greeting`).

**Steps to reproduce**
1. Enter a name
2. Click **Greet**
3. Nothing appears; console shows `Cannot set properties of null`

**Expected:** "Hello, <name>!" displayed.
**Actual:** Nothing; TypeError.

**Hint:** `app.js` — `getElementById("greetings")` should be `"greeting"`.
