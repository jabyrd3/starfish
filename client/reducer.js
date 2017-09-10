import {createReducer} from 'redux-act';
import * as actions from './actions';

const defaults = {};

export default createReducer({
  [actions.bump]: (state, type) =>
    Object.assign(state, {}, {filterAlerts: type})
}, defaults);
