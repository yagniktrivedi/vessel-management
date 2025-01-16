//@ts-nocheck

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
// import { vessels } from "@/lib/utils";
import { terminalBerths, terminalTanks, terminalMapping } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import "./styles1.css";
import { text } from "stream/consumers";

export default function CreateTransferPlanPage() {
  const [ptfTer, setPtfTer] = useState([]);
  const [pmeTer, setPmeTer] = useState([]);
  const [ptfSeq, setPtfSeq] = useState(1);
  const [pmeSeq, setPmeSeq] = useState(1);

  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [showAdd, setShowAdd] = useState(false);

  function getVessels() {
    setLoading(true);
    fetch("/api/vessels")
      .then((response) => response.json())
      .then((data) => {
        console.log("Vessel Data", data);
        setVessels(data);
        setLoading(false);
      });
  }
  useEffect(() => {
    getVessels();
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tranferId = pathname.split("/vessels/")[1];

  let vessel;
  vessel = vessels.find((vessel) => vessel.id == tranferId);

  function handleFormSubmit(e) {
    e.preventDefault();
  }

  function onPTETerminalSelect(e) {
    const lineNum = e.target.dataset.line;
    setPtfTer((prevState) => {
      if (!prevState.includes(lineNum)) {
        return [...prevState, lineNum];
      } else {
        return prevState.filter((num) => num != lineNum);
      }
    });
  }

  function generateJSON() {
    let formData = {
      shipName: vessel.name,
      arrivalDate: vessel.eta,
      products: vessel.product,
      lines: [],
    };
    document.querySelectorAll(".sequence-container").forEach((container) => {
      const lineNumber = container.id.match(/\d+/)[0];
      const terminal = terminalMapping[lineNumber];
      const sequences = [];
      container.querySelectorAll(".sequence").forEach((seq, index) => {
        sequences.push({
          sequenceNumber: index + 1,
          terminal: terminal,
          tank: seq.querySelector(`[name^="tank"]`).value,
          product: seq.querySelector(`[name^="product"]`).value,
          // product: vessel.product,
          volume: seq.querySelector(`[name^="volume"]`).value,
        });
      });
      formData.lines.push({
        line: lineNumber,
        sequences: sequences,
      });
    });

    // Construct nodes and links from JSON
    const nodes = [];
    const links = [];

    nodes.push({
      key: "ship",
      text: `Ship: ${formData.shipName}`,
      color: "#0056b3",
    });

    // links and nodes
    formData.lines.forEach((line) => {
      const lineKey = `line${line.line}`;

      // Add line node
      nodes.push({
        key: lineKey,
        text: `Line ${line.line}`,
        color: "#28a745",
      });

      // Link ship to line
      links.push({ from: "ship", to: lineKey });

      line.sequences.forEach((seq) => {
        const sequenceKey = `${lineKey}-seq${seq.sequenceNumber}`;

        // Add sequence node
        nodes.push({
          key: sequenceKey,
          text: `Tank: ${seq.tank}\nProduct: ${seq.product}\nVolume: ${seq.volume} MT`,
          color: "#ffc107",
        });

        // Link line to sequence
        links.push({ from: lineKey, to: sequenceKey });
      });
    });
    // console.log("nodes", nodes);
    // console.log("links", links);
    const data = {
      id: vessel.id,
      name: vessel.name,
      product: vessel.product,
      eta: vessel.eta,
      trasferPlan: {
        nodes: nodes,
        links: links,
      },
    };
    console.log(data);
    fetch("/api/vessels", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => router.push("/vessels"));
  }
  function onPMETerminalSelect(e) {
    const lineNum = e.target.dataset.line;
    setPmeTer((prevState) => {
      if (!prevState.includes(lineNum)) {
        return [...prevState, lineNum];
      } else {
        return prevState.filter((num) => num != lineNum);
      }
    });
  }

  function renderSeq(lineNum) {
    let ascendingArray = new Array(ptfSeq).fill(0).map((_, index) => index + 1);
    return ascendingArray.map((seq) => {
      return (
        <div className="sequence" key={seq}>
          <label htmlFor={`tank${lineNum}Seq${seq}`}>Tank Number:</label>
          <select
            id={`tank${lineNum}Seq${seq}`}
            name={`tank${lineNum}Seq${seq}`}
          >
            {terminalTanks["PTF"].map((tank) => (
              <option value={tank}>${tank}</option>
            ))}
          </select>
          <label htmlFor={`product${lineNum}Seq${seq}`}>Product Name: </label>
          <select
            id={`product${lineNum}Seq${seq}`}
            name={`product${lineNum}Seq${seq}`}
          >
            {vessel.product.map((product) => (
              <option value={product.name} key={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <label htmlFor={`volume${lineNum}Seq${seq}`}>Volume in MT:</label>
          <input
            type="number"
            id={`volume${lineNum}Seq${seq}`}
            name={`volume${lineNum}Seq${seq}`}
            min="0"
            required
          />
          {ptfSeq > 1 && (
            <button
              type="button"
              className="delete-sequence"
              onClick={() => setPtfSeq((prevState) => prevState - 1)}
            >
              Delete Sequence
            </button>
          )}
        </div>
      );
    });
  }

  function renderSeqPME(lineNum) {
    let ascendingArray = new Array(pmeSeq).fill(0).map((_, index) => index + 1);
    return ascendingArray.map((seq) => {
      return (
        <div className="sequence" key={seq}>
          <label htmlFor={`tank${lineNum}Seq${seq}`}>Tank Number:</label>
          <select
            id={`tank${lineNum}Seq${seq}`}
            name={`tank${lineNum}Seq${seq}`}
          >
            {terminalTanks["PME"].map((tank) => (
              <option value={tank} key={tank}>
                ${tank}
              </option>
            ))}
          </select>
          <label htmlFor={`product${lineNum}Seq${seq}`}>Product Name: </label>
          <select
            id={`product${lineNum}Seq${seq}`}
            name={`product${lineNum}Seq${seq}`}
          >
            {vessel.product.map((product) => (
              <option value={product.name} key={product.name}>
                {product.name}
              </option>
            ))}
          </select>

          <label htmlFor={`volume${lineNum}Seq${seq}`}>Volume in MT:</label>
          <input
            type="number"
            id={`volume${lineNum}Seq${seq}`}
            name={`volume${lineNum}Seq${seq}`}
            min="0"
            required
          />
          {pmeSeq > 1 && (
            <button
              type="button"
              className="delete-sequence"
              onClick={() => setPmeSeq((prevState) => prevState - 1)}
            >
              Delete Sequence
            </button>
          )}
        </div>
      );
    });
  }

  if (loading) {
    return <div> Fetching vessel data please wait .....</div>;
  }
  return (
    <>
      <div>
        <div> {`Ship Name: ${vessel.name}`} </div>
        <div>{`Arrival Date: ${vessel.eta}`}</div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Quabtity in MT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vessel?.product.map((product) => (
              <TableRow key={product.name}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantiyMT}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h1>PTF Terminal Lines</h1>
        <div className="lineButtons">
          {terminalBerths.PTF.map((name) => (
            <button
              key={name}
              type="button"
              onClick={onPTETerminalSelect}
              className={`line-button ${
                ptfTer.includes(name[name.length - 1]) ? "selected" : ""
              }`}
              data-line={name[name.length - 1]}
            >
              {name}
            </button>
          ))}
        </div>
        <div>
          <h1>PME Terminal Lines</h1>
          <div className="lineButtons">
            {terminalBerths.PME.map((name, ind) => (
              <button
                key={name}
                type="button"
                onClick={onPMETerminalSelect}
                className={`line-button ${
                  pmeTer.includes(name[name.length - 1]) ? "selected" : ""
                }`}
                data-line={name[name.length - 1]}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
        {ptfTer.length
          ? ptfTer.map((lineNum) => {
              return (
                <div
                  className="sequence-container"
                  id={`line${lineNum}Container`}
                  key={lineNum}
                >
                  <h3>Line {lineNum} (Terminal : PTF)</h3>
                  <button
                    type="button"
                    onClick={() => setPtfSeq((prevState) => prevState + 1)}
                  >
                    Add Sequence
                  </button>
                  {renderSeq(lineNum)}
                </div>
              );
            })
          : null}
        {pmeTer.length
          ? pmeTer.map((lineNum) => {
              return (
                <div
                  className="sequence-container"
                  id={`line${lineNum}Container`}
                  key={lineNum}
                >
                  <h3>Line {lineNum} (Terminal : PME)</h3>
                  <button
                    type="button"
                    onClick={() => setPmeSeq((prevState) => prevState + 1)}
                  >
                    Add Sequence
                  </button>
                  {renderSeqPME(lineNum)}
                </div>
              );
            })
          : null}
        <button type="button" onClick={generateJSON}>
          Generate Transfer Diagram
        </button>
      </div>
    </>
  );
}

/*
 return (
    <div id="app">
      <h1>Petrochem Shipment Plan</h1>
      <form id="shipmentForm" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="shipName">Ship Name:</label>
          <input
            type="text"
            id="shipName"
            name="shipName"
            required
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                shipName: e.target.value,
              }))
            }
            value={formData.shipName}
          />
        </div>
        <div>
          <label htmlFor="arrivalDate">Arrival Date:</label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            required
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                arrivalDate: e.target.value,
              }))
            }
            value={formData.arrivalDate}
          />
        </div>
        <div className="full-width">
          <label htmlFor="numProducts">Number of Products:</label>
          <input
            type="number"
            id="numProducts"
            name="numProducts"
            min="1"
            required
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                numProducts: +e.target.value,
              }))
            }
          />
        </div>
        <button> Submit</button>
      </form>
      <h1>PTF Terminal Lines</h1>
    </div>
  );
*/
