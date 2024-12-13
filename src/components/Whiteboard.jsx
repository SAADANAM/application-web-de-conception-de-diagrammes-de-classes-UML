import React from 'react';

const Whiteboard = ({ classes, onMoveClass, onEditClass }) => {
  const handleDragStart = (e, classId) => {
    // Store the class being dragged
    e.dataTransfer.setData('classId', classId);
  };

  const handleDrop = (e) => {
    const classId = e.dataTransfer.getData('classId');
    const classItem = classes.find(cls => cls.id === parseInt(classId));
    const newPosition = { x: e.clientX - 50, y: e.clientY - 50 };
    onMoveClass(classItem.id, newPosition);
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '500px',
        border: '1px solid #000',
        backgroundColor: '#f5f5f5',
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
    </div>
  );
};

export default Whiteboard;