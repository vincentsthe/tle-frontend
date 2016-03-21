import { SET_USER_NAME } from '../actions/headerAction';

const defaultState = {
  userName: '',
};


const header = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    default:
      return state;
  }
};

export default header;
