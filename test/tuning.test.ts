import { Board } from '@/index'
import { transBoard, transChordType, transChord, transScaleDegree, transFifthsCircle } from '@/utils'

describe('Trans', () => {
	test('Trans Methods', () => {
		const board = transBoard()
		// console.log(board.map((item) => item.map((it) => it.toneSchema)))
		expect(typeof board).toBe('object')

		// const circle = transFifthsCircle()
		// console.log(circle)

		// const chords = transChordType([7, 5, 2])
		// const chords = transChordType([6, 2, 3], 2)
		// console.log(chords)

		// const chordsname = transChord('D', 'sus4')
		// console.log(chordsname)
		const scale = transScaleDegree({ chordNumType: 9 })
		console.log(scale.map((item) => item.chordType))

		const board2 = new Board((board) => {
			// console.log(
			// 	'lnz',
			// 	board.keyboard.map((item) => item[0].toneSchema.note)
			// )
		})

		// const types = transChordType(['E', 'G', 'B', 'D', 'F#'])
		// // const types = transChordType(['E', 'G#', 'B', 'D#', 'F#'])

		// console.log(types)
	})
})
