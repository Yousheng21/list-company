import React, {FunctionComponent} from 'react';
import {LayoutProps} from "./Layout.props";
import "./Layout.css";

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="wrapper">
            {children}
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    };
};
