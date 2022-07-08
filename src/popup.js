/* eslint-disable no-undef */

import {createCodemaoToolTab, createInternalAccountTab} from './tools';

const openToolBtn = document.getElementById('openToolBtn');

const getFestivalLoginInfo = async () => ({
  loggedIn: false,
  info: null,
});
const getInternalAccountLoginInfo = async () => ({
  loggedIn: false,
  info: null,
}); npm;

const getLoginInfo = async () => {
  const festivalLoginInfo = await getFestivalLoginInfo();
  const internalAccountLoginInfo = await getInternalAccountLoginInfo();

  return {
    festival: festivalLoginInfo,
    internalAccount: internalAccountLoginInfo,
  };
};
const openToolHandler = async () => {
  const {
    festival: {
      loggedIn: festivalLoggedIn,
      info: festivalLoggedInInfo,
    },
    internalAccount: {
      loggedIn: internalAccountLoggedIn,
      info: internalAccountLoginInfo,
    },
  } = await getLoginInfo();

  console.log(festivalLoggedInInfo, internalAccountLoginInfo);
  if (!internalAccountLoggedIn) {
    createInternalAccountTab();
    return;
  }

  if (!festivalLoggedIn) {
    createFestivalTab();
    return;
  }

  const {loggedIn, token, teacherEmail} = loggedInInfo;

  if (loggedIn) {
    await createCodemaoToolTab(token, teacherEmail, internalAccountToken);
  } else {
    await alertInTab(ALERT_LOGIN_FESTIVAL);
    await selectFestivalTab();
  }
};

openToolBtn.addEventListener('click', openToolHandler);
