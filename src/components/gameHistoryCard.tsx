import { Profile } from '../interfaces/profile'
import { Badge } from '../shadcn/components/ui/badge';


interface GameHistoryCardProps {
    gameHistory: GameHistory;
    profiles: Profile[];
}

function gameHistoryCard({ gameHistory, profiles }: GameHistoryCardProps) {

    const whitePlayer = profiles?.find((profile) => profile.id === gameHistory.white_player_id);
    const blackPlayer = profiles?.find((profile) => profile.id === gameHistory.black_player_id);

    return (
        <div className='w-full bg-secondary shadow-lg rounded-md border hover:scale-105'>
            <div className='p-5'>
                <div className='flex items-center justify-center'>
                    <div className='flex items-center w-full'>
                        <div className='flex flex-col items-start justify-center'>
                            {
                                gameHistory.winner === "white" ?
                                    <Badge variant={gameHistory.winner === 'white' ? 'secondary' : 'secondary'} className='bg-green-300 mb-2 hover:bg-green-300 ml-2'>Winner</Badge> :
                                    <Badge variant={gameHistory.winner === 'black' ? 'default' : 'default'} className='mb-2 bg-slate-300 text-black hover:bg-slate-300 ml-3'>Loser</Badge>
                            }
                            <div className='flex'>
                                <img src="./white-piece.png" className='w-[5rem] h-[5rem] rounded-full' alt="" />
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-lg font-bold ml-5'>{whitePlayer?.username}</p>
                                    <p>{gameHistory.elo_change_white}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[5rem]'>
                        {
                            gameHistory.winner === 'white' ? "1 - 0" : gameHistory.winner === 'black' ? "0 - 1" : "1/2 - 1/2"
                        }
                    </div>
                    <div className='flex items-center justify-end w-full'>
                        <div className='flex flex-col items-end justify-center'>
                            {
                                gameHistory.winner === "black" ?
                                    <Badge variant={gameHistory.winner === 'black' ? 'secondary' : 'default'} className='bg-green-300 mb-2 hover:bg-green-300 mr-2'>Winner</Badge> :
                                    <Badge variant={gameHistory.winner === 'white' ? 'default' : 'default'} className='mb-2 bg-slate-300 text-black hover:bg-slate-300 mr-3'>Loser</Badge>
                            }
                            <div className='flex'>
                                <div className='flex flex-col items-center justify-center px-2'>
                                    <p className='text-lg font-bold ml-5'>{blackPlayer?.username}</p>
                                    <p>{gameHistory.elo_change_black}</p>
                                </div>
                                <img src="./black-piece.png" className='w-[5rem] h-[5rem] rounded-full' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='text-lg font-bold text-center'>{gameHistory.date_played ? new Date(gameHistory.date_played).toLocaleDateString() : 'Unknown Date'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default gameHistoryCard