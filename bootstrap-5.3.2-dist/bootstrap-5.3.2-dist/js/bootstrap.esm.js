/*!
  * Bootstrap v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
import * as Popper from '@popperjs/core';

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
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
const triggerTransitionEnd = element => {
  element.dispatchEvent(new Event(TRANSITION_END));
};
const isElement = object => {
  if (!object || typeof object !== 'object') {
    return false;
  }
  if (typeof object.jquery !== 'undefined') {
    object = object[0];
  }
  return typeof object.nodeType !== 'undefined';
};
const getElement = object => {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    reTOUCHEND","EVENT_POINTERDOWN","EVENT_POINTERUP","POINTER_TYPE_TOUCH","POINTER_TYPE_PEN","CLASS_NAME_POINTER_EVENT","SWIPE_THRESHOLD","endCallback","leftCallback","rightCallback","Swipe","isSupported","_deltaX","_supportPointerEvents","PointerEvent","_initEvents","_start","_eventIsPointerPenTouch","clientX","touches","_end","_handleSwipe","_move","absDeltaX","abs","direction","add","pointerType","navigator","maxTouchPoints","ARROW_LEFT_KEY","ARROW_RIGHT_KEY","TOUCHEVENT_COMPAT_WAIT","ORDER_NEXT","ORDER_PREV","DIRECTION_LEFT","DIRECTION_RIGHT","EVENT_SLIDE","EVENT_SLID","EVENT_KEYDOWN","EVENT_MOUSEENTER","EVENT_MOUSELEAVE","EVENT_DRAG_START","EVENT_LOAD_DATA_API","CLASS_NAME_CAROUSEL","CLASS_NAME_SLIDE","CLASS_NAME_END","CLASS_NAME_START","CLASS_NAME_NEXT","CLASS_NAME_PREV","SELECTOR_ACTIVE","SELECTOR_ITEM","SELECTOR_ACTIVE_ITEM","SELECTOR_ITEM_IMG","SELECTOR_INDICATORS","SELECTOR_DATA_SLIDE","SELECTOR_DATA_RIDE","KEY_TO_DIRECTION","ArrowLeft","ArrowRight","interval","keyboard","pause","ride","touch","wrap","Carousel","_interval","_activeElement","_isSliding","touchTimeout","_swipeHelper","_indicatorsElement","_addEventListeners","cycle","_slide","nextWhenVisible","hidden","_clearInterval","_updateInterval","setInterval","_maybeEnableCycle","to","items","_getItems","activeIndex","_getItemIndex","_getActive","order","defaultInterval","_keydown","_addTouchEventListeners","img","swipeConfig","_directionToOrder","endCallBack","clearTimeout","_setActiveIndicatorElement","activeIndicator","newActiveIndicator","elementInterval","parseInt","isNext","nextElement","nextElementIndex","triggerEvent","_orderToDirection","isCycling","directionalClassName","orderClassName","completeCallBack","_isAnimated","clearInterval","carousel","slideIndex","carousels","EVENT_SHOW","EVENT_SHOWN","EVENT_HIDE","EVENT_HIDDEN","CLASS_NAME_COLLAPSE","CLASS_NAME_COLLAPSING","CLASS_NAME_COLLAPSED","CLASS_NAME_DEEPER_CHILDREN","CLASS_NAME_HORIZONTAL","WIDTH","HEIGHT","SELECTOR_ACTIVES","parent","Collapse","_isTransitioning","_triggerArray","toggleList","elem","filterElement","foundElement","_initializeChildren","_addAriaAndCollapsedClass","_isShown","hide","show","activeChildren","_getFirstLevelChildren","activeInstance","dimension","_getDimension","style","scrollSize","complete","getBoundingClientRect","selected","triggerArray","isOpen","ESCAPE_KEY","TAB_KEY","ARROW_UP_KEY","ARROW_DOWN_KEY","RIGHT_MOUSE_BUTTON","EVENT_KEYDOWN_DATA_API","EVENT_KEYUP_DATA_API","CLASS_NAME_DROPUP","CLASS_NAME_DROPEND","CLASS_NAME_DROPSTART","CLASS_NAME_DROPUP_CENTER","CLASS_NAME_DROPDOWN_CENTER","SELECTOR_DATA_TOGGLE_SHOWN","SELECTOR_MENU","SELECTOR_NAVBAR","SELECTOR_NAVBAR_NAV","SELECTOR_VISIBLE_ITEMS","PLACEMENT_TOP","PLACEMENT_TOPEND","PLACEMENT_BOTTOM","PLACEMENT_BOTTOMEND","PLACEMENT_RIGHT","PLACEMENT_LEFT","PLACEMENT_TOPCENTER","PLACEMENT_BOTTOMCENTER","autoClose","boundary","display","offset","popperConfig","reference","Dropdown","_popper","_parent","_menu","_inNavbar","_detectNavbar","_createPopper","focus","_completeHide","destroy","update","Popper","referenceElement","_getPopperConfig","createPopper","_getPlacement","parentDropdown","isEnd","_getOffset","popperData","defaultBsPopperConfig","placement","modifiers","options","enabled","_selectMenuItem","clearMenus","openToggles","context","composedPath","isMenuTarget","dataApiKeydownHandler","isInput","isEscapeEvent","isUpOrDownEvent","getToggleButton","stopPropagation","EVENT_MOUSEDOWN","className","clickCallback","rootElement","Backdrop","_isAppended","_append","_getElement","_emulateAnimation","backdrop","createElement","append","EVENT_FOCUSIN","EVENT_KEYDOWN_TAB","TAB_NAV_FORWARD","TAB_NAV_BACKWARD","autofocus","trapElement","FocusTrap","_isActive","_lastTabNavDirection","activate","_handleFocusin","_handleKeydown","deactivate","elements","shiftKey","SELECTOR_FIXED_CONTENT","SELECTOR_STICKY_CONTENT","PROPERTY_PADDING","PROPERTY_MARGIN","ScrollBarHelper","getWidth","documentWidth","clientWidth","innerWidth","width","_disableOverFlow","_setElementAttributes","calculatedValue","reset","_resetElementAttributes","isOver