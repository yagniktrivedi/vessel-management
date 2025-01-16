import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const terminals = [
  { id: 1, name: "Terminal A", berths: 3, hoselines: 5, tanks: 8 },
  { id: 2, name: "Terminal B", berths: 2, hoselines: 4, tanks: 6 },
  { id: 3, name: "Terminal C", berths: 4, hoselines: 7, tanks: 10 },
]

export default function TerminalsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Terminals</h2>
        <Button>Add Terminal</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Berths</TableHead>
            <TableHead>Hoselines</TableHead>
            <TableHead>Tanks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {terminals.map((terminal) => (
            <TableRow key={terminal.id}>
              <TableCell>{terminal.name}</TableCell>
              <TableCell>{terminal.berths}</TableCell>
              <TableCell>{terminal.hoselines}</TableCell>
              <TableCell>{terminal.tanks}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

