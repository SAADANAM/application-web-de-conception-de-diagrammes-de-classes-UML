import React, { useState } from 'react';
import UMLToolbar from '../components/Toolbar';
import Whiteboard from '../components/Whiteboard';
import GenerateButton from '../components/GenerateButton';
import ClassEditor from '../components/ClassEditor'; // Add ClassEditor component

const DiagramEditor = () => {
  const [classes, setClasses] = useState([]);
  const [editingClass, setEditingClass] = useState(null); // Track the class being edited
  const [relations, setRelations] = useState([]); 

  // Add Class handler
  const handleAddClass = () => {
    const newClass = {
      id: classes.length + 1,
      name: `Class ${classes.length + 1}`,
      attributes: ['attribute1', 'attribute2'],
      methods: ['method1()', 'method2()'],
      position: { x: 100, y: 100 },
    };
    setClasses([...classes, newClass]);
  };

  // Handle moving class
  const handleMoveClass = (id, newPosition) => {
    setClasses(classes.map(cls =>
      cls.id === id ? { ...cls, position: newPosition } : cls
    ));
  };

  // Handle class edit
  const handleEditClass = (classId) => {
    const classToEdit = classes.find(cls => cls.id === classId);
    setEditingClass(classToEdit);
  };

  // Handle class updates from the editor
  const handleUpdateClass = (updatedClass) => {
    setClasses(classes.map(cls =>
      cls.id === updatedClass.id ? updatedClass : cls
    ));
    setEditingClass(null); // Close the editor after update
  };

  // Handle generating code
  const handleGenerateCode = () => {
    console.log('Generate Code clicked');
    // Logic for generating code goes here
  };
  const handleAddRelation = (class1Id, class2Id) => {
    // Check if both classes exist
    if (class1Id !== class2Id) {
      const newRelation = {
        id: relations.length + 1,
        class1Id,
        class2Id,
        type: 'association', // You can change the type based on your requirements
      };
      setRelations([...relations, newRelation]);
    } else {
      console.log('Cannot create a relation with the same class.');
    }
  };

  return (
    <div>
      <UMLToolbar onAddClass={handleAddClass} />
      <Whiteboard classes={classes} onMoveClass={handleMoveClass} onEditClass={handleEditClass} relations={relations} onAddRelation={handleAddRelation}/>
      {editingClass && <ClassEditor classData={editingClass} onUpdateClass={handleUpdateClass} />}
      <GenerateButton onGenerateCode={handleGenerateCode} />
    </div>
  );
};

export default DiagramEditor;