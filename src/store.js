import * as redux from 'redux';

//initialValues
export const initialValues = {
    token: '',
    firstName: '',
    lastName: '',
    login: false
}


//Action
export const LOGIN = 'login';
export const CHECKLOGIN = 'check login';
export const LOGOUT = 'logout';
export const SAVETOKEN = 'saveToken';


//reducers
export const userReducer = (state = initialValues, action) => {
    switch (action.type) {
        case 'login': {
            localStorage.setItem('Token', action.token)
            return { ...state, token: action.token, firstName: action.firstName, lastName: action.lastName, login: true }
        }

        case CHECKLOGIN: {
            if (!state.token || !localStorage.getItem('Token')) {
                return { ...state, login: false }
            } break;
        }

        case LOGOUT: {
            localStorage.removeItem('Token')
            state = { ...state, token: '', firstName: '', lastName: '', login: false }
            return true;
        }

        case SAVETOKEN: {
            console.log(action.token)
            localStorage.setItem('Token', action.token)
            return { ...state, token: action.token }

        }

        default: {
            return state;
        }
    }
}


//store

export const store = redux.createStore(userReducer)