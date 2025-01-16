"use client";

import React, { useEffect, useRef } from "react";
import * as go from "gojs";

interface FlowchartData {
  nodes: Array<{ key: string; text: string }>;
  links: Array<{ from: string; to: string }>;
}

interface GoJSFlowchartProps {
  data: FlowchartData;
}

const GoJSFlowchart: React.FC<GoJSFlowchartProps> = ({ data }) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!diagramRef.current) return;

    const $ = go.GraphObject.make;

    const diagram = $(go.Diagram, diagramRef.current, {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout, { angle: 0, layerSpacing: 35 }),
      model: $(go.GraphLinksModel, {
        nodeDataArray: data.nodes,
        linkDataArray: data.links,
      }),
    });

    diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "#1E88E5" }),
      $(
        go.TextBlock,
        { margin: 8, stroke: "#fff" },
        new go.Binding("text", "text")
      )
    );

    return () => {
      diagram.div = null;
    };
  }, [data]);

  return (
    <div
      ref={diagramRef}
      style={{ width: "100%", height: "500px", border: "1px solid black" }}
    />
  );
};

export default GoJSFlowchart;
