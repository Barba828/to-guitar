import { transBoard } from '../src/utils'

describe('Trans', () => {
	test('Trans Methods', () => {
		const board = transBoard()
		expect(typeof board).toBe('object')
	})
})
