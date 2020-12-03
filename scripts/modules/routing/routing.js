import processOptions from './processOptions.js';
import handleHeader from './handleHeader.js';
import updateNavigation from './updateNavigation.js';
import {navLinkEvents, popstateEvents, navToggleEvent} from './events.js';

const routing = async (pageCallbacks, options) => {
  const config = await processOptions(options);
  await handleHeader(config);
  updateNavigation(config);
  navLinkEvents(pageCallbacks, config);
  popstateEvents(pageCallbacks, config);
  navToggleEvent(config);
};

export default routing;
