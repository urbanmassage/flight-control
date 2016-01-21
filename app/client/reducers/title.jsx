import {SET_TITLE} from '../actions/title';

export default function title(state = 'Flight Control', action) {
  switch (action.type) {
    case SET_TITLE:
      return action.value;
    default:
      return state;
  }
}
