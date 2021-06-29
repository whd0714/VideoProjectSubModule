import React, { useEffect, useState } from 'react';
import SingleComment from "./SingleComment";

function ReplyComment(props) {

    const [childCommentNumber, setChildCommentNumber] = useState(0);
    const [openReplyComments, setOpenReplyComments] = useState(false);

    useEffect(()=>{
        let commentNumber = 0;

        props.commentList.map((comment)=>{
            if(comment.parentId === props.parentCommentId) {
                commentNumber++;
            }
        })

        setChildCommentNumber(commentNumber);
    },[props.commentList])

    const renderReplyComment = (parentCommentId) =>
        props.commentList.map((comment, index)=>(
            <React.Fragment>
                {
                    comment.parentId === parentCommentId &&
                        <div style={{width:'80%', marginLeft:'40px'}}>
                            <SingleComment refreshFunction={props.refreshFunction} comment={comment} videoId={props.videoId} />
                            <ReplyComment parentCommentId={comment.commentId} videoId={props.videoId} commentList={props.commentList} />
                        </div>
                }
            </React.Fragment>
        ))

    const onHandleChange = () => {
        setOpenReplyComments(!openReplyComments);
    }

    return (
        <div>
            { childCommentNumber > 0 &&
            <p style={{fontSize:'14px', margin:0, color:'gray', cursor:'pointer'}} onClick={onHandleChange}>
                답글 {childCommentNumber} 개 보기
            </p>
            }

            {openReplyComments &&
                renderReplyComment(props.parentCommentId)
            }


        </div>
    );
}

export default ReplyComment;