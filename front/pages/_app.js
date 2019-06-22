import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from '../reducers';

const JsnBird = ({ Component, store }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>JsnBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout> {/* props로 하위 jsx를 전달 */}
                <Component />
            </AppLayout>                
        </Provider>
    );
};

JsnBird.propTypes = {
    Component: PropTypes.elementType,
    store: PropTypes.object,
}

export default withRedux((initialState, options) => {
    const middlewares = [];
    const enhancer = compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    );
    const store = createStore(reducer, initialState, enhancer);
    // store 커스터마이징
    return store;
})(JsnBird);