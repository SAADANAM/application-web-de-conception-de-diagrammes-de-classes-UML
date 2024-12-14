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
      <h3 style={styles.title}>Edit Class</h3>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Attributes:</label>
        <input
          type="text"
          value={attributes}
          onChange={(e) => setAttributes(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Methods:</label>
        <input
          type="text"
          value={methods}
          onChange={(e) => setMethods(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleSave} style={styles.saveButton}>
        Save
      </button>
    </div>
  );
};

const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'linear-gradient(135deg, #1f1f2e, #2b2b45)',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
    color: 'white',
    width: '400px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.5em',
    color: '#00d4ff',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '0.9em',
    color: '#bbb',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    fontSize: '1em',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.3)',
  },
  saveButton: {
    display: 'block',
    width: '100%',
    padding: '12px',
    fontSize: '1em',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
};

export default ClassEditor;
