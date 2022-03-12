import { NOTE_LIST, chordMap, degreeArr, chordDegreeMap } from 'src/config'
import { transNote, transTone } from './trans-tone'

/**
 * 和弦 => 和弦名称
 * @param chords
 */
const getChordType = (chords: Note[]) => {
	const notes = chords.map((chord) => NOTE_LIST.indexOf(chord))

	let key = 0
	for (let index = 1; index < notes.length; index++) {
		const prev = notes[index - 1]
		const curr = notes[index] > prev ? notes[index] : notes[index] + 12
		const temp = curr - prev
		key = key * 10 + temp
	}

	return {
		note: chords[0],
		...chordMap.get(key),
	} as ChordType
}

/**
 * 和弦根音 => 和弦
 * @param tone 根音
 * @param chordTypeTag 和弦类型标记（'m'|'aug'|'dim'|...）
 * @returns
 */
const transChord = (tone: ToneType, chordTypeTag: string = '') => {
	const note = transNote(tone)
	const chordTypeItem = Array.from(chordMap.entries()).find(([_key, value]) => value.tag === chordTypeTag)
	if (!chordTypeItem) {
		return null
	}

	const [key, chordType] = chordTypeItem
	const intervals = [NOTE_LIST.indexOf(note)]
	const intervalNums = key
		.toString()
		.split('')
		.map((item) => parseInt(item))
	intervalNums.reduce((preNum, curNum) => {
		const temp = (preNum + curNum) % NOTE_LIST.length
		intervals.push(temp)
		return temp
	}, intervals[0])

	const chord = intervals.map((interval) => NOTE_LIST[interval])

	return {
		chord,
		chordType,
	}
}

/**
 * 大调 => 顺阶和弦
 * @param scale 大调
 * @param chordType 和弦类型 3｜7｜9
 * @returns 大调音阶顺阶和弦 数组
 */
const transScaleDegree = (scale: ToneType = 'C', chordType: ChordDegreeNum = 3) => {
	const note = transNote(scale)
	const initIndex = NOTE_LIST.findIndex((item) => item === note)
	const intervalLength = NOTE_LIST.length
	const degreeLength = degreeArr.length
	const chordScale = chordDegreeMap.get(chordType) // 顺阶和弦级数增量

	// 根据大调顺阶degreeArr转换大调
	const degrees = degreeArr.map((degree) => {
		const curIndex = (initIndex + degree.interval) % intervalLength
		const toneType = transTone(curIndex)
		return {
			degreeType: degree,
			toneType,
			chord: [] as Note[], // 顺阶和弦
			chordType: {} as ReturnType<typeof getChordType>,
		}
	})

	// 根据转换的大调获取大调和弦
	degrees.forEach((degree, index) => {
		degree.chord = chordScale!.map((scale) => degrees[(index + scale - 1) % degreeLength].toneType.note)
		degree.chordType = getChordType(degree.chord)
	})
	return degrees
}

/**
 * 和弦 => 变调和弦
 * @param chords 和弦音数组
 * @param calGrades 升降度数
 */
const transChordDegree = (chords: ToneType[], calGrades?: number) => {
	let chordNotes = transNote(chords)
	if (calGrades) {
		chordNotes = chordNotes
			.map((note) => NOTE_LIST.indexOf(note))
			.map((tone) => (tone + calGrades) % NOTE_LIST.length)
			.map((calTone) => NOTE_LIST[calTone])
	}

	return getChordType(chordNotes)
}

export { transChord, transChordDegree, transScaleDegree }
