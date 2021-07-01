import React, {useEffect} from 'react';
import { Tooltip,  } from "antd";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled} from '@ant-design/icons';
import axios from "axios";

function LikeDisLikes(props) {

    let data = { }

    if(props.video) {
        data = {
            commentId : null,
            videoId : props.videoId,
            memberId : props.memberId,
        }
    } else {
        /*data = {
            videoId : null ,
            commentId : ,
            memberId : props.memberId,
        }*/
    }



    useEffect(() => {
        axios.post("/api/like/getLike",
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response => {
                if(response.data.success) {

                } else {
                    alert("좋아요 정보를 가져오는데 실패")
                }
            })
    }, [])


    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="like">
                    <LikeOutlined
                        onClick
                    />
                </Tooltip>
            </span>
            <span style={{paddingLeft:'8px', cursor:'auto'}}>1</span>

            <span key="comment-basic-dislike">
                <Tooltip title="dislike">
                    <LikeOutlined
                        onClick
                    />
                </Tooltip>
            </span>
            <span style={{paddingLeft:'8px', cursor:'auto'}}>1</span>
        </div>
    );
}

export default LikeDisLikes;