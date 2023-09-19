export interface Player {
  _id: string; // Unique identifier for the player (you may use a different identifier)
  identifier: string;
  name: string;
  amountOfGold: number;
  attack: number;
  hitPoints: number;
  luck: number;
}
