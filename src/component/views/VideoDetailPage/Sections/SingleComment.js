import React, { useState } from 'react';
import {Input, Button, Comment, Avatar} from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);

    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const openReplyClick = () => {
        setOpenReply(!openReply)
    }

    const handleCommentValue = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();



        const data = {
            content : commentValue,
            memberId : user.auth.data.memberId,
            videoId : props.videoId,
            commentId : props.comment.commentId
        }

        console.log(data)

        axios.post("/api/comment/replay",
            JSON.stringify(data),
            {headers: {'content-type': 'application/json; charset=UTF-8'}})
            .then(response => {
                if(response.data.success) {
                    console.log("대댓글" + response.data);
                    setCommentValue("")
                    setOpenReply(false)
                    props.refreshFunction(response.data.result)

                } else {
                    alert('대대글 등록 실패');
                }
            })
    }

    const actions = [
        <span onClick={openReplyClick} className="nested-comment-reply-to">Reply to</span>
    ]

    return (

        <div>
            <Comment
                actions={actions}
                author = {props.comment.memberName}
                avatar={<Avatar/>}
                content={<p>{props.comment.content}</p>}
            >

            </Comment>

            {openReply  &&
            <form style={{ display:'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width:'100%', borderRadius:'5px' }}
                    onChange={handleCommentValue}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br/>
                <button style={{ width:'20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>
            }
        </div>

    );
}

export default SingleComment;