const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Simple test runner
let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`✗ ${name}`);
    console.error(`  ${err.message}`);
    testsFailed++;
  }
}

function expect(value) {
  return {
    toBe(expected) {
      if (value !== expected) {
        throw new Error(`Expected ${expected}, but got ${value}`);
      }
    }
  };
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

// Helper to create fresh DOM for each test
function createTestDOM() {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const dom = new JSDOM(html, { 
    url: 'http://localhost',
    runScripts: "outside-only"
  });
  
  const appCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
  dom.window.eval(appCode);
  
  return {
    dom: dom,
    document: dom.window.document,
    getCount: () => parseInt(dom.window.document.getElementById('count').textContent),
    click: (id) => dom.window.document.getElementById(id).click()
  };
}

// Run tests
describe('Counter', () => {
  test('increment button increases count by 1', () => {
    const { getCount, click } = createTestDOM();
    click('increment');
    expect(getCount()).toBe(1);
  });

  test('decrement button decreases count by 1', () => {
    const { getCount, click } = createTestDOM();
    click('decrement');
    expect(getCount()).toBe(-1);
  });

  test('reset button sets count to 0', () => {
    const { getCount, click } = createTestDOM();
    click('increment');
    click('increment');
    click('increment');
    expect(getCount()).toBe(3);
    
    click('reset');
    expect(getCount()).toBe(0);
  });

  test('decrement multiple times', () => {
    const { getCount, click } = createTestDOM();
    // Start from 0, click increment 5 times to get to 5
    for (let i = 0; i < 5; i++) {
      click('increment');
    }
    expect(getCount()).toBe(5);
    
    click('decrement');
    expect(getCount()).toBe(4);
    
    click('decrement');
    expect(getCount()).toBe(3);
  });
});

console.log(`\n${testsPassed} passed, ${testsFailed} failed\n`);
process.exit(testsFailed > 0 ? 1 : 0);
