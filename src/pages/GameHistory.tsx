
import { useEffect, useState } from "react"
import GameDialog from "../components/addGameDialog"
import GameHistoryCard from "../components/gameHistoryCard"
import { supabase } from "../supabase/supabaseClient"
import { Profile } from "../interfaces/profile"

function GameHistory() {

    const [gameHistory, setGameHistory] = useState<GameHistory[]>()
    const [players, setPlayers] = useState<Profile[]>([])


    const addNewGame = (newGame: GameHistory) => {
        setGameHistory(prevGames => [newGame, ...prevGames!]);
    };

    useEffect(() => {
        async function fetchPlayers() {
            let { data, error } = await supabase
                .from('profiles')
                .select('*')
                .like('email', '%@safebase.no')
                .order('elo', { ascending: false })

            if (error) {
                console.error(error);
            } else {
                setPlayers(data ?? []);
            }
        }

        async function fetchGameHistory() {
            let { data, error } = await supabase
                .from('game_history')
                .select('*')
                .order('date_played', { ascending: false })

            if (error) {
                console.error(error);
            } else {
                setGameHistory(data ?? []);
            }
        }

        fetchPlayers();
        fetchGameHistory();
    }, []);


    return (
        <main className="flex flex-col items-center justify-start pt-10 w-full pl-[15rem] min-h-screen">
            <div className='w-full max-w-[70%] text-3xl flex items-center justify-between my-5'>
                <h1 className="text-2xl font-bold">Game History</h1>
                <GameDialog players={players} onNewGameAdded={addNewGame} />
            </div>
            <div className="w-full max-w-[70%] flex flex-col gap-5">
                {gameHistory && gameHistory.map((game, index) => (
                    <GameHistoryCard key={index} gameHistory={game} profiles={players} />
                ))}
            </div>

        </main>
    )
}

export default GameHistory