import { transBoard, transChordType, transChord, transScaleDegree, transFifthsCircle } from '@/utils'

describe('Trans', () => {
	test('Trans Methods', () => {
		const board = transBoard()
		// console.log(board.map((item) => item.map((it) => it.toneSchema)))
		expect(typeof board).toBe('object')

		// const circle = transFifthsCircle()
		// console.log(circle)

		const chords = transChordType([7, 5, 2])
		// const chords = transChordType([6, 2, 3], 2)
		console.log(chords)
		// const chordsname = transChord('D', 'sus4')
		// console.log(chordsname)
		// const scale = transScaleDegree({ scale: 'C#' })
		// console.log(scale)

		// expect(chords)
	})
})
