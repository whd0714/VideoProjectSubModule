import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Input, Typography, Row, Col, Card} from 'antd';
import axios from "axios";


const {Title} = Typography;
const {Meta} =Card;
function LandingPage(props) {

    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        axios.get('/api/videos')
            .then(response=>{
                if(response.data.success) {
                    console.log(response)
                    setVideos(response.data.result)
                } else {
                    alert('비디오가져오기 실패');
                }
            })
    },[])

    const renderCard = videos.map((video, index)=>{

        let minute = Math.floor(video.duration / 60);
        let second = Math.floor(video.duration - minute * 60);

        return <Col lg={6} md={8} xs={24}>
            <a href={`/video/${video.id}`}>
                <div style={{position:'relative'}}>
                    <img style={{width:'300px', height:'240px'}} src={`http://localhost:8080/${video.thumbnailPath}`} alt=""/>
                    <div className="duration">
                        <span>{minute} : {second}</span>
                    </div>
                </div>
            </a>
            <br/>
            <Meta
            title={video.title}
            description = {video.description}
            />
            <div>{video.name}</div>
            <div>{video.description}</div>
            <span style={{marginLeft:'3rem'}}>{video.views}</span> - <span>{video.uploadDate}</span>
        </Col>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}>Recommend</Title>
            <hr/>
            <Row gutter={[32,16]}>
                {renderCard}
            </Row>
        </div>
    );
}

export default withRouter(LandingPage);