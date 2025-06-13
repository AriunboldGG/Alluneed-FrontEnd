import Cookies from 'js-cookie';

export const setcookie = (value) => {
  Cookies.set('token', JSON.stringify(value), { expires: 1 });
};

export const getcookie = () => {
  return Cookies.get('token');
};

export const removeCookie = () => {
  Cookies.remove('token', { path: '' });
};
