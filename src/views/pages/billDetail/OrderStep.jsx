// import { Stepper, Step, StepLabel } from '@mui/material';
import { Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material';
import { useMemo } from 'react';

const getStatus = (stt) => {
  switch (stt) {
    case 0:
      return 'Đã tạo ĐH';
    case 2:
      return 'Chờ xác nhận';
    case 3:
      return 'Chờ lấy hàng';
    case 4:
      return 'Đang giao hàng';
    case 5:
      return 'Đã giao';
    case 7:
      return 'Đã huỷ';
    case 9:
      return 'Đã xác nhận';
    default:
      return '';
  }
};

const OrderStep = (props) => {
  const { data } = props;
  console.log('352 ~ OrderStep ~ data:', data);

  const items = useMemo(() => {
    const maxStep = 8;
    let remainingStep = maxStep - data.length;

    // Kiểm tra nếu có phần tử trong data và phần tử cuối có trangThai là 7
    if (data.length > 0 && data[data.length - 1].trangThai === 7) {
      remainingStep = 0;
    }

    const steps = [...data].concat(Array.from({ length: remainingStep }).fill(null));

    const items = steps.map((it) => ({
      label: getStatus(it?.trangThai),
      description: it?.ngayTao ?? ''
    }));

    return items;
  }, [data]);

  return (
    <>
      <Stepper activeStep={data.length - 1} alternativeLabel sx={{ width: '100%' }}>
        {items.map((step, index) => (
          <Step key={index} orientation="horizontal">
            <img src={'../../../../'} alt={step.description} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            <StepLabel optional={<span>{step.description}</span>}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
    </>
  );
};

export default OrderStep;
