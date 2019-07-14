import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

const PostForm = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
    const imageInput = useRef();

    useEffect(() => {
        setText('');
    }, [postAdded === true])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if(!text || !text.trim()){
            return alert('게시글을 작성해주세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('image', i);
        })
        formData.append('content', text);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [])

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onChangeImage = useCallback((e) => {
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        })
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    }, []);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            index,
        })
    }, []);

    return (
        <Form encType="multipart/form-data" onSubmit={onSubmitForm}>
            <Input.TextArea maxLength={140} placeholder="일상을 적어주세요." value={text} onChange={onChangeText} />
            <div>
                <input type="file" multiple hidden ref={imageInput} onChange={onChangeImage} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" htmlType="submit" loading={isAddingPost}>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v, i) => {
                    // <Thumbnail path={v} />
                    return (
                        <div key={v} style={{ display: 'inline-block' }}>
                            <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                            <div>
                                <Button onClick={onRemoveImage(i)}>제거</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Form>
    );
};

// const Thumbnail = ({ path }) => {
//     return (
//         <div key={path} style={{ display: 'inline-block' }}>
//             <img src={`http://localhost:3000/${path}`} style={{ width: '200px' }} alt={path} />
//             <div>
//                 <Button>제거</Button>
//             </div>
//         </div>
//     );
// };

export default PostForm;