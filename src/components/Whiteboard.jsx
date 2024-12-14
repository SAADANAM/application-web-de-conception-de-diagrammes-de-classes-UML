import React, { useState } from 'react'; 
import { Button } from '@mui/material';

const Whiteboard = ({ classes, onMoveClass, onEditClass, onGenerateCode }) => {
  const [generatedCode, setGeneratedCode] = useState('');

  // Calculate the height of the whiteboard dynamically based on the class positions
  const whiteboardHeight = Math.max(600, ...classes.map((cls) => cls.position.y)) + 200; // Add extra space for new classes

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
    const code = onGenerateCode();
    setGeneratedCode(code);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: '10px' }}>
      {/* Whiteboard Section */}
      <div
        style={{
          position: 'relative',
          flex: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light glass effect
          border: '2px solid #d1d9e6',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)', // Glassmorphism effect
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
          backgroundImage:
            'radial-gradient(circle, rgba(200, 220, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          marginRight: '10px',
          minHeight: `${whiteboardHeight}px`, // Dynamic height based on class positions
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
              width: '200px',
              border: '2px solid #007aff',
              borderRadius: '10px',
              backgroundColor: '#f5faff',
              color: '#333',
              boxShadow: '0 4px 10px rgba(0, 122, 255, 0.3)',
              cursor: 'move',
              overflow: 'hidden',
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, classItem.id)}
            onClick={() => onEditClass(classItem.id)}
          >
            {/* Class Name */}
            <div
              style={{
                backgroundColor: '#007aff', // Blue header for class name
                color: 'white',
                textAlign: 'center',
                padding: '10px',
                fontWeight: 'bold',
              }}
            >
              {classItem.name}
            </div>

            {/* Attributes Section */}
            <div
              style={{
                padding: '10px',
                borderTop: '1px solid #d1d9e6',
                borderBottom: '1px solid #d1d9e6',
              }}
            >
              <h4 style={{ margin: '5px 0', color: '#007aff' }}>Attributes</h4>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {classItem.attributes.map((attr, index) => (
                  <li key={index} style={{ margin: '5px 0' }}>
                    {attr}
                  </li>
                ))}
              </ul>
            </div>

            {/* Methods Section */}
            <div style={{ padding: '10px' }}>
              <h4 style={{ margin: '5px 0', color: '#007aff' }}>Methods</h4>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {classItem.methods.map((method, index) => (
                  <li key={index} style={{ margin: '5px 0' }}>
                    {method}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Generate Code Button */}
        <Button
          variant="contained"
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(90deg, #007aff, #00c6ff)',
            color: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 10px rgba(0, 122, 255, 0.5)',
          }}
          onClick={handleGenerateCode}
        >
          Generate Code
        </Button>
      </div>

      {/* Code Window Section */}
      <div
        style={{
          flex: 1,
          border: '2px solid #d1d9e6',
          borderRadius: '15px',
          backgroundColor: 'rgba(245, 250, 255, 0.9)',
          color: '#333',
          padding: '15px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          height: '127%',
          alignSelf: 'flex-start',
        }}
      >
        <h4
          style={{
            textAlign: 'center',
            margin: '0 0 10px',
            color: '#007aff',
          }}
        >
          Code Output
        </h4>
        <pre style={{ margin: 0 }}>{generatedCode || 'No code generated yet.'}</pre>
      </div>
    </div>
  );
};

export default Whiteboard;
