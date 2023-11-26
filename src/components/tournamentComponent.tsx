import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';


const matches = [
    {
        "id": 260005,
        "name": "Final - Match",
        "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "4", // Text for Round Header
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "startTime": "", // Date object
        "participants": [
            {
                "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                "resultText": null, // Any string works
                "isWinner": false,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                "name": "giacomo123"
            },
            {
                "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4bd9cc",
                "resultText": "WON",
                "isWinner": true,
                "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                "name": "Håkon"
            }
        ]
    },
    {
        "id": 260004,
        "name": "Semi Final - Match",
        "nextMatchId": 260005,
        "tournamentRoundText": "3",
        "state": "DONE",
        "startTime": "", // Date object
        "participants": [
            {
                "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
                "resultText": "WON",
                "isWinner": false,
                "status": null,
                "name": "giacomo123"
            },
            {
                "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                "resultText": null,
                "isWinner": true,
                "status": null,
                "name": "Ant"
            }
        ]
    },
    {
        "id": 260003,
        "name": "Semi Final - Match",
        "nextMatchId": 260005,
        "tournamentRoundText": "3",
        "state": "DONE",
        "startTime": "", // Date object
        "participants": [
            {
                "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4bd9cc",
                "resultText": "WON",
                "isWinner": false,
                "status": null,
                "name": "Håkon"
            },
            {
                "id": "9ea9ce1a-4794-4553-856c-9a3620c0d531b",
                "resultText": null,
                "isWinner": true,
                "status": null,
                "name": "Sandra"
            }
        ]
    },
]


export const SingleElimination = () => (
    <SingleEliminationBracket
        matches={matches}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
            <SVGViewer width={1000} height={1000} {...props}>
                {children}
            </SVGViewer>
        )}
    />
);