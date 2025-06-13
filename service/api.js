import { useReducer, useMemo, useEffect } from 'react';
import AuthReducer from '@/context/auth/authReducer';
import axios from 'axios';
import { setcookie, getcookie, removeCookie } from '@/service/utils';
import { BASE_URL } from './path';

export const Api = () => {
    const initialState = {
        userToken: null,
        isLoggedIn: false,
        user: null,
    };

    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 30000,
    });

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const tk = getcookie('token');
        if (tk) {
            handlers.getUserData();
            dispatch({ type: 'IS_LOGGED_IN', payload: { isLoggedIn: true } });
        }
    }, [state.userToken]);

    const handlers = useMemo(
        () => ({
            //хэрэглэгчийн нэвтрэх
            signIn: async (data) => {
                let payload = {
                    token: data,
                    isLoggedIn: true,
                };
                dispatch({ type: 'IS_LOGGED_IN', payload });
                setcookie(data);
            },

            //хэрэглэгч гарах
            logOut: () => {
                removeCookie();
                dispatch({ type: 'SIGN_OUT' });
            },

            stateDynamicUpdate: (obj) => {
                dispatch({ type: 'DYNAMIC_UPDATE', payload: obj });
            },

            getUserData: () => {
                let data = getcookie('token');
                if (typeof data === 'string') {
                    let dataParsed = JSON.parse(data);
                    axios
                        .get(
                            `${BASE_URL}/users/me`,

                            {
                                headers: {
                                    Authorization: `Bearer ${dataParsed}`,
                                },
                            }
                        )
                        .then((res) => {
                            if (res?.status === 200 && res?.data?.response_code === 200) {
                                dispatch({ type: 'SET_USER', payload: res?.data?.data });
                            } else {
                                removeCookie();
                            }
                        })
                        .catch((err) => {
                            removeCookie();
                            return;
                        });
                } else {
                    removeCookie();
                }
            },

            GET: async (url, isToken = false, contentType = 'application/json', responseType = 'json') => {
                try {
                    let tk = getcookie('token');
                    let dataParsed = JSON.parse(tk);
                    return instance.get(
                        url,
                        isToken
                            ? {
                                  headers: {
                                      Authorization: `Bearer ${dataParsed}`,
                                      'Content-Type': contentType,
                                  },
                                  responseType,
                              }
                            : ''
                    );
                } catch (e) {
                    if (e?.response?.status === 401) {
                        handlers.logOut();
                        toastExpireAccess();
                    }
                    return e;
                }
            },

            POST: async (url, isToken = false, data, contentType = 'application/json', responseType = 'json') => {
                try {
                    let tk = getcookie('token');
                    let dataParsed = JSON.parse(tk);
                    let response = await instance.post(
                        url,
                        data,
                        isToken
                            ? {
                                  headers: {
                                      Authorization: `Bearer ${dataParsed}`,
                                      'Content-Type': contentType,
                                  },
                                  responseType,
                              }
                            : ''
                    );
                    if (response?.status === 200 && response?.data) {
                        return response.data;
                    }
                } catch (e) {
                    if (e?.response?.status === 401) {
                        handlers.logOut();
                        toastExpireAccess();
                    }
                    const error = new Error();
                    error.status = e?.response?.status;
                    throw error;
                }
            },

            PUT: async (url, isToken = false, data) => {
                try {
                    let response = await instance.put(
                        url,
                        data,
                        isToken
                            ? {
                                  headers: {
                                      Authorization: `Bearer ${state.userToken}`,
                                  },
                              }
                            : ''
                    );
                    if (response?.status === 200 && response?.data) {
                        return response.data;
                    }
                } catch (e) {
                    if (e?.response?.status === 401) {
                        handlers.logOut();
                        toastExpireAccess();
                    }
                    const error = new Error();
                    error.status = e?.response?.status;
                    throw error;
                }
            },

            DELETE: async (url, isToken = false, responseType = 'json') => {
                try {
                    let response = await instance.delete(
                        url,
                        isToken
                            ? {
                                  headers: {
                                      Authorization: `Bearer ${state.userToken}`,
                                  },
                                  responseType,
                              }
                            : ''
                    );
                    if (response?.status === 200 && response?.data) {
                        return response.data;
                    }
                } catch (e) {
                    if (e?.response?.status === 401) {
                        handlers.logOut();
                        toastExpireAccess();
                    }
                    const error = new Error();
                    error.status = e?.response?.status;
                    throw error;
                }
            },
        }),
        [state]
    );
    return { authFunc: handlers, authState: state, authDispatch: dispatch };
};
