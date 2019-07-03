import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(logoutRequestAction);    
    }, []);

    return (
        <Card
            actions={[
                <div key="twit">트윗 <br/> {me.Posts.length}</div>,
                <div key="followings">팔로잉 <br/> {me.Followings.length}</div>,
                <div key="followers">팔로워 <br/> {me.Followers.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>} 
                title={me.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    );
};

export default UserProfile;