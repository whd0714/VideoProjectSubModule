import React, {useState} from 'react';
import axios from "axios";


function Comment(props) {

    const [commentValue, setCommentValue] = useState("");

    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            comment : commentValue,
        }

        axios.post("/api/comment/new/root",
            JSON.stringify(data),
            {headers:{'content-type':'application/json; charset=UTF-8'}})
            .then(response=>{
                if(response.data.success) {

                }else {

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
                    value
                    placeholder="코멘트를 작성해 주세요"
                />
                <br/>
                <button style={{ width:'20%', height: '52px'}} onclick={onSubmit}>Submit</button>
            </form>

        </div>
    );
}

export default Comment;
