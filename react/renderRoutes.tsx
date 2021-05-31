import { Route, Redirect, RedirectProps, RouteProps } from 'react-router-dom';

import uniqueId from 'lodash/uniqueId';

export interface RouteObject extends RouteProps {
  redirect?: RedirectProps;
}

export default (routes: RouteObject[]) => (
  routes.map((route: RouteObject) => {
    const { redirect, ...restParams } = route;
    if (redirect) {
      return <Redirect {...redirect} />;
    }
    return <Route key={uniqueId()} {...restParams} />;
  })
);