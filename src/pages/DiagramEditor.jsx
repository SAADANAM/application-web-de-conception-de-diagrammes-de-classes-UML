import React, { useState } from 'react';
import UMLToolbar from '../components/Toolbar';
import Whiteboard from '../components/Whiteboard';
import GenerateButton from '../components/GenerateButton';
import ClassEditor from '../components/ClassEditor';

const DiagramEditor = () => {
  const [classes, setClasses] = useState([]);
  const [relations, setRelations] = useState([]);
  const [editingClass, setEditingClass] = useState(null);
  const [relationType, setRelationType] = useState('association'); // Track selected relation type

  // Function to generate random position within the whiteboard
  const getRandomPosition = () => {
    const maxWidth = 800;  // Adjust based on the whiteboard's size
    const maxHeight = 600; // Adjust based on the whiteboard's size
    return {
      x: Math.floor(Math.random() * maxWidth),
      y: Math.floor(Math.random() * maxHeight),
    };
  };

  // Add a new class
  const handleAddClass = () => {
    const newClass = {
      id: classes.length + 1,
      name: `Class ${classes.length + 1}`,
      attributes: ['attribute1', 'attribute2'],
      methods: ['method1()', 'method2()'],
      position: getRandomPosition(), // Set a random position
    };
    setClasses([...classes, newClass]);
  };

  // Delete a class
  const handleDeleteClass = (classId) => {
    setClasses(classes.filter((cls) => cls.id !== classId));
    setRelations(relations.filter(
      (relation) => relation.class1Id !== classId && relation.class2Id !== classId
    ));
  };

  // Update class position
  const handleMoveClass = (id, newPosition) => {
    setClasses(classes.map(cls =>
      cls.id === id ? { ...cls, position: newPosition } : cls
    ));
  };

  // Open editor for a specific class
  const handleEditClass = (classId) => {
    const classToEdit = classes.find(cls => cls.id === classId);
    setEditingClass(classToEdit);
  };

  // Update class from editor
  const handleUpdateClass = (updatedClass) => {
    setClasses(classes.map(cls =>
      cls.id === updatedClass.id ? updatedClass : cls
    ));
    setEditingClass(null); // Close editor
  };

  // Add a relationship between two classes
  const handleAddRelation = (class1Id, class2Id) => {
    if (class1Id !== class2Id) {
      const newRelation = {
        id: relations.length + 1,
        class1Id,
        class2Id,
        type: relationType, // Add relation type
      };
      setRelations([...relations, newRelation]);
    } else {
      alert('Cannot create a relation with the same class.');
    }
  };

  // Generate code (placeholder)
  const handleGenerateCode = () => {
    const code = classes.map(cls => {
      const attributes = cls.attributes.map(attr => `  private ${attr};`).join('\n');
      const methods = cls.methods.map(method => `  public ${method} {}`).join('\n');
      return `
class ${cls.name} {
${attributes}
${methods}
}
      `;
    }).join('\n');

    console.log(code); // Display generated code in the console
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Toolbar */}
      <UMLToolbar
        onAddClass={handleAddClass}
        onRelationTypeChange={setRelationType} // Add relation type selector
      />
      
      {/* Whiteboard */}
      <Whiteboard
        classes={classes}
        onMoveClass={handleMoveClass}
        onEditClass={handleEditClass}
        relations={relations}
        onAddRelation={handleAddRelation}
      />

      {/* Class Editor */}
      {editingClass && (
        <ClassEditor
          classData={editingClass}
          onUpdateClass={handleUpdateClass}
          onDeleteClass={handleDeleteClass} // Pass delete handler
        />
      )}

      {/* Generate Button */}
      <GenerateButton onGenerateCode={handleGenerateCode} />
    </div>
  );
};

export default DiagramEditor;
