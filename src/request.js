export const getFestivalData = (token, url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      token,
    },
  }).then((res) => {
    return res.json();
  });
};

export const getTeacherEmail = (token) => {
  return getFestivalData(
      token,
      'https://festival.codemao.cn/yyb2019/index/info',
  ).then((res) => res?.info?.username ?? '');
};
