import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatNaira } from "@/lib/format";

const salesData = [
  { id: "s1", name: "Chinedu Okafor", email: "chinedu@gmail.com", type: "Rent", amount: 3_500_000, status: "paid" },
  { id: "s2", name: "Oluwaseun Adeyemi", email: "seun@gmail.com", type: "Rent", amount: 600_000, status: "Pending" },
  { id: "s3", name: "Emeka Nwosu", email: "emeka@gmail.com", type: "Sale", amount: 15_000_000, status: "paid" },
  { id: "s4", name: "Fatima Bello", email: "fatima@smoothrent.ng", type: "Rent", amount: 4_000_000, status: "paid" },
  { id: "s5", name: "Ibrahim Musa", email: "ibrahim@gmail.com", type: "Rent", amount: 1_200_000, status: "Pending" },
];

export function SalesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Report</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sales By</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Sales Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar fallback={sale.name.split(" ").map(n => n[0]).join("")} size="sm" />
                    <span className="font-medium">{sale.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted">{sale.email}</TableCell>
                <TableCell>{sale.type}</TableCell>
                <TableCell className="font-medium">
                  {formatNaira(sale.amount)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={sale.status === "paid" ? "success" : "warning"}
                  >
                    {sale.status === "paid" ? "Paid" : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
