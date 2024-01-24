import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { GameState, Player, Resolution } from './types/types';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameState = computed<GameState>(() => {
    const lastMoved = this.previousPlayer();
    return {
      resolution: lastMoved ? this.checkIfWon(this.getMoves(lastMoved)) : Resolution.InProgress,
      lastMoved
    };
  })

  private xMoves: Set<number> = (new Set());

  private oMoves: Set<number> = (new Set());

  private previousPlayer = signal<Player | null>(null);

  private _currentPlayer = Player.X;

  private readonly winnerCombos: Array<Set<number>> = [
    this.combo([0, 1, 2]),
    this.combo([3, 4, 5]),
    this.combo([6, 7, 8]),
    this.combo([0, 3, 6]),
    this.combo([1, 4, 7]),
    this.combo([2, 5, 8]),
    this.combo([0, 4, 8]),
    this.combo([2, 4, 6]),
  ]

  move(nextMove: number) {
    this.getMoves(this._currentPlayer).add(nextMove);
    this.switchPlayer();
  }

  reset() {
    this.xMoves = new Set();
    this.oMoves = new Set();
    this.previousPlayer.set(null);
    this._currentPlayer = Player.X;;
  }

  private switchPlayer() {
    this.previousPlayer.set(this._currentPlayer);
    this._currentPlayer = (this._currentPlayer == Player.X) ? Player.O : Player.X;
  }

  private getMoves(p: Player) {
    if (p === Player.O) {
      return this.oMoves;
    } else {
      return this.xMoves;
    }
  }

  private checkIfWon(moveSet: Set<number> | undefined): Resolution {
    if (moveSet == undefined) return Resolution.InProgress;
    if (this.winnerCombos.some((winnerCombo) => this.isSubset(winnerCombo, moveSet))) {
      return Resolution.Won
    } else if (this.xMoves.size + this.oMoves.size === 9) {
      return Resolution.Tie
    } else {
      return Resolution.InProgress
    }
  }

  private combo(moves: [number, number, number]): Set<number> {
    return new Set(moves);
  }

  private isSubset(subset: Set<number>, superset: Set<number>): boolean {
    return [...subset].every(element => superset.has(element));
  }
}
