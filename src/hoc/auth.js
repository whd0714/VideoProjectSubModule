import React, { useEffect } from 'react';
import {useDispatch} from "react-redux";
import {userAuth} from "../_actions/user_action";

export default function(SpecificComponent, option, adminRoute=null) {

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(userAuth())
                .then(response=>{
                   if(!response.payload.data.success) {
                        if(option) {

                            props.history.push('/login')
                        }
                   } else {
                       if(option == null) {
                           console.log('option == null')
                       }
                       else if(!option) {
                           props.history.push('/')
                       }
                   }
                })
        },[])

        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck;
}