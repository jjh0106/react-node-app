import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

const JsnBird = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>JsnBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout> {/* props로 하위 jsx를 전달 */}
                <Component {...pageProps} />
            </AppLayout>                
        </Provider>
    );
};

JsnBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
};

JsnBird.getInitialProps = async (context) => {
    // console.log(context);
    const { ctx, Component } = context;
    let pageProps = {};

    if( Component.getInitialProps ){
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production' 
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        ); 
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(JsnBird);