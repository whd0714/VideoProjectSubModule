import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Input, Typography, Row, Col, Card, Avatar} from 'antd';
import axios from "axios";
import moment from 'moment';

const {Title} = Typography;
const {Meta} =Card;
function SubscriptionPage(props) {

    const [videos, setVideos] = useState([]);
    const [isSubscribe, setIsSubscribe] = useState("");

    useEffect(()=>{

        const subscriptionData = {
            memberId : localStorage.getItem('userId')
        }

        axios.post('/api/subscription/videos',
            JSON.stringify(subscriptionData),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    console.log(response)
                    setIsSubscribe(response.data.isSubscription)
                    setVideos(response.data.result2)

                } else {
                    alert('비디오가져오기 실패');
                }
            })
    },[])

        const renderCard = videos.map((video, index)=>{

            let minute = Math.floor(video.duration / 60);
            let second = Math.floor(video.duration - minute * 60);

            return <Col key={index} lg={6} md={8} xs={24}>
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
                <span style={{marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.uploadDate).format("MMM Do YY")}</span>
            </Col>
        })


    if(renderCard!=null) {
        return (
            <div style={{width: '85%', margin: '3rem auto'}}>
                <Title level={2}>Subscription</Title>
                <hr/>
                <Row gutter={[32, 16]} key="videos">
                    {renderCard}
                </Row>
            </div>
        );
    } else {
        return (
            <div style={{width: '85%', margin: '3rem auto'}}>
                <Title level={2}>Subscription</Title>
                <hr/>
                <Row gutter={[32, 16]} key="videos">
                    <div>
                        아직 구독한 채널이 없습니다.
                    </div>
                </Row>
            </div>
        );
    }
}

export default withRouter(SubscriptionPage);