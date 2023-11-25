
import { Card, CardTitle, CardHeader } from "../shadcn/components/ui/card";
import { Badge } from "../shadcn/components/ui/badge";
import { Profile } from '../interfaces/profile';


interface BestPlayersProps {
    players: Profile[];
}

export default function BestPlayers({ players }: BestPlayersProps) {

    const bestPlayers = []

    for (let i = 0; i < 3; i++) {
        if (players[i]) {
            bestPlayers.push(players[i])
        }
    }

    return (
        <section className="w-full">
            <div className="w-full grid justify-center gap-4 text-center lg:gap-10">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl">Leaderboard</h2>
                </div>
                <div className="grid w-full gap-2 md:gap-6 md:grid-cols-3 lg:grid-cols-3">
                    {bestPlayers.map((player, index) => (
                        <Card key={player.id} className={`${index === 0 ? 'bg-yellow-500' : 'bg-secondary'} md:col-start-${index === 0 ? 2 : index === 1 ? 1 : 3} md:row-start-${index === 0 ? 1 : 2} 
                        animate-fade-up 
                        animate-delay-[${index === 0 ? '1000ms' : ''}]`}>
                            <CardHeader className="flex flex-col items-center justify-center space-y-0">
                                <div className="text-center">
                                    <CardTitle className={`${index === 0 ? 'text-white' : 'text-black'} text-sm font-bold`}>{player.username}</CardTitle>
                                    <p className={`${index === 0 ? 'text-white' : 'text-black'} text-lg font-bold`}>Elo: {player.elo}</p>
                                </div>
                                {index === 0 && (
                                    <div className="flex justify-center space-x-2 pb-2">
                                        <IconStar className="text-white" />
                                        <IconCrown className="text-white" />
                                        <IconTrophy className="text-white" />
                                    </div>
                                )}
                                <Badge color="indigo" variant="outline">
                                    {index + 1}
                                </Badge>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}


function IconCrown(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
        </svg>
    )
}


function IconStar(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )
}


function IconTrophy(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    )
}
