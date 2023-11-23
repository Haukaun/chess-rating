
import GameDialog from "../components/gameDialog"

function GameHistory() {
    return (
        <main className="flex flex-col items-center justify-start pt-10 w-full pl-[15rem] min-h-screen">
            <div className='w-full max-w-[70%] text-3xl flex items-center justify-between mt-5'>
                <h1 className="text-2xl font-bold  text-blue-500">Game History</h1>
                <GameDialog />
            </div>
        </main>
    )
}

export default GameHistory