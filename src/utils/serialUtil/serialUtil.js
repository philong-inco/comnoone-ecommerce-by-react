import { red, green, purple, grey } from '@mui/material/colors';

export const getStatusSerialColor = (status) => {
  switch (status) {
    case 0:
      return green[500];
    case 1:
      return purple[200];
    case 2:
      return red[500];
    default:
      return grey[400];
  }
};
