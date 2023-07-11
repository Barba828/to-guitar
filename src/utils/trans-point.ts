import { DEFAULT_LEVEL, DEFAULT_TUNE, FINGER_GRADE_NUMS, GRADE_NUMS, NOTE_LIST } from '../config'
import type { Tone, Point } from '../interface'
import { transChordType } from './trans'
import { transTone, transNote } from './trans-tone'

/**
 * 便于计算，默认调音一线零品为低音，即
 * 数字 0~11 => 低音 C~B
 * 数字 12~23 => 标音 C~B
 * 数字 24~35 => 高音 C~B
 *
 * 标准调弦吉他：['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
 * 即绝对音高为：[4, 9, 14, 19, 23, 28]
 */

/**
 * 调音 => 绝对音高 (单调递增)
 * @param zeroTones 0品调音
 * @returns pitchs 绝对音高数组
 */
const getAdditionPitchs = (zeroTones: Tone[] = DEFAULT_TUNE) => {
	const zeroNotes = transNote(zeroTones)
	const pitchs = [NOTE_LIST.indexOf(zeroNotes[0])]
	let upKey = 0

	for (let index = 1; index < zeroNotes.length; index++) {
		const note = zeroNotes[index]
		const tone = NOTE_LIST.indexOf(note)

		if (tone + upKey * NOTE_LIST.length < pitchs[index - 1]) {
			upKey++
		}

		pitchs.push(tone + upKey * NOTE_LIST.length)
	}

	return pitchs
}

/**
 * 0品调音 => 指板二维数组
 * @param zeroGrades 指板0品调音
 * @param GradeLength 指板品数
 * @param baseLevel 基准音高
 * @returns Point[][]
 */
const transBoard = (zeroTones: Tone[] = DEFAULT_TUNE, GradeLength: number = GRADE_NUMS, baseLevel: number = DEFAULT_LEVEL) => {
	const zeroPitchs = getAdditionPitchs(zeroTones)

	const boardNums = zeroPitchs.map((zeroPitch, stringIndex) => {
		const stringNums = []
		for (let grade = 0; grade < GradeLength; grade++) {
			const pitch = zeroPitch + grade
			const tone = pitch % NOTE_LIST.length
			const toneSchema = transTone(tone)
			const index = stringIndex * GradeLength + grade
			const level = Math.floor(pitch / NOTE_LIST.length) + baseLevel
			toneSchema.level = level

			const point = {
				tone,
				pitch,
				toneSchema,
				string: stringIndex + 1,
				grade,
				index,
			} as Point

			stringNums[grade] = point
		}
		return stringNums
	})

	return boardNums
}

/**
 * 和弦音名数组 + 指板 => 和弦指法
 * @param chords 和弦音数组
 * @param board 指板数组
 * @param fingerSpan 手指品位跨度
 */
const transChordTaps = (tones: Tone[], board: Point[][] = transBoard(), fingerSpan: number = FINGER_GRADE_NUMS) => {
	const chords = transNote(tones)
	const root = chords[0] //当前根音
	const roots: Point[] = [] // 指板上的所有根音 数组
	const tapsList: Point[][] = [] // 指板上所有的符合的和弦 数组

	// 检索根音位置
	board.forEach((grades, stringIndex) => {
		// 有几根弦 > 和弦音数
		if (stringIndex > board.length - chords.length || stringIndex > 2) {
			// 遍历到四弦返回（一般不参考只有三根弦的和弦）
			return
		}
		grades.forEach((point) => {
			// 根音位置也在第一个八度内（12品）
			if (point.toneSchema.note === root && point.grade < 12) {
				roots.push(point)
			}
		})
	})

	/**
	 * 递归获取当前弦之后所有符合和弦音的和弦列表
	 * @param stringIndex 当前弦下标
	 * @param taps 递归当前和弦列表
	 */
	const findNextString = (stringIndex: number, taps: Point[]) => {
		if (stringIndex >= board.length) {
			tapsList.push(taps)
			return
		}

		// 暂不考虑跳过当前弦选下一根弦的情况
		// findNextString(stringIndex + 1, [...taps])
		const grades = board[stringIndex]
		grades.forEach((point) => {
			if (chords.includes(point.toneSchema.note)) {
				// 若和其他按位品位不超过4，或者该品是0品，则加入指位
				if (taps.every((tap) => Math.abs(tap.grade - point.grade) < fingerSpan) || point.grade === 0) {
					findNextString(stringIndex + 1, [...taps, point])
				}
			}
		})
	}

	// 获取所有根音下的和弦列表
	roots.forEach((point) => {
		findNextString(point.string, [point])
	})

	/**
	 * 过滤 和弦指法手指按位超过 fingerSpan（正常指法不超过4根手指）
	 * 		& 手指不超过 1
	 * 		& 最小品不超过 12 （超过12品重复的八度音高）
	 * @param taps
	 */
	const fingersFilter = (taps: Point[]) => {
		// 最小品位（最小品位超过1，则为横按指法）
		const minGrade = Math.min(...taps.map((tap) => tap.grade))
		let fingerNums = minGrade > 0 ? 1 : 0
		taps.forEach((tap) => {
			if (tap.grade > minGrade) {
				fingerNums++
			}
		})
		return fingerNums <= fingerSpan && fingerNums > 1 && minGrade < 12
	}

	/**
	 * 过滤 非完整和弦音组成
	 * @param taps
	 */
	const integrityFilter = (taps: Point[]) => {
		const notes = new Set(taps.map((tap) => tap.toneSchema.note))
		return notes.size === chords.length
	}

	/**
	 * 排序 根据该和弦品位从低至高
	 * @param tapsA
	 * @param tapsB
	 */
	const gradeSorter = (tapsA: Point[], tapsB: Point[]) => {
		const maxGradeA = Math.max(...tapsA.map((tap) => tap.grade))
		const maxGradeB = Math.max(...tapsB.map((tap) => tap.grade))
		return maxGradeA - maxGradeB
	}

	const chordType = transChordType(chords)
	const chordList = tapsList.filter(integrityFilter).filter(fingersFilter).sort(gradeSorter)

	return { chordType, chordList }
}

export {
	transBoard, // 二维指板数组
	transChordTaps, // 和弦指板位置
}
