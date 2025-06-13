const reducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                userToken: action.payload.token,
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            };

        case 'IS_LOGGED_IN':
            return {
                ...state,
                userToken: action.payload.token,
                isLoggedIn: action.payload.isLoggedIn,
            };

        case 'SIGN_OUT':
            return {
                ...state,
                data: null,
                isLoggedIn: false,
                user: {},
            };
        case 'DYNAMIC_UPDATE':
            return {
                ...state,
                [action.payload.type]: action.payload.value,
            };

        default:
            return state;
    }
};

export default reducer;
