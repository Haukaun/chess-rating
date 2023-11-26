import { useState } from "react";
import { Button } from "../shadcn/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../shadcn/components/ui/dialog"

import { supabase } from "../supabase/supabaseClient";
import { Profile } from "../interfaces/profile";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../shadcn/components/ui/select";
import { Separator } from "@radix-ui/react-select";
import { useToast } from "../shadcn/components/ui/use-toast";

interface PlayerProps {
    players: Profile[];
}

function GameDialog(props: PlayerProps) {
    const [selectedWhite, setSelectedWhite] = useState('');
    const [selectedBlack, setSelectedBlack] = useState('');
    const [winner, setWinner] = useState('');

    const { toast } = useToast()

    const currentWhiteElo = props.players?.find(player => player.id === selectedWhite)?.elo;
    const currentBlackElo = props.players?.find(player => player.id === selectedBlack)?.elo;

    function calculateExpectedScore(playerRating: number, opponentRating: number) {
        return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    }

    function getDynamicKFactor(playerRating: number, opponentRating: number) {
        const ratingDifference = Math.abs(playerRating - opponentRating);
        if (ratingDifference >= 400) {
            return 30;
        }
        return 14;
    }

    function updateEloRating(currentRating: number, opponentRating: number, score: number) {
        const kFactor = getDynamicKFactor(currentRating, opponentRating);
        const expectedScore = calculateExpectedScore(currentRating, opponentRating);
        return currentRating + kFactor * (score - expectedScore);
    }

    function calculateEloChanges(whiteRating: number, blackRating: number, winner: string) {
        let scoreWhite, scoreBlack;

        switch (winner) {
            case 'white':
                scoreWhite = 1;
                scoreBlack = 0;
                break;
            case 'black':
                scoreWhite = 0;
                scoreBlack = 1;
                break;
            case 'draw':
                scoreWhite = 0.5;
                scoreBlack = 0.5;
                break;
            default:
                throw new Error("Invalid winner value");
        }

        const newWhiteRating = updateEloRating(whiteRating, blackRating, scoreWhite);
        const newBlackRating = updateEloRating(blackRating, whiteRating, scoreBlack);

        return {
            eloChangeWhite: Math.round(newWhiteRating - whiteRating),
            eloChangeBlack: Math.round(newBlackRating - blackRating)
        }
    }


    async function updatePlayerElo(playerId: string, newElo: number) {
        const { data, error } = await supabase
            .from('profiles')
            .update({ elo: newElo })
            .match({ id: playerId });

        if (error) {
            console.error('Error updating player elo:', error);
            toast({
                title: "Error",
                description: "Error updating profile, please try again later",
                color: "red",
            })
            return null;
        }

        return data;
    }

    async function insertGame(props: GameHistory) {
        const { data, error } = await supabase
            .from('game_history')
            .insert([
                {
                    white_player_id: props.white_player_id,
                    black_player_id: props.black_player_id,
                    winner: props.winner,
                    elo_change_white: props.elo_change_white,
                    elo_change_black: props.elo_change_black
                }
            ]);

        if (error) {
            toast({
                title: "Error",
                description: "Error inserting game, please try again later",
                color: "red",
            })
            console.error('Error inserting game:', error);
            return null;
        }

        return data;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const { eloChangeWhite, eloChangeBlack } = calculateEloChanges(currentWhiteElo as number, currentBlackElo as number, winner);

        if (selectedWhite.length === 0 || selectedBlack.length === 0 || !winner) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select all fields",
            })
            return;
        }

        if (selectedWhite === selectedBlack) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please select different players",
            })
            return;
        }

        await insertGame({
            white_player_id: selectedWhite,
            black_player_id: selectedBlack,
            winner: winner,
            elo_change_white: eloChangeWhite,
            elo_change_black: eloChangeBlack
        });

        await updatePlayerElo(selectedWhite, currentWhiteElo as number + eloChangeWhite);
        await updatePlayerElo(selectedBlack, currentBlackElo as number + eloChangeBlack);

    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add game</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[60rem]">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold ">Add Game</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-evenly pt-3">
                        <div>
                            <div className=" w-full flex items-center justify-center flex-col pb-5 gap-3">
                                <h1>White</h1>
                                <img src="/white-piece.png" className="w-[10rem] rounded-full" alt="White Piece" />
                            </div>
                            <Select onValueChange={(value: string) => {
                                setSelectedWhite(value);
                            }}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select white player" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup >
                                        <SelectLabel>Player</SelectLabel>
                                        {props.players?.map(player => (
                                            <SelectItem key={player.id} value={player.id}>
                                                {player.username}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator className="h-[16rem] w-[1px] bg-gray-300" />
                        <div>
                            <div className=" w-full flex items-center justify-center flex-col pb-5 gap-3">
                                <h1>Black</h1>
                                <img src="/black-piece.png" className="w-[10rem] rounded-full" alt="Black Piece" />
                            </div>
                            <Select onValueChange={(value: string) => {
                                setSelectedBlack(value);
                            }}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select black player" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup >
                                        <SelectLabel>Player</SelectLabel>
                                        {props.players?.map(player => (
                                            <SelectItem key={player.id} value={player.id}>
                                                {player.username}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="text-center my-4 flex flex-col items-center justify-center gap-10 pt-10">
                        <h1>Choose winner or draw:</h1>
                        <div className="flex gap-10 w-full items-center justify-center">
                            <label className="flex flex-col text-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="winner"
                                    value="white"
                                    checked={winner === 'white'}
                                    onChange={() => setWinner('white')}
                                    hidden
                                />
                                <div className="flex items-center justify-center pb-2">
                                    <img src="./white-piece-winner.png" className={`w-[5rem] rounded-full ${winner === 'white' ? 'ring-4 ring-yellow-500' : ''}`} alt="" />
                                </div>
                                White Wins
                            </label>
                            <label className="flex flex-col text-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="winner"
                                    value="draw"
                                    checked={winner === 'draw'}
                                    onChange={() => setWinner('draw')}
                                    hidden
                                />
                                <div className="flex items-center justify-center pb-2">
                                    <img src="./draw.png" className={`w-[5rem] rounded-full ${winner === 'draw' ? 'ring-4 ring-yellow-500' : ''}`} alt="" />
                                </div>
                                Draw
                            </label>
                            <label className="flex flex-col text-md cursor-pointer">
                                <input
                                    type="radio"
                                    name="winner"
                                    value="black"
                                    checked={winner === 'black'}
                                    onChange={() => setWinner('black')}
                                    hidden
                                />
                                <div className="flex items-center justify-center pb-2">
                                    <img src="./black-piece-winner.png" className={`w-[5rem] rounded-full ${winner === 'black' ? 'ring-4 ring-yellow-500' : ''}`} alt="" />
                                </div>
                                Black Wins
                            </label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default GameDialog;
