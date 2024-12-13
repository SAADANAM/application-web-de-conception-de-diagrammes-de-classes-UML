import React, { useState, useEffect } from 'react';

const ClassEditor = ({ classData, onUpdateClass }) => {
  const [name, setName] = useState(classData.name);
  const [attributes, setAttributes] = useState(classData.attributes.join(', '));
  const [methods, setMethods] = useState(classData.methods.join(', '));

  useEffect(() => {
    setName(classData.name);
    setAttributes(classData.attributes.join(', '));
    setMethods(classData.methods.join(', '));
  }, [classData]);

  const handleSave = () => {
    const updatedClass = {
      ...classData,
      name,
      attributes: attributes.split(',').map(attr => attr.trim()),
      methods: methods.split(',').map(method => method.trim()),
    };
    onUpdateClass(updatedClass);
  };

  return (
    <div style={styles.modal}>
      <h3>Edit Class</h3>
      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Attributes: </label>
        <input type="text" value={attributes} onChange={(e) => setAttributes(e.target.value)} />
      </div>
      <div>
        <label>Methods: </label>
        <input type="text" value={methods} onChange={(e) => setMethods(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default ClassEditor;
