
import { useEffect, useState } from 'react';
import RatingTable from '../components/rating-table'
import BestPlayers from '../components/top3LeaderboardComp'
import { Profile } from '../interfaces/profile';
import { supabase } from '../supabase/supabaseClient';

function LeaderBoard() {

    const [players, setPlayers] = useState<Profile[]>([]);

    useEffect(() => {
        async function fetchPlayers() {
            let { data, error } = await supabase
                .from('profiles')
                .select('*')
                .like('email', '%@safebase.no')
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
        <main className="flex flex-col items-center justify-start pt-10 w-full pl-[15rem]">
            <div className='w-full max-w-[70%] text-3xl pt-5'>
                <BestPlayers players={players} />
                <div className="w-full pt-10">
                    <RatingTable props={players} />
                </div>
            </div>

        </main>
    )
}

export default LeaderBoard