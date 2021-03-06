import { Record } from 'immutable';

import {
  GET_LISTS,
  GET_LISTS_START,
  MOVE_CARD,
  MOVE_LIST,
  TOGGLE_DRAGGING
} from './actions';
import { LISTS } from './fixtures';

/* eslint-disable new-cap */
const InitialState = Record({
  isFetching: false,
  isDragging: false,
  lists: LISTS,
});
/* eslint-enable new-cap */
const initialState = new InitialState;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LISTS_START:
      return state.set('isFetching', true);

    case GET_LISTS:
      return state.withMutations((ctx) => {
        ctx.set('isFetching', false)
            .set('lists', action.lists);
      });

    case MOVE_CARD: {
      const newLists = [...state.lists];
      const { lastX, lastY, nextX, nextY } = action;
      if (lastX === nextX) {
        newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
      } else {
        // move element to new place
        newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        // delete element from old place
        newLists[lastX].cards.splice(lastY, 1);
      }
      return state.withMutations((ctx) => {
        ctx.set('lists', newLists);
      });
    }

    case TOGGLE_DRAGGING: {
      return state.set('isDragging', action.isDragging);
    }

    default:
      return state;
  }
}
