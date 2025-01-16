"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GoJSFlowchart = dynamic(
  () => import("@/components/chart/GoJSFlowchart"),
  {
    ssr: false,
  }
);

export default function FlowchartPage({ data }) {
  const [flowchartData, setFlowchartData] = useState(data);

  useEffect(() => {
    setFlowchartData(data);
  }, [data]);

  return Object.keys(flowchartData).length ? (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tarnsfer plan</h1>
      <GoJSFlowchart data={flowchartData} />
    </div>
  ) : null;
}
