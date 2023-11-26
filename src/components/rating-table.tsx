import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../shadcn/components/ui/table"
import { Profile } from "../interfaces/profile";


interface RatingTableProps {
    props: Profile[];
}


export default function RatingTable({ props }: RatingTableProps) {

    return (
        <div className="border rounded-lg w-full bg-secondary">
            <div className="relative w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[10rem]">Player Name</TableHead>
                            <TableHead>Elo Rating</TableHead>
                            <TableHead className="text-right">Rank</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.elo}</TableCell>
                                <TableCell className="text-right">{index + 1}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

