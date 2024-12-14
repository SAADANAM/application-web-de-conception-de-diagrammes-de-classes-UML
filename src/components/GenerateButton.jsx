import React from 'react';
import { Button } from '@mui/material';

const GenerateButton = ({ onGenerateCode }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onGenerateCode}
      sx={{
        position: 'absolute',
        bottom: 20,
        right: 20,
      }}
    >
      Generate Code
    </Button>
  );
};

export default GenerateButton;
