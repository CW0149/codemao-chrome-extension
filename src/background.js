import {
  ALERT_LOGIN_FESTIVAL,
  ALERT_LOGIN_INTERNAL_ACCOUNT,
  INTERNAL_ACCOUNT_PLATFORM_URL,
  MESSAGE_TYPES, TO_MATCH_FESTIVAL_URL,
} from './constants.js';
import {alertInTab} from './tools.js';

const alertInNewTab = async (message, url) => {
  const newTab = await chrome.tabs.create({url, active: true});

  await alertInTab(newTab.id, message);
};


chrome.runtime.onMessage.addListener(async (request, _, sendResponse) => {
  const {type, message} = request;

  switch (type) {
    case MESSAGE_TYPES.ALERT_IN_NEW_TAB:
      await alertInNewTab(message, request.url);
      break;

    case MESSAGE_TYPES.HANDLE_LOGIN_INFO:
      await handleLoginMessage(message, sendResponse);

    default:
  }
});

const handleLoginMessage = async (message, sendResponse) => {
  const {festivalLoggedIn, internalAccountLoggedIn} = message;
  if (festivalLoggedIn && internalAccountLoggedIn) {
    return sendResponse(true);
  }

  if (!internalAccountLoggedIn) {
    await alertInNewTab(
        ALERT_LOGIN_INTERNAL_ACCOUNT,
        INTERNAL_ACCOUNT_PLATFORM_URL,
    );
  }

  if (!festivalLoggedIn) {
    await alertInNewTab(
        ALERT_LOGIN_FESTIVAL,
        TO_MATCH_FESTIVAL_URL,
    );
  }

  return sendResponse(false);
};


