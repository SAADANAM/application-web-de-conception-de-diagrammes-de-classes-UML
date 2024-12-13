import React from 'react';
import { Button } from '@mui/material';

const GenerateButton = ({ onGenerateCode }) => {
  return (
    <Button 
      variant="contained" 
      color="primary" 
      onClick={onGenerateCode}
      style={{ position: 'absolute', bottom: '20px', right: '20px' }}
    >
      Generate Code
    </Button>
  );
};

export default GenerateButton;
