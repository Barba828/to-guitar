import { transBoard, transChordTaps } from '@/index'
import type { ChordType, Note, Point, Tone } from '../interface'
import { DEFAULT_TUNE } from '@/config'

class Board {
	private _board: Point[][] = []
	private _chords: Point[][] = []
	private _chordType?: ChordType[]
	// chord: Note[] = []
	constructor(zeroTones: Tone[] = DEFAULT_TUNE) {
		this._board = transBoard(zeroTones)
	}

	/**
	 * 指板数据
	 */
	get board() {
		return this._board
	}

	/**
	 * 和弦列表
	 */
	get chords() {
		return this._chords
	}

	/**
	 * 和弦类型
	 */
	get chordType() {
		return this._chordType
	}

	set chord(chord: Note[]) {
		const { chordType, chordList } = transChordTaps(chord)
		this._chords = chordList
		this._chordType = chordType
	}

	// setChord(chord: Note[]) {
	// 	const { chordType, chordList } = transChordTaps(chord)
	// 	this.chord = chord
	// 	this._chords = chordList
	// 	this._chordType = chordType
	// }
}

export default Board
