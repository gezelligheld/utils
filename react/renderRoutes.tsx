import { Route, Redirect, RedirectProps, RouteProps } from 'react-router-dom';

export interface RouteObject extends RouteProps {
    redirect?: RedirectProps;
}

export default (routes: RouteObject[]) => (
    routes.map((route: RouteObject) => {
        const { redirect, ...restParams } = route;
        if (redirect) {
            return <Redirect key={redirect.to} {...redirect} />;
        }
        return <Route key={restParams.path as string} {...restParams} />;
    })
);