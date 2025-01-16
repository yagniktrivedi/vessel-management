import { NextResponse } from "next/server";
import { headers } from "next/headers";
let vessels;
vessels = [
  {
    id: 1,
    name: "Vessel A",
    product: [
      { name: "Crude Oil", quantiyMT: 500 },
      { name: "Product 2", quantiyMT: 400 },
    ],
    eta: "2023-06-15 14:00",
    quantityMT: 500,
    trasferPlan: {},
  },
  {
    id: 2,
    name: "Vessel B",
    product: [{ name: "Gasoline", quantiyMT: 250 }],
    eta: "2023-06-16 09:30",
    quantityMT: 500,
    trasferPlan: {},
  },
  {
    id: 3,
    name: "Vessel C",
    product: [
      { name: "Diesel", quantiyMT: 650 },
      { name: "Product 2", quantiyMT: 450 },
    ],
    eta: "2023-06-17 11:45",
    quantityMT: 400,
    trasferPlan: {
      nodes: [
        {
          key: "ship",
          text: "Ship: Vessel C",
          color: "#0056b3",
        },
        {
          key: "line5",
          text: "Line 5",
          color: "#28a745",
        },
        {
          key: "line5-seq1",
          text: "Tank: TK-402\nProduct: Diesel\nVolume: 350 MT",
          color: "#ffc107",
        },
        {
          key: "line5-seq2",
          text: "Tank: TK-401\nProduct: Diesel\nVolume: 300 MT",
          color: "#ffc107",
        },
        {
          key: "line1",
          text: "Line 1",
          color: "#28a745",
        },
        {
          key: "line1-seq1",
          text: "Tank: TK-101\nProduct: Product 2\nVolume: 250 MT",
          color: "#ffc107",
        },
        {
          key: "line1-seq2",
          text: "Tank: TK-101\nProduct: Product 2\nVolume: 200 MT",
          color: "#ffc107",
        },
      ],
      links: [
        {
          from: "ship",
          to: "line5",
        },
        {
          from: "line5",
          to: "line5-seq1",
        },
        {
          from: "line5",
          to: "line5-seq2",
        },
        {
          from: "ship",
          to: "line1",
        },
        {
          from: "line1",
          to: "line1-seq1",
        },
        {
          from: "line1",
          to: "line1-seq2",
        },
      ],
    },
  },
];

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("request came here", vessels);
  return NextResponse.json(vessels);
}

export async function PUT(request: Request) {
  try {
    const updatedVessel = await request.json();
    const index = vessels.findIndex((v) => v.id === updatedVessel.id);

    if (index === -1) {
      return NextResponse.json({ error: "Vessel not found" }, { status: 404 });
    }

    // Update the vessel
    vessels[index] = { ...vessels[index], ...updatedVessel };

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(vessels[index]);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  try {
    const newVessel = await request.json();
    newVessel.id = vessels.length + 1; // Simple ID assignment

    console.log("newVessel", newVessel);
    vessels = [...vessels, newVessel];
    console.log("vessels", vessels);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(vessels, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
