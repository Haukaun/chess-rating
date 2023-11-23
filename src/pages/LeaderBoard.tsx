
import RatingTable from '../components/rating-table'

function LeaderBoard() {
    return (
        <main className="flex flex-col items-center justify-start pt-10 w-full pl-[15rem]">
            <div className='w-full max-w-[70%] text-3xl pt-5'>
                <h1 className='text-2xl font-bold text-blue-500'>Leaderboard</h1>
                <div className="w-full pt-10">
                    <RatingTable />
                </div>
            </div>

        </main>
    )
}

export default LeaderBoard