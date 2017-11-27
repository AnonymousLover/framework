import Inferno from 'inferno'
import { Router } from 'inferno-router'
import createHistory from 'history/createHashHistory'

import routes from './config/routes'

const history = createHistory();

Inferno.render(
  <Router history={history} children={routes}/>,
  document.getElementById('app')
);
