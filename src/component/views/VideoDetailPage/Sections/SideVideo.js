import React, {useState, useEffect} from 'react';
import {List} from 'antd';
import axios from "axios";

function SideVideo(props) {

    const [sideVideos, setSideVideos] = useState([]);

    const data = {
        videoId : props.videoId
    }

    useEffect(()=>{
        axios.post("/api/video/sideVideo",
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    setSideVideos(response.data.result2)
                } else {
                    //alert('사이드 영상 조회 실패')
                }
            })
    }, []);

    const renderSide = sideVideos.map((video, index)=>{

        let minute = Math.floor(video.duration / 60);
        let second = Math.floor(video.duration - minute * 60);

        return <div key={index} style={{display:'flex', marginBottom:'1rem', padding:'0 2rem'}}>
            <div style={{width:'120px', height:'96px'}}>
                <a href={`/video/${video.id}`}>
                    <img style={{width:'120px', height:'96px'}} src={`http://localhost:8080/${video.thumbnailPath}`} alt="thumbnail"/>
                </a>
            </div>
            <div style={{width:'50%'}}>
                <span style={{fontSize: '1rem', color:'black'}}>{video.title}</span> <br/>
                <span>{video.description}</span> <br />
                <span>{video.name}</span> <br />
                <span>{minute} : {second}</span>
            </div>

        </div>
    })

    return (
        <React.Fragment>{renderSide}</React.Fragment>
    );
}

export default SideVideo;