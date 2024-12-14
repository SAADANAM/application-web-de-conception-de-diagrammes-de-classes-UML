import React, { useState } from 'react';
import { Button } from '@mui/material';

const Whiteboard = ({ classes, onMoveClass, onEditClass, onGenerateCode }) => {
  const [generatedCode, setGeneratedCode] = useState('');

  const handleDragStart = (e, classId) => {
    e.dataTransfer.setData('classId', classId);
  };

  const handleDrop = (e) => {
    const classId = e.dataTransfer.getData('classId');
    const classItem = classes.find((cls) => cls.id === parseInt(classId));
    const newPosition = { x: e.clientX - 50, y: e.clientY - 50 };
    onMoveClass(classItem.id, newPosition);
  };

  const handleGenerateCode = () => {
    const code = onGenerateCode(); // Get the generated code from the parent
    setGeneratedCode(code);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '10px' }}>
      {/* Whiteboard Section */}
      <div
        style={{
          position: 'relative',
          flex: 3,
          backgroundColor: '#d3d3d3',
          border: '3px solid black',
          borderRadius: '15px',
          backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          marginRight: '10px',
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            style={{
              position: 'absolute',
              left: `${classItem.position.x}px`,
              top: `${classItem.position.y}px`,
              border: '1px solid black',
              padding: '10px',
              backgroundColor: 'lightblue',
              cursor: 'move',
              borderRadius: '8px',
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, classItem.id)}
            onClick={() => onEditClass(classItem.id)} // Trigger edit on click
          >
            <h3>{classItem.name}</h3>
            <h4>Attributes:</h4>
            <ul>
              {classItem.attributes.map((attr, index) => (
                <li key={index}>{attr}</li>
              ))}
            </ul>
            <h4>Methods:</h4>
            <ul>
              {classItem.methods.map((method, index) => (
                <li key={index}>{method}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Generate Code Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateCode}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
          }}
        >
          Generate Code
        </Button>
      </div>

      {/* Code Window Section */}
      <div
        style={{
          flex: 1,
          border: '2px solid black',
          borderRadius: '15px',
          backgroundColor: '#f9f9f9',
          padding: '15px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          height: '50%',
          alignSelf: 'flex-start',
        }}
      >
        <h4 style={{ textAlign: 'center', margin: '0 0 10px' }}>Code Output</h4>
        <pre style={{ margin: 0 }}>{generatedCode || 'No code generated yet.'}</pre>
      </div>
    </div>
  );
};

export default Whiteboard;
