import React, {useState} from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';
import SingleComment from "../VideoDetailPage/Sections/SingleComment";
import ReplyComment from "../VideoDetailPage/Sections/ReplyComment";

function Comment(props) {
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("");

    const videoId = props.videoId;

    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            comment : commentValue,
            videoId : videoId,
            memberId : user.auth.data.memberId
        }

        axios.post("/api/comment/new/root",
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                }else {
                    alert()
                }
            })
    }

    return (
        <div>
            <br />
            <p> Replies </p>
            <hr/>

            <form style={{ display:'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width:'100%', borderRadius:'5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br/>
                <button style={{ width:'20%', height: '52px'}} onClick={onSubmit}>Submit</button>
            </form>

            {props.commentList && props.commentList.map((value, index)=>(
                (value.parentId === null &&
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={value} videoId={videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={value.commentId} videoId={videoId} commentList={props.commentList} />
                    </React.Fragment>
                )
            ))}
        </div>
    );
}

export default Comment;
