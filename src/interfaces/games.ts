/** @format */

interface GameHistory {
  game_id?: string;
  white_player_id: string;
  black_player_id: string;
  winner: string;
  date_played?: Date;
  elo_change_white: number;
  elo_change_black: number;
}
