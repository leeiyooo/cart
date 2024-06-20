/*!
  * Bootstrap v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bootstrap = factory());
})(this, (function () { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap dom/data.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  /**
   * Constants
   */

  const elementMap = new Map();
  const Data = {
    set(element, key, instance) {
      if (!elementMap.has(element)) {
        elementMap.set(element, new Map());
      }
      const instanceMap = elementMap.get(element);

      // make it clear we only want one instance per element
      // can be removed later when multiple key/instances are fine to be used
      if (!instanceMap.has(key) && instanceMap.size !== 0) {
        // eslint-disable-next-line no-console
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
        return;
      }
      instanceMap.set(key, instance);
    },
    get(element, key) {
      if (elementMap.has(element)) {
        return elementMap.get(element).get(key) || null;
      }
      return null;
    },
    remove(element, key) {
      if (!elementMap.has(element)) {
        return;
      }
      const instanceMap = elementMap.get(element);
      instanceMap.delete(key);

      // free up element references if there are no instances left for an element
      if (instanceMap.size === 0) {
        elementMap.delete(element);
      }
    }
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap util/index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
   * --------------------------------------------------------------------------
   */

  const MAX_UID = 1000000;
  const MILLISECONDS_MULTIPLIER = 1000;
  const TRANSITION_END = 'transitionend';

  /**
   * Properly escape IDs selectors to handle weird IDs
   * @param {string} selector
   * @returns {string}
   */
  const parseSelector = selector => {
    if (selector && window.CSS && window.CSS.escape) {
      // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
      selector = selector.replace(/#([^\s"#']+)/g, (match, id) => `#${CSS.escape(id)}`);
    }
    return selector;
  };

  // Shout-out Angus Croll (https://goo.gl/pxwQGp)
  const toType = object => {
    if (object === null || object === undefined) {
      return `${object}`;
    }
    return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
  };

  /**
   * Public Util API
   */

  const getUID = prefix => {
    do {
      prefix += Math.floor(Math.random() * MAX_UID);
    } while (document.getElementById(prefix));
    return prefix;
  };
  const getTransitionDurationFromElement = element => {
    if (!element) {
      return 0;
    }

    // Get transition-duration of the element
    let {
      transitionDuration,
      transitionDelay
    } = window.getComputedStyle(element);
    const floatTransitionDuration = Number.parseFloat(transitionDuration);
    const floatTransitionDelay = Number.parseFloat(transitionDelay);

    // Return 0 if element or transition duration is not found
    if (!floatTransitionDuration && !floatTransitionDelay) {
      return 0;
    }

    // If multiple durations are defined, take the first
    transitionDuration = transitionDuration.split(',')[0];
    transitionDelay = transitionDelay.split(',')[0];
    return (Number.parseFloat(transitionDuration) + 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.parents(e,".nav, .list-group"))for(const e of SelectorEngine.prev(t,SELECTOR_LINK_ITEMS))e.classList.add("active")}_clearActiveClass(e){e.classList.remove("active");const t=SelectorEngine.find("[href].active",e);for(const e of t)e.classList.remove("active")}static jQueryInterface(e){return this.each((function(){const t=ScrollSpy.getOrCreateInstance(this,e);if("string"==typeof e){if(void 0===t[e]||e.startsWith("_")||"constructor"===e)throw new TypeError(`No method named "${e}"`);t[e]()}}))}}EventHandler.on(window,EVENT_LOAD_DATA_API$1,(()=>{for(const e of SelectorEngine.find(SELECTOR_DATA_SPY))ScrollSpy.getOrCreateInstance(e)})),defineJQueryPlugin(ScrollSpy);const NAME$1="tab",DATA_KEY$1="bs.tab",EVENT_KEY$1=".bs.tab",EVENT_HIDE$1="hide.bs.tab",EVENT_HIDDEN$1="hidden.bs.tab",EVENT_SHOW$1="show.bs.tab",EVENT_SHOWN$1="shown.bs.tab",EVENT_CLICK_DATA_API="click.bs.tab",EVENT_KEYDOWN="keydown.bs.tab",EVENT_LOAD_DATA_API="load.bs.tab",ARROW_LEFT_KEY="ArrowLeft",ARROW_RIGHT_KEY="ArrowRight",ARROW_UP_KEY="ArrowUp",ARROW_DOWN_KEY="ArrowDown",HOME_KEY="Home",END_KEY="End",CLASS_NAME_ACTIVE="active",CLASS_NAME_FADE$1="fade",CLASS_NAME_SHOW$1="show",CLASS_DROPDOWN="dropdown",SELECTOR_DROPDOWN_TOGGLE=".dropdown-toggle",SELECTOR_DROPDOWN_MENU=".dropdown-menu",NOT_SELECTOR_DROPDOWN_TOGGLE=":not(.dropdown-toggle)",SELECTOR_TAB_PANEL='.list-group, .nav, [role="tablist"]',SELECTOR_OUTER=".nav-item, .list-group-item",SELECTOR_INNER='.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle)',SELECTOR_DATA_TOGGLE='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',SELECTOR_INNER_ELEM=`${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`,SELECTOR_DATA_TOGGLE_ACTIVE='.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]';class Tab extends BaseComponent{constructor(e){super(e),this._parent=this._element.closest(SELECTOR_TAB_PANEL),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),EventHandler.on(this._element,EVENT_KEYDOWN,(e=>this._keydown(e))))}static get NAME(){return"tab"}show(){const e=this._element;if(this._elemIsActive(e))return;const t=this._getActiveElem(),n=t?EventHandler.trigger(t,EVENT_HIDE$1,{relatedTarget:e}):null;EventHandler.trigger(e,EVENT_SHOW$1,{relatedTarget:t}).defaultPrevented||n&&n.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,t){e&&(e.classList.add("active"),this._activate(SelectorEngine.getElementFromSelector(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),EventHandler.trigger(e,EVENT_SHOWN$1,{relatedTarget:t})):e.classList.add("show")}),e,e.classList.contains("fade")))}_deactivate(e,t){e&&(e.classList.remove("active"),e.blur(),this._deactivate(SelectorEngine.getElementFromSelector(e)),this._queueCallback((()=>{"tab"===e.getAttribute("role")?(e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),EventHandler.trigger(e,EVENT_HIDDEN$1,{relatedTarget:t})):e.classList.remove("show")}),e,e.classList.contains("fade")))}_keydown(e){if(![ARROW_LEFT_KEY,ARROW_RIGHT_KEY,ARROW_UP_KEY,ARROW_DOWN_KEY,HOME_KEY,END_KEY].includes(e.key))return;e.stopPropagation(),e.preventDefault();const t=this._getChildren().filter((e=>!isDisabled(e)));let n;if([HOME_KEY,END_KEY].includes(e.key))n=t[e.key===HOME_KEY?0:t.length-1];else{const i=[ARROW_RIGHT_KEY,ARROW_DOWN_KEY].includes(e.key);n=getNextActiveElement(t,e.target,i,!0)}n&&(n.focus({preventScroll:!0}),Tab.getOrCreateInstance(n).show())}_getChildren(){return SelectorEngine.find(SELECTOR_INNER_ELEM,this._parent)}_getActiveElem(){return this._getChildren().find((e=>this._elemIsActive(e)))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist");for(const e of t)this._setInitialAttributesOnChild(e)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e);const t=this._elemIsActive(e),n=this._getOuterElement(e);e.setAttribute("aria-selected",t),n!==e&&this._setAttri