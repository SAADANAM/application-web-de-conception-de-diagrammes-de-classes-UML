import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Tooltip } from '@mui/material';

const UMLToolbar = ({ onAddClass, onAddRelation, canAddRelation }) => {
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  return (
    <AppBar position="static">
      <Toolbar>
        <Button 
          color="inherit" 
          onClick={onAddClass} 
          style={{ marginRight: '10px' }}
        >
          Add Class
        </Button>

        {/* Tooltip for Add Relation button */}
        <Tooltip title={canAddRelation ? "Add a relation between two classes" : "Select two classes to create a relation"}>
          <span>
            <Button 
              color="inherit" 
              onClick={onAddRelation} 
              style={{
                backgroundColor: canAddRelation && isHovered ? '#e0e0e0' : '', // Change color on hover
                cursor: canAddRelation ? 'pointer' : 'not-allowed', // Change cursor if button is enabled
              }}
              onMouseEnter={() => setIsHovered(true)} // Hover effect
              onMouseLeave={() => setIsHovered(false)} // Hover effect
            >
              Add Relation
            </Button>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default UMLToolbar;