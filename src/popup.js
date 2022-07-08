import {
  MESSAGE_TYPES,
} from './constants.js';
import {
  createCodemaoToolTab,
  getFestivalLoggedInInfo,
  getInternalAccountToken,
  sendMessage,
} from './tools.js';

const openToolBtn = document.getElementById('openToolBtn');

const getFestivalLoginInfo = async () => {
  const info = await getFestivalLoggedInInfo();

  return {
    loggedIn: info.loggedIn,
    info: {
      token: info.token,
      teacherEmail: info.teacherEmail,
    },
  };
};
const getInternalAccountLoginInfo = async () => {
  const token = await getInternalAccountToken();
  return {
    loggedIn: !!token,
    info: {token},
  };
};

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

  const validLogin = await sendMessage({
    type: MESSAGE_TYPES.HANDLE_LOGIN_INFO,
    message: {festivalLoggedIn, internalAccountLoggedIn},
  });
  if (!validLogin) return;

  const {token, teacherEmail} = festivalLoggedInInfo;

  await createCodemaoToolTab(
      token,
      teacherEmail,
      internalAccountLoginInfo.token,
  );
};

openToolBtn.addEventListener('click', openToolHandler);
