import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function ButtonAdd({size, color, title, targetUrl}) {
  return (
    <Box title={title}>
      <Fab size={size} color={color} aria-label={title} href={targetUrl}>
        <AddIcon />
      </Fab>
    </Box>
  );
}