import { transBoard } from '../src/tuning'

describe('Trans', () => {
	test('Trans Methods', () => {
		const board = transBoard()
		expect(typeof board).toBe('object')
	})
})
