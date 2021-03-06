import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Typography, Input, Button, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import axios from "axios";
import {withRouter} from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;

const onAccessOptions = [
    {value:0, label:"PRIVATE"},
    {value:1, label:"PUBLIC"}
]

const onCategoryOptions = [
    {value:0, label:"Film & Animation"},
    {value:1, label:"Autos & Vehicle"},
    {value:2, label:"Music"}
]

function VideoUploadPage(props) {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [access, setAccess] = useState(0);
    const [category, setCategory] = useState(0);
    const [thumbnailPath, setThumbnailPath] = useState("");
    const [duration, setDuration] = useState("");
    const [filepath, setFilepath] = useState("");

    const onTitleHandler = (e) => {
        setTitle(e.currentTarget.value);
    }

    const onDescriptionHandler = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onAccessHandler = (e) => {
        setAccess(e.currentTarget.value);
    }

    const onCategoryHandler = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData;
        formData.append("file", files[0]);

        axios.post("/api/video/server/upload",
            formData,
            {headers:{'content-type':'multipart/form-data; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    setFilepath(response.data.filepath)
                    let thumbnailData = {
                        filepath:response.data.filepath,
                        filename:response.data.filename
                    }

                    axios.post("/api/video/thumbnail",
                        JSON.stringify(thumbnailData),
                        {headers:{'content-type':'application/json; charset=UTF-8'}})
                        .then(response=>{
                            if(response.data.success) {
                                setFilepath(response.data.videoPath)
                                setThumbnailPath(response.data.filepath)
                                setDuration(response.data.duration)
                            } else {
                                alert('????????? ?????? ??????');
                            }
                        })
                } else {
                    alert('????????? ????????? ???????????? ?????????????????????.');
                }
            })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(duration)
        let data = {
            title : title,
            duration : duration,
            description : description,
            access : access,
            category : category,
            filepath : filepath,
            thumbnailPath : thumbnailPath
        }

        axios.post('/api/video/upload',
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    message.success('????????? ???????????? ??????????????????.')
                    setTimeout(()=>{
                        props.history.push('/');
                    },2500);
                } else {
                    alert('????????? ????????? ??????');
                }
            })
    }
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center'}}>
                <Title>Video Upload</Title>
            </div>

            <Form onSubmit={onSubmitHandler}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
                        {({ getRootProps, getInputProps})=>(
                            <div style={{width:'300px', height:'240px', border:'1px solid lightgray',
                            justifyContent:'center', alignItems:'center', display:'flex'}} {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <PlusOutlined style={{fontSize:'3rem'}}></PlusOutlined>
                            </div>
                        )}
                    </Dropzone>

                    {thumbnailPath &&
                    <img src={`http://localhost:8080/${thumbnailPath}`} style={{width:'300px', height:'240px'}} alt=""/>
                    }
                </div>
                <br/>
                <label>Title</label>
                <Input value={title} onChange={onTitleHandler}></Input>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea value={description} onChange={onDescriptionHandler}></TextArea>
                <br/>
                <br/>
                <select onChange={onAccessHandler}>
                    {onAccessOptions.map((item, index)=>(
                        <option value={item.value} key={index}>{item.label}</option>
                        ))}
                </select>
                <br/>
                <br/>
                <select onChange={onCategoryHandler}>
                    {onCategoryOptions.map((item, index)=>(
                        <option value={item.value} key={index}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button onClick={onSubmitHandler}>Submit</Button>
            </Form>
        </div>
    );
}

export default withRouter(VideoUploadPage);