import { transBoard } from 'src'
import { DEFAULT_TUNE } from 'src/config'

class Board {
	private _board: Point[][] = []
	private _chords: Point[][] = []
	constructor(zeroTones: ToneType[] = DEFAULT_TUNE) {
		this._board = transBoard(zeroTones)
	}
}

export default Board
