import { SET_CURRENT_USER, USER_LOADING, GOOGLE_OAUTH2 } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case GOOGLE_OAUTH2: {
        return {...state, googleResponse : action.googleResponse}
      }
      default:
        return state;
    }
  }

  