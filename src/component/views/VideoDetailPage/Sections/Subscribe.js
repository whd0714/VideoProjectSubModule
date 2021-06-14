import React,{useEffect, useState} from 'react';
import axios from "axios";
function Subscribe(props) {

    const [subscribeNumber, setSubscribeNumber] = useState("");
    const [subscribed, setSubscribed] = useState("");

    useEffect(()=>{
        let data = {creatorId:props.creator}

        axios.post('/api/subscribe/subscribeNumber',
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    setSubscribeNumber(response.data.count)
                }else {
                    alert('구독자수 오류')
                }
            })

        let subscribedData = {
            creatorId: props.creator,
            subscriberId: props.subscriber
        }
        console.log("333333" + props.creator)
        axios.post('/api/subscribe/subscribed',
            JSON.stringify(subscribedData),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {
                    console.log(response.data)
                    setSubscribed(response.data.subscribed)
                }else {
                    alert('구독정보 오류')
                }
           })
    },[])

    const onSubscribe = () => {
        let SubscribeData = {
            creatorId:props.creator,
            subscriberId:localStorage.getItem('userId')
        }
        if(subscribed) {
            axios.post('/api/subscribe/unSubscribe',
                JSON.stringify(SubscribeData),
                {headers:{'content-type':'application/json; charset=UTF-8'}})
                .then(response=>{
                    if(response.data.success) {
                        setSubscribeNumber(subscribeNumber - 1)
                        setSubscribed(!subscribed)
                    } else {
                        alert('구독취소 오류')
                    }
                })
        } else {
            axios.post('/api/subscribe/subscribe',
                JSON.stringify(SubscribeData),
                {headers:{'content-type':'application/json; charset=UTF-8'}})
                .then(response=>{
                    if(response.data.success) {
                        setSubscribeNumber(subscribeNumber + 1)
                        setSubscribed(!subscribed)
                    } else {
                        alert('구독 오류')
                    }
                })
        }
    }

    return (
        <div>
            <button
                style={{backgroundColor:`${subscribed ? '#AAAAAA' : '#CC0000'}`, color:'white', borderRadius:'4px',
                padding:'10px 16px', fontWeight:'500', fontSize:'1rem', transform:'uppercase'}}
                onClick={onSubscribe}
            >
                {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    );
}

export default Subscribe;