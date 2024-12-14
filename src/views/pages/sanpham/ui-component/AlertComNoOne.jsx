import React from 'react';
import { Button, notification, Space } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';

const AlertComNoOne = ({title, message, isOpen}) => {

    const [api, contextHolder] = notification.useNotification();
    const [pauseOnHover, setPauseOnHover] = useState(true);
    // const openNotification = (pauseOnHover) => () => {
    //   api.open({
    //     message: title,
    //     description: message,
    //     showProgress: true,
    //     pauseOnHover,
    //   });
    // };
    useEffect(()=>{
        if (isOpen){
            api.open({
                message: title,
                description: message,
                showProgress: true,
                pauseOnHover,
            });
        }
    }, [title, message, isOpen])
    return (
      <>
        {contextHolder}
      </>
    );
  };
  export default AlertComNoOne;