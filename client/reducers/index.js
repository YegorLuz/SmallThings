import { combineReducers } from 'redux';
import home from './home';
import colorPalette from './colorPalette';
import company from './company';
import category from './category';
import menu from './menu';
import product from './product';

export default combineReducers({
  home,
  colorPalette,
  company,
  category,
  menu,
  product,
});
