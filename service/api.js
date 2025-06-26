import { useReducer, useMemo, useEffect } from 'react';
import AuthReducer from '@/context/auth/authReducer';
import axios from 'axios';
import { setcookie, getcookie, removeCookie } from '@/service/utils';
import { BASE_URL } from './path';
import { toast } from 'react-toastify';
import { mockAuth, mockAPI } from './mockAuth';
import { USE_MOCK_BACKEND } from '@/config/auth';

// Function to show expired access toast
const toastExpireAccess = () => {
    toast('Таны нэвтрэх хугацаа дууслаа. Дахин нэвтэрнэ үү.', {
        position: 'top-right',
        autoClose: 3000,
        type: 'warning',
    });
};

// Function to clean and validate token
const cleanToken = (token) => {
    if (!token) return null;
    
    // Remove any whitespace
    let cleanedToken = token.trim();
    
    // Remove surrounding quotes if they exist
    if (cleanedToken.startsWith('"') && cleanedToken.endsWith('"')) {
        cleanedToken = cleanedToken.slice(1, -1);
    }
    
    // Remove any newlines or extra spaces
    cleanedToken = cleanedToken.replace(/\s+/g, '');
    
    console.log('Cleaned token:', cleanedToken);
    console.log('Cleaned token length:', cleanedToken.length);
    
    return cleanedToken;
};

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

    const handlers = useMemo(
        () => ({
            //хэрэглэгчийн нэвтрэх
            signIn: async (data) => {
                console.log('Signing in with token:', data);
                let payload = {
                    token: data,
                    isLoggedIn: true,
                };
                console.log('Dispatching IS_LOGGED_IN with payload:', payload);
                dispatch({ type: 'IS_LOGGED_IN', payload });
                setcookie(data);
                console.log('Token stored in cookie');
                // Immediately fetch and set user data
                console.log('Fetching user data...');
                await handlers.getUserData();
                console.log('User data fetched, current state:', state);
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
                console.log('getUserData called, token from cookie:', data);
                if (data) {
                    data = cleanToken(data);
                    console.log('Cleaned token:', data);
                    
                    if (USE_MOCK_BACKEND) {
                        // Use mock authentication
                        console.log('Using mock backend for getUserData');
                        mockAuth.getUserData(data)
                            .then((res) => {
                                console.log('Mock getUserData response:', res);
                                if (res?.response_code === 200) {
                                    console.log('Dispatching SET_USER with payload:', res?.data);
                                    dispatch({ type: 'SET_USER', payload: res?.data });
                                    console.log('SET_USER dispatched');
                                } else {
                                    console.log('Mock getUserData failed, removing cookie');
                                    removeCookie();
                                }
                            })
                            .catch((err) => {
                                console.error('Mock getUserData error:', err);
                                removeCookie();
                            });
                    } else {
                        // Use real backend
                        console.log('Using real backend for getUserData');
                        axios
                            .get(
                                `${BASE_URL}/users/me`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${data}`,
                                    },
                                }
                            )
                            .then((res) => {
                                console.log('Real getUserData response:', res);
                                if (res?.status === 200 && res?.data?.response_code === 200) {
                                    console.log('Dispatching SET_USER with payload:', res?.data?.data);
                                    dispatch({ type: 'SET_USER', payload: res?.data?.data });
                                    console.log('SET_USER dispatched');
                                } else {
                                    console.log('Real getUserData failed, removing cookie');
                                    removeCookie();
                                }
                            })
                            .catch((err) => {
                                console.log('Real getUserData error, removing cookie:', err);
                                removeCookie();
                                return;
                            });
                    }
                } else {
                    console.log('No token found in cookie');
                    removeCookie();
                }
            },

            GET: async (url, isToken = false, contentType = 'application/json', responseType = 'json') => {
                try {
                    if (USE_MOCK_BACKEND) {
                        // Use mock API
                        return await mockAPI.get(url);
                    } else {
                        // Use real backend
                        let tk = getcookie('token');
                        
                        if (isToken && !tk) {
                            throw new Error('No token found');
                        }
                        
                        if (isToken) {
                            tk = cleanToken(tk);
                        }
                        
                        return instance.get(
                            url,
                            isToken
                                ? {
                                      headers: {
                                          Authorization: `Bearer ${tk}`,
                                          'Content-Type': contentType,
                                      },
                                      responseType,
                                  }
                                : ''
                        );
                    }
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
                    if (USE_MOCK_BACKEND) {
                        // Use mock API
                        const response = await mockAPI.post(url, data);
                        return response;
                    } else {
                        // Use real backend
                        let tk = getcookie('token');
                        
                        if (isToken && !tk) {
                            console.error('No token found for authenticated request:', url);
                            throw new Error('No token found');
                        }
                        
                        console.log('Making POST request to:', url, 'with token:', isToken ? 'Yes' : 'No');
                        if (isToken) {
                            console.log('Original token:', tk);
                            tk = cleanToken(tk);
                            console.log('Token being sent:', tk);
                            console.log('Token type:', typeof tk);
                            console.log('Token length:', tk ? tk.length : 0);
                        }
                        
                        let response = await instance.post(
                            url,
                            data,
                            isToken
                                ? {
                                      // Try without Bearer prefix first, if that fails, try with Bearer
                                      headers: {
                                          Authorization: tk,
                                          'Content-Type': contentType,
                                      },
                                      responseType,
                                  }
                                : ''
                        );
                        if (response?.status === 200 && response?.data) {
                            return response.data;
                        }
                    }
                } catch (e) {
                    console.error('POST request failed:', url, e);
                    
                    if (!USE_MOCK_BACKEND && isToken && e?.response?.status === 401) {
                        // If the first attempt failed, try with Bearer prefix
                        try {
                            let tk = cleanToken(getcookie('token'));
                            console.log('Retrying with Bearer prefix');
                            let response = await instance.post(
                                url,
                                data,
                                {
                                    headers: {
                                        Authorization: `Bearer ${tk}`,
                                        'Content-Type': contentType,
                                    },
                                    responseType,
                                }
                            );
                            if (response?.status === 200 && response?.data) {
                                return response.data;
                            }
                        } catch (retryError) {
                            console.error('Retry also failed:', retryError);
                            handlers.logOut();
                            toastExpireAccess();
                        }
                    }
                    
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
                    if (USE_MOCK_BACKEND) {
                        // Mock PUT - return success
                        return { response_code: 200, data: 'Updated successfully' };
                    } else {
                        // Use real backend
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
                    if (USE_MOCK_BACKEND) {
                        // Mock DELETE - return success
                        return { response_code: 200, data: 'Deleted successfully' };
                    } else {
                        // Use real backend
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

    useEffect(() => {
        const tk = getcookie('token');
        if (tk) {
            handlers.getUserData();
            dispatch({ type: 'IS_LOGGED_IN', payload: { token: tk, isLoggedIn: true } });
        }
    }, []);

    return { authFunc: handlers, authState: state, authDispatch: dispatch };
};
