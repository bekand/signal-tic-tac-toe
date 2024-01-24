export enum Player {
	X = "X",
	O = "O"
}

export type GameState = {
	resolution: Resolution,
	lastMoved: Player | null
}

export enum Resolution {
	InProgress,
	Won,
	Tie
}