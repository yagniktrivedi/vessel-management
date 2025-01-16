"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FlowchartPage from "../flowchart/page";
import { useState, useEffect } from "react";
import { VesselCreationModal } from "@/components/modal/vessel-details-modal";

// import { vessels } from "@/lib/utils";

export default function VesselsPage() {
  const [tranferPlanData, setTransferplanData] = useState([]);
  const [vessels, setVessels] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  function getVessels() {
    fetch("/api/vessels")
      .then((response) => response.json())
      .then((data) => setVessels(data));
  }
  useEffect(() => {
    getVessels();
  }, []);

  function onAactionClick(event, id) {
    event.preventDefault();
    if (event.target.innerHTML === "Show") {
      console.log(id);
      const vesselTranferData = vessels.find((obj) => obj.id === id);
      setTransferplanData(vesselTranferData?.trasferPlan);
    } else {
      // navigate to create transfer plan
    }
  }

  function handelAddVessels(data) {
    console.log("Add Data Vessel data", data);
    const newVessel = {
      name: data.name,
      product: data.products.map((product) => ({
        name: product.name,
        quantiyMT: product.quantity,
      })),
      eta: data.eta,
      trasferPlan: {},
    };
    fetch("/api/vessels", {
      method: "POST",
      body: JSON.stringify(newVessel),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setVessels(data));
  }
  return (
    <>
      {/* {showAdd && <VesselDetailsModal />} */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Vessels</h2>
          <Button onClick={() => setShowAdd(true)}>Add Vessel</Button>
          <VesselCreationModal
            isOpen={showAdd}
            onClose={() => setShowAdd(false)}
            onSubmit={handelAddVessels}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vessels.map((vessel) => (
              <TableRow key={vessel.id}>
                <TableCell>{vessel.name}</TableCell>
                <TableCell>
                  {vessel.product.map((product) => (
                    <div key={product.name}>{product.name}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {vessel.product.map((product) => (
                    <div key={product.quantiyMT}>{product.quantiyMT}</div>
                  ))}
                </TableCell>
                <TableCell>{vessel.eta}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAactionClick(event, vessel.id)}
                  >
                    {Object.keys(vessel.trasferPlan).length ? (
                      "Show"
                    ) : (
                      <Link href={`/vessels/${vessel.id}`}>Create</Link>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FlowchartPage data={tranferPlanData} />
      </div>
    </>
  );
}

/*
const jsonObject = {
  shipName: "d",
  arrivalDate: "2025-01-14",
  products: [
    {
      name: "aa",
      quantity: "4",
    },
  ],
  lines: [
    {
      line: "5",
      sequences: [
        {
          sequenceNumber: 1,
          terminal: "PTF",
          tank: "TK-401",
          product: "aa",
          volume: "4",
        },
      ],
    },
  ],
};

function generateDiagram(data) {
  console.log("Data1", data);
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, "diagramContainer", {
    layout: $(go.LayeredDigraphLayout, { direction: 0 }),
    "undoManager.isEnabled": true,
  });

  // Define node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto",
    $(
      go.Shape,
      "RoundedRectangle",
      { fill: "#007bff", strokeWidth: 0 },
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 5, stroke: "white", font: "bold 12px Arial" },
      new go.Binding("text", "label")
    )
  );

  // Define link template
  diagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape, { strokeWidth: 2, stroke: "#555" }),
    $(go.Shape, { toArrow: "Standard", stroke: "#555" })
  );

  // Construct nodes and links from JSON
  const nodes = [];
  const links = [];

  // Add ship node
  nodes.push({
    key: "ship",
    label: `Ship: ${data.shipName}`,
    color: "#0056b3",
  });

  data.lines.forEach((line) => {
    const lineKey = `line${line.line}`;

    // Add line node
    nodes.push({
      key: lineKey,
      label: `Line ${line.line}`,
      color: "#28a745",
    });

    // Link ship to line
    links.push({ from: "ship", to: lineKey });

    line.sequences.forEach((seq) => {
      const sequenceKey = `${lineKey}-seq${seq.sequenceNumber}`;

      // Add sequence node
      nodes.push({
        key: sequenceKey,
        label: `Tank: ${seq.tank}\nProduct: ${seq.product}\nVolume: ${seq.volume} MT`,
        color: "#ffc107",
      });

      // Link line to sequence
      links.push({ from: lineKey, to: sequenceKey });
    });

    diagram.model = new go.GraphLinksModel(nodes, links);
  });

  // Assign nodes and links to diagram model
  diagram.model = new go.GraphLinksModel(nodes, links);
}
*/
