import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {Input, Typography, Row, Col, Card, Avatar, Menu} from 'antd';
import axios from "axios";
import moment from 'moment';
import { Layout } from 'antd';
import Sider from "antd/lib/layout/Sider";
import {HistoryOutlined, HomeFilled, VideoCameraFilled} from "@ant-design/icons";
import './LandingPage.css';
const {Content, Header} = Layout;
const {Title} = Typography;
const {Meta} =Card;
function LandingPage(props) {

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    }


    const [videos, setVideos] = useState([]);

    useEffect(()=>{
        axios.get('/api/videos')
            .then(response=>{
                if(response.data.success) {
                    setVideos(response.data.result)
                } else {
                    alert('비디오가져오기 실패');
                }
            })
    },[])

    const renderCard = videos.map((video, index)=>{

        let minute = Math.floor(video.duration / 60);
        let second = Math.floor(video.duration - minute * 60);

        return <Content style={{display:'flex', justifyContent:'space-between'}}>

           {/* <Col key={index} lg={8} md={16}  xs={24}>*/}
            <Col key={index}>
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
        </Content>
    })

    return (
        <div className="landing-box" /*style={{width:'85%', margin:'3rem auto'}}*/>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<HomeFilled /> }>
                            <a href="/">
                                홈
                            </a>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraFilled />}>
                            구독
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HistoryOutlined />}>
                            시청기록
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Title level={2}>Recommend</Title>
                        <hr/>
                        <Row gutter={[32,16]} key="videos">

                            {renderCard}
                        </Row>
                    </Content>
                </Layout>
            </Layout>

        </div>
    );
}

export default withRouter(LandingPage);