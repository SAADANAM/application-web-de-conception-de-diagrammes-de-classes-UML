import React, { useEffect, useMemo, useState } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
} from '@projectstorm/react-diagrams';

const DiagramComponent = () => {
  // UseMemo ensures these are initialized once
  const engine = useMemo(() => new DiagramEngine(), []);
  const model = useMemo(() => new DiagramModel(), []);

  // Track the number of classes added
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    // Set the model to the engine only once
    engine.setModel(model);
  }, [engine, model]);

  // Function to add a new class without reinitializing the engine or model
  const addClass = () => {
    const newNode = new DefaultNodeModel({
      name: `Class ${classCount + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 70%)`, // Random color for each class
    });
    newNode.setPosition(
      Math.random() * 400, // Random X position
      Math.random() * 400 // Random Y position
    );
    model.addNode(newNode); // Add node to the existing model
    setClassCount((prevCount) => prevCount + 1);

    // Repaint the canvas to reflect changes
    engine.repaintCanvas();
  };

  return (
    <div style={{ padding: '10px' }}>
      <h1>UML Class Diagram Builder</h1>
      <button onClick={addClass} style={{ marginBottom: '10px' }}>
        Add Class
      </button>
      <div
        style={{
          height: '500px',
          width: '100%',
          border: '1px solid black',
          overflow: 'hidden',
        }}
      >
        <CanvasWidget engine={engine} />
      </div>
    </div>
  );
};

export default DiagramComponent;
