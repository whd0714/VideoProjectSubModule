import React, {useEffect,useState} from 'react';
import { Col, Row, List, Avatar} from 'antd';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "../comment/Comment";

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId

    const data = {
        videoId : videoId
    }

    const [views, setViews] = useState("");
    const [videoDetail, setVideoDetail] = useState([]);
    const [commentValue, setCommentValue] = useState([]);

    useEffect(()=>{
        axios.post("/api/video/getVideo",
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    setVideoDetail(response.data.result2)
                    console.log(response)
                }else {
                    //alert('비디오 로딩 실패')
                }
            })

        axios.post("/api/comment/getComment",
            JSON.stringify(data),
            {headers: {'content-type':'application/json; charset=UTF-8' +
                        ''}})
            .then(response=>{
                if(response.data.success) {
                    if(response.data.result == null) {
                        console.log("널임")
                    } else {
                        setCommentValue(response.data.result);

                    }
                }else {
                    alert('댓글을 가져오는데 실패 헀습니다.');
                }
            })
    },[])

    const refreshFunction = (newComment) => {
        console.log("$$$$$$$$$$$$$$$")
        setCommentValue(commentValue.concat(newComment))
    }

   if(videoDetail.creatorId != undefined) {

       const subscribeButton = videoDetail.creatorId !== localStorage.getItem('userId') && <Subscribe creator={videoDetail.creatorId} subscriber={localStorage.getItem('userId')}/>
       return (
           <Row gutter={[16,16]}>
               <Col lg={18} xs={24}>
                   <div style={{width:'100%', padding:'3rem 4rem'}}>

                       <video style={{width:'100%'}} src={`http://localhost:8080/${videoDetail.filepath}`} controls/>
                       <List.Item
                           actions={[subscribeButton]}
                       >
                           <List.Item.Meta
                               avatar={<Avatar/>}
                               title={videoDetail.title}
                               description={videoDetail.description}
                           />
                       </List.Item>
                       <Comment refreshFunction={refreshFunction} commentList={commentValue} videoId = {videoId}/>
                   </div>
               </Col>

               <Col lg={6} xs={24}>
                   <SideVideo videoId={videoId}/>
               </Col>
           </Row>
       );
   } else{
       return (
           <div>Loading....</div>
       );
   }
}

export default withRouter(VideoDetailPage);