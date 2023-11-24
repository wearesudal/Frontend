import { localAxios } from '@/util/http-commons';

const ax = localAxios();

async function userConfirm(param, success, fail) {
  console.log('param', param);
  await ax.post(`/user/login`, param).then(success).catch(fail);
  console.log('userConfirm ok');
}

async function findByIdx(useridx, success, fail) {
  ax.defaults.headers['Authorization'] = localStorage.getItem('accessToken');
  await ax.get(`/user/info`).then(success).catch(fail);
}

// async function tokenRegeneration(user, success, fail) {
//   local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
//   await local.post(`/user/refresh`, user).then(success).catch(fail);
// }

async function logout(success, fail) {
  await ax.post(`/user/logout`).then(success).catch(fail);
}

export { userConfirm, findByIdx, logout };
