import React from 'react';
import { Button, notification, Space } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';

const AlertComNoOne = ({message, isOpen, count}) => {

    const [api, contextHolder] = notification.useNotification();
    const [pauseOnHover, setPauseOnHover] = useState(true);
    useEffect(()=>{
        if (isOpen){
            api.open({
                message: message,
                showProgress: true,
                pauseOnHover,
                style: {  
                  backgroundColor: '#fbf0ff', // Màu nền 
                  fontSize: "16px", 
                  fontWeight: "500",
                  color: 'white', // Màu chữ  
                  borderRadius: "5px",
                  
                },  
            });
        }
    }, [message, isOpen, count])
    return (
      <>
        {contextHolder}
      </>
    );
  };
  export default AlertComNoOne;