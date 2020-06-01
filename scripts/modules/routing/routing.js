import handleHeader from './handleHeader.js';
import updateNavigation from './updateNavigation.js';
import {navLinkEvents, popstateEvents, navToggleEvent} from './events.js';

const routing = async (pageCallbacks) => {
  await handleHeader();
  updateNavigation();
  navLinkEvents(pageCallbacks);
  popstateEvents(pageCallbacks);
  navToggleEvent();
};

export default routing;
