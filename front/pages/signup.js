import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);

    // custom hook
    const useInput = (initValue=null) => {
        const [value, setter] = useState(initValue);
        const handler = useCallback((e) => {
            setter(e.target.value);
        }, []);
        return [value, handler];
    };

    const [id, onChageId] = useInput('');
    const [nick, onChageNick] = useInput('');
    const [password, onChagePassword] = useInput('');

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        if(!term){
            return setTermError(true);
        }
    }, [password, passwordCheck, term]);

    const onChagePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked);
    }, []);

    return (
        <Form onSubmit={onSubmit}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <Input name="user-id" required value={id} onChange={onChageId} />
            </div>
            <div>
                <label htmlFor="user-nick">닉네임</label>
                <Input name="user-nick" required value={nick} onChange={onChageNick} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <Input name="user-password" type="password" required value={password} onChange={onChagePassword} />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호 체크</label>
                <Input name="user-password-check" type="password" required value={passwordCheck} onChange={onChagePasswordCheck} />
                { passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div> }
            </div>
            <div>
                <Checkbox name="user-term" value={term} onChange={onChangeTerm}>약관 동의</Checkbox>   
                { termError && <div style={{ color: 'red' }}>약관에 동의해 주시기 바랍니다.</div> } 
            </div>
            <div>
                <Button type="primary" htmlType="submit">가입</Button>
            </div>
        </Form>
    );
};

export default Signup;