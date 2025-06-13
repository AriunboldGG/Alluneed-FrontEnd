import Cookies from 'js-cookie';

export const setcookie = (value) => {
    Cookies.set('user', JSON.stringify(value), { expires: 1 });
};

export const getcookie = () => {
    return Cookies.get('user');
};

export const removeCookie = () => {
    Cookies.remove('user', { path: '' });
    Cookies.remove('csrftoken', { path: '' });
    Cookies.remove('JSESSIONID', { path: '' });
};
