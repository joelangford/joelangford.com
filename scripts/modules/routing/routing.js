import handleHeader from './handleHeader.js';
import updateNavigation from './updateNavigation.js';
import {navLinkEvents, popstateEvents} from './events.js';

const routing = async () => {
  await handleHeader();
  updateNavigation();
  navLinkEvents();
  popstateEvents();
};

export default routing;
