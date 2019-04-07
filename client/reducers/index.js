import { combineReducers } from 'redux';
import home from './home';
import colorPalette from './colorPalette';
import company from './company';

export default combineReducers({
  home,
  colorPalette,
  company,
});
