
import { useEffect, useState } from "react";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "../shadcn/components/ui/table"
import { supabase } from "../supabase/supabaseClient";
import { Profile } from "../interfaces/profile";

export default function RatingTable() {
    const [players, setPlayers] = useState<Profile[]>([]);

    useEffect(() => {
        async function fetchPlayers() {
            let { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('elo', { ascending: false });

            if (error) {
                console.error(error);
            } else {
                setPlayers(data ?? []);
            }
        }
        fetchPlayers();
    }, []);

    return (
        <div className="border rounded-lg w-full">
            <div className="relative w-full overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[10rem]">Player Name</TableHead>
                            <TableHead>Elo Rating</TableHead>
                            <TableHead>Rank</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {players.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.elo}</TableCell>
                                <TableCell>{index + 1}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

