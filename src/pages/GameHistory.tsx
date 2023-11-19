import RatingTable from "../components/rating-table"

function GameHistory() {
    return (
        <main className="flex flex-col items-center justify-start pt-10 w-full pl-[15rem]">

            <RatingTable />
            <h1 className="text-3xl min-h-screen pt-10">Game History</h1>

        </main>
    )
}

export default GameHistory