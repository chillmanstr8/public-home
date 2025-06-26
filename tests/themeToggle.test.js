const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// helper to load DOM with script
function loadDom() {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
  // stub IntersectionObserver used in script
  dom.window.IntersectionObserver = class { constructor(){} observe(){} };
  const scriptContent = fs.readFileSync(path.resolve(__dirname, '../js/script.js'), 'utf8');
  const scriptEl = dom.window.document.createElement('script');
  scriptEl.textContent = scriptContent;
  dom.window.document.body.appendChild(scriptEl);
  // trigger load event for any listeners
  dom.window.dispatchEvent(new dom.window.Event('load'));
  return dom;
}

describe('Theme Toggle', () => {
  test('clicking theme-toggle toggles light class on body', () => {
    const dom = loadDom();
    const document = dom.window.document;
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;

    // body should not have light class initially
    expect(body.classList.contains('light')).toBe(false);

    // first click adds light class
    toggle.dispatchEvent(new dom.window.Event('click'));
    expect(body.classList.contains('light')).toBe(true);

    // second click removes light class
    toggle.dispatchEvent(new dom.window.Event('click'));
    expect(body.classList.contains('light')).toBe(false);
  });
});
