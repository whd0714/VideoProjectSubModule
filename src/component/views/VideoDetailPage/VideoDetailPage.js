import React, {useEffect,useState} from 'react';
import { Col, Row, List, Avatar} from 'antd';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId

    const data = {
        videoId : videoId
    }

    const [videoDetail, setVideoDetail] = useState([]);

    useEffect(()=>{
        axios.post("/api/video/getVideo",
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    setVideoDetail(response.data.data)
                }else {
                    alert('비디오 로딩 실패')
                }
            })
    },[])

   if(videoDetail.memberId != undefined) {
       return (
           <Row gutter={[16,16]}>
               <Col lg={18} xs={24}>
                   <div style={{width:'100%', padding:'3rem 4rem'}}>

                       <video style={{width:'100%'}} src={`http://localhost:8080/${videoDetail.filepath}`} controls/>
                       <List.Item
                           actions={[<Subscribe creator={videoDetail.memberId} subscriber={localStorage.getItem('userId')}/>]}
                       >
                           <List.Item.Meta
                               avatar
                               title={videoDetail.title}
                               description={videoDetail.description}
                           />
                       </List.Item>

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