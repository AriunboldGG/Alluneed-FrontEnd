import Cookies from 'js-cookie';

export const setcookie = (value) => {
  // Ensure the token is stored as a clean string
  let tokenValue;
  
  if (typeof value === 'string') {
    // If it's already a string, use it directly
    tokenValue = value;
  } else if (typeof value === 'object') {
    // If it's an object, stringify it
    tokenValue = JSON.stringify(value);
  } else {
    // For any other type, convert to string
    tokenValue = String(value);
  }
  
  // Remove any surrounding quotes if they exist
  if (tokenValue.startsWith('"') && tokenValue.endsWith('"')) {
    tokenValue = tokenValue.slice(1, -1);
  }
  
  console.log('Storing token:', tokenValue);
  Cookies.set('token', tokenValue, { expires: 1 });
};

export const getcookie = () => {
  const token = Cookies.get('token');
  console.log('Retrieved token:', token);
  return token;
};

export const removeCookie = () => {
  Cookies.remove('token', { path: '' });
};
