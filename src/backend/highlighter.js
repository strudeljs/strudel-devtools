const HIGHLIGHTER_SELECTOR = 'strudelDevtools-highlighter';

const Highlighter = (() => {
  let el = createEl();
  let name = el.querySelector(`.${HIGHLIGHTER_SELECTOR}-name`);

  function setHighlighterComponent(component) {
    const { left, top, width, height } = component.getBoundingClientRect();

    el.style.left = left;
    el.style.top = top;
    el.style.width = width;
    el.style.height = height;
    name.innerText = component.__strudel__.constructor.name;
  }

  function resetHighlighter() {
    el.style.left = '';
    el.style.top = '';
    el.style.width = '';
    el.style.height = '';
    name.innerText = '';
  }

  function attach(component) {
    setHighlighterComponent(component);
    document.documentElement.appendChild(el);
  }

  function detach() {
    resetHighlighter();
    el.parentNode.removeChild(el);
  }

  function createEl() {
    const el = document.createElement('div');
    const name = document.createElement('span');

    name.classList.add(`${HIGHLIGHTER_SELECTOR}-name`);
    el.append(name);
    el.classList.add(HIGHLIGHTER_SELECTOR);

    return el;
  }

  return {
    attach,
    detach,
  };
})();

export {
  Highlighter,
};
