import {
  FESTIVAL_TOKEN_KEY,
  INTERNAL_ACCOUNT_PLATFORM_URL,
  INTERNAL_ACCOUNT_TOKEN_KEY,
  TOOL_URL,
  TO_MATCH_FESTIVAL_URL,
} from './constants.js';
import {getTeacherEmail} from './request.js';

export const getFestivalToken = async () => (
  await chrome.cookies.get({
    name: FESTIVAL_TOKEN_KEY,
    url: TO_MATCH_FESTIVAL_URL,
  })
)?.value;

export const getInternalAccountToken = async () => (
  await chrome.cookies.get({
    name: INTERNAL_ACCOUNT_TOKEN_KEY,
    url: INTERNAL_ACCOUNT_PLATFORM_URL,
  })
)?.value;

export const getFestivalLoggedInInfo = async () => {
  const token = await getFestivalToken();
  if (!token) return {loggedIn: false};

  const teacherEmail = await getTeacherEmail(token);
  if (!teacherEmail) return {loggedIn: false};

  return {loggedIn: true, token, teacherEmail};
};

export const createInternalAccountTab = async (active = true) =>
  await chrome.tabs.create({
    active,
    url: INTERNAL_ACCOUNT_PLATFORM_URL,
  });

export const createFestivalTab = (active = true) =>
  chrome.tabs.create({
    active,
    url: TO_MATCH_FESTIVAL_URL,
  });


export const createCodemaoToolTab = async (
    token,
    teacherEmail,
    internalAccountToken,
) => {
  const searchParams = new URLSearchParams({
    token,
    teacher_email: teacherEmail,
    internal_account_token: internalAccountToken,
  });

  return chrome.tabs.create({
    url: `${TOOL_URL}?${searchParams.toString()}`,
  });
};

export const alertInTab = async (tabId, message) =>
  chrome.scripting.executeScript({
    target: {tabId},
    args: [message],
    func: (message) => alert(message),
  });

export const getExistingFestivalTabs = () => chrome.tabs.query({
  url: TO_MATCH_FESTIVAL_URL,
  currentWindow: true,
});

export const selectFestivalTab = async () => {
  const existingTabs = await getExistingFestivalTabs();
  let toSelectTab = null;

  switch (existingTabs.length) {
    case 0:
      toSelectTab = await createFestivalTab(false);
      break;

    case 1:
      toSelectTab = existingTabs[0];
      break;

    default:
      /**
       * Remove extra codemao pages
       */
      toSelectTab = existingTabs[existingTabs.length - 1];
      await chrome.tabs.remove(
          existingTabs.slice(0, -1).map((tab) => tab.id),
      );
  }

  chrome.tabs.update(toSelectTab.id, {active: true});
};


export const sendMessage = async (messageObj) => {
  return chrome.runtime.sendMessage(messageObj);
};
