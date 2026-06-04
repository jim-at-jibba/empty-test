# Fix Summary: Counter "-1" Button Bug (ROH-15)

## Root Cause
The decrement button event listener in `app.js` (line 14) was using the increment operator (`+=`) instead of the decrement operator (`-=`):

```javascript
// BEFORE (buggy):
document.getElementById("decrement").addEventListener("click", () => {
  count += 1;  // ← Wrong operator: increments instead of decrements
  countEl.textContent = count;
});
```

This caused the "-1" button to increase the count instead of decreasing it.

## Fix Applied
Changed the operator from `+=` to `-=`:

```javascript
// AFTER (fixed):
document.getElementById("decrement").addEventListener("click", () => {
  count -= 1;  // ← Correct operator: now decrements as intended
  countEl.textContent = count;
});
```

## Testing
Two test files were added:

1. **app.test.js** - Unit tests that verify the counter logic:
   - `test('decrement decreases count by 1')` - Tests that decrement works correctly
   - Additional tests verify increment, reset, and multiple operations

2. **integration-test.html** - Interactive browser-based test that:
   - Shows manual counter buttons to test live behavior
   - Runs automated test cases and displays results
   - Can be opened in any browser to verify the fix works

## Verification
- The fix changes only the single line causing the bug
- No refactoring or unrelated changes
- The decrement handler now mirrors the increment handler with the correct operator
- All three counter operations (increment, decrement, reset) work correctly
