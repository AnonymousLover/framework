import Inferno from 'inferno'
import { Router } from 'inferno-router'
import createHistory from 'history/createHashHistory'

import routes from './config/router-all'

const history = createHistory();

import './styles/index.less'

Inferno.render(
  <Router history={history} children={routes}/>,
  document.getElementById('app')
);
