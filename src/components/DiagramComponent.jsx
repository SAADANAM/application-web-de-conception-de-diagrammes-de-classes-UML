import React, { useEffect, useMemo, useState } from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { DefaultNodeModel } from '@projectstorm/react-diagrams-defaults';

const DiagramComponent = () => {
  const engine = useMemo(() => new DiagramEngine(), []);
  const model = useMemo(() => new DiagramModel(), []);
  const [classCount, setClassCount] = useState(0);

  useEffect(() => {
    engine.setModel(model);
  }, [engine, model]);

  const addClass = () => {
    const randomColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
    const randomX = Math.random() * 400;
    const randomY = Math.random() * 400;

    const newNode = new DefaultNodeModel({
      name: `Class ${classCount + 1}`,
      color: randomColor,
    });
    newNode.setPosition(randomX, randomY);
    model.addNode(newNode);
    setClassCount(classCount + 1);
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
