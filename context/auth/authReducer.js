const reducer = (state, action) => {
    console.log('Auth reducer called with action:', action.type, action.payload);
    console.log('Current state:', state);
    
    switch (action.type) {
        case 'SIGN_IN':
            console.log('SIGN_IN case, new state:', { ...state, userToken: action.payload.token });
            return {
                ...state,
                userToken: action.payload.token,
            };

        case 'SET_USER':
            console.log('SET_USER case, new state:', { ...state, user: action.payload, isLoggedIn: true });
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            };

        case 'IS_LOGGED_IN':
            console.log('IS_LOGGED_IN case, new state:', { ...state, userToken: action.payload.token, isLoggedIn: action.payload.isLoggedIn });
            return {
                ...state,
                userToken: action.payload.token,
                isLoggedIn: action.payload.isLoggedIn,
            };

        case 'SIGN_OUT':
            console.log('SIGN_OUT case, new state:', { ...state, data: null, isLoggedIn: false, user: {} });
            return {
                ...state,
                data: null,
                isLoggedIn: false,
                user: {},
            };
        case 'DYNAMIC_UPDATE':
            console.log('DYNAMIC_UPDATE case, new state:', { ...state, [action.payload.type]: action.payload.value });
            return {
                ...state,
                [action.payload.type]: action.payload.value,
            };

        default:
            console.log('Default case, returning current state');
            return state;
    }
};

export default reducer;
