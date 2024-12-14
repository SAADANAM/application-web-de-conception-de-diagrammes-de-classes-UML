import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Tooltip, Box } from '@mui/material';

const UMLToolbar = ({ onAddClass, onAddRelation }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Default list of relation types
  const relationTypes = ["Inheritance", "Association", "Dependency", "Aggregation", "Composition"];

  // Open and close menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRelationTypeClick = (type) => {
    onAddRelation(type); // Pass selected relation type to callback
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', boxShadow: 'none' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={2}>
          {/* Add Class Button */}
          <Tooltip title="Add a new class">
            <Button
              variant="contained"
              sx={{
                fontFamily: '"Orbitron", sans-serif', // Futuristic font
                fontWeight: 'bold',
                fontSize: '16px',
                backgroundColor: '#0078d4',
                color: '#fff',
                '&:hover': { backgroundColor: '#005bb5' },
              }}
              onClick={onAddClass}
            >
              Add Class
            </Button>
          </Tooltip>

          {/* Add Relation Button with Dropdown */}
          <Tooltip title="Add a relation between classes">
            <Button
              variant="outlined"
              sx={{
                fontFamily: '"Orbitron", sans-serif', // Futuristic font
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#333',
                borderColor: '#333',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  borderColor: '#333',
                },
              }}
              onClick={handleMenuOpen}
            >
              Add Relation
            </Button>
          </Tooltip>

          {/* Dropdown Menu for Relation Types */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {relationTypes.map((type, index) => (
              <MenuItem
                key={index}
                onClick={() => handleRelationTypeClick(type)}
                sx={{
                  fontFamily: '"Orbitron", sans-serif', // Futuristic font
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {type}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default UMLToolbar;
