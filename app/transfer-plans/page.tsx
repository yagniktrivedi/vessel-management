import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const transferPlans = [
  { id: 1, vessel: "Vessel A", terminal: "Terminal B", status: "Planned", startTime: "2023-06-15 16:00" },
  { id: 2, vessel: "Vessel B", terminal: "Terminal A", status: "In Progress", startTime: "2023-06-16 10:30" },
  { id: 3, vessel: "Vessel C", terminal: "Terminal C", status: "Completed", startTime: "2023-06-17 13:45" },
]

export default function TransferPlansPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Transfer Plans</h2>
        <Button>Create Transfer Plan</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vessel</TableHead>
            <TableHead>Terminal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transferPlans.map((plan) => (
            <TableRow key={plan.id}>
              <TableCell>{plan.vessel}</TableCell>
              <TableCell>{plan.terminal}</TableCell>
              <TableCell>{plan.status}</TableCell>
              <TableCell>{plan.startTime}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

