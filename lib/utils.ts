import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const vessels = [
  {
    id: 1,
    name: "Vessel A",
    product: [
      { name: "Crude Oil", quantiyMT: 500 },
      { name: "Product 2", quantiyMT: 400 },
    ],
    eta: "2023-06-15 14:00",
    trasferPlan: {},
  },
  {
    id: 2,
    name: "Vessel B",
    product: [{ name: "Gasoline", quantiyMT: 250 }],
    eta: "2023-06-16 09:30",
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

export const terminalBerths = {
  PTF: ["PTF Line 5", "PTF Line 6", "PTF Line 7", "PTF Line 8", "PTF Line 9"],
  PME: ["PME Line 1", "PME Line 2", "PME Line 3", "PME Line 4"],
};

export const terminalTanks = {
  PTF: [
    "TK-401",
    "TK-402",
    "TK-403",
    "TK-404",
    "TK-405",
    "TK-406",
    "TK-501",
    "TK-502",
    "TK-503",
    "TK-504",
    "TK-505",
    "TK-506",
    "TK-507",
    "TK-508",
    "TK-601",
    "TK-602",
    "TK-603",
    "TK-604",
    "TK-605",
    "TK-606",
    "TK-701",
    "TK-702",
    "TK-703",
    "TK-704",
    "TK-801",
    "TK-802",
    "TK-803",
    "TK-804",
    "TK-805",
    "TK-806",
  ],
  PME: [
    "TK-101",
    "TK-102",
    "TK-103",
    "TK-104",
    "TK-105",
    "TK-106",
    "TK-201",
    "TK-202",
    "TK-203",
    "TK-204",
    "TK-205",
    "TK-206",
    "TK-301",
    "TK-302",
    "TK-303",
    "TK-304",
    "TK-305",
    "TK-306",
    "TK-307",
    "TK-308",
    "TK-309",
    "TK-310",
  ],
};

export const terminalMapping = {
  1: "PME",
  2: "PME",
  3: "PME",
  4: "PME", // Lines 1-4 for PME
  5: "PTF",
  6: "PTF",
  7: "PTF",
  8: "PTF",
  9: "PTF",
  10: "PTF",
  11: "PTF",
  12: "PTF", // Lines 5-12 for PTF
};
