import { transBoard, transChordDegree, transChord, transScaleDegree } from '../src/utils'

describe('Trans', () => {
	test('Trans Methods', () => {
		const board = transBoard()
		// console.log(board)
		expect(typeof board).toBe('object')

		// const chords = transChordDegree([6, 2, 3], 2)
		// console.log(chords)
		// const chordsname = transChord('D', 'sus4')
		// console.log(chordsname)
		// const scale = transScaleDegree('E', 7)
		// console.log(scale)

		// expect(chords)
	})
})
