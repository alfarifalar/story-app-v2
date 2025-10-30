import { getActiveRoute } from '../routes/url-parser';
import CONFIG from '../config';

export function getUserToken() {
  try {
    const userToken = localStorage.getItem(CONFIG.USER_TOKEN_KEY);

    if (userToken === 'null' || userToken === 'undefined') {
      return null;
    }

    return userToken;
  } catch (error) {
    console.error('getUserToken: error:', error);
    return null;
  }
}

export function putUserToken(token) {
  try {
    localStorage.setItem(CONFIG.USER_TOKEN_KEY, token);
    return true;
  } catch (error) {
    console.error('putUserToken: error:', error);
    return false;
  }
}

export function removeUserToken() {
  try {
    localStorage.removeItem(CONFIG.USER_TOKEN_KEY);
    return true;
  } catch (error) {
    console.error('getLogout: error:', error);
    return false;
  }
}

const unauthenticatedRoutesOnly = ['/login', '/register'];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getUserToken();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.hash = '/';
    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getUserToken();

  if (!isLogin) {
    location.hash = '/login';
    return null;
  }

  return page;
}

export function getLogout() {
  removeUserToken();
}
