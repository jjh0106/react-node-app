import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';

const JsnBird = ({ Component }) => {
    return (
        <>
            <Head>
                <title>JsnBird</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.css" />
            </Head>
            <AppLayout> {/* props로 하위 jsx를 전달 */}
                <Component />
            </AppLayout>                
        </>
    );
};

JsnBird.propTypes = {
    Component: PropTypes.elementType,
}

export default JsnBird;