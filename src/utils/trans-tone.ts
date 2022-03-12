import { NOTE_LIST, NOTE_FALLING_LIST, INTERVAL_LIST, INTERVAL_FALLING_LIST } from 'src/config'

// overload
function transNote(x: ToneType): Note
function transNote(x: ToneType[]): Note[]
/**
 * Tone音字符 => 标准Note字符
 * @param x
 * @returns Note
 */
function transNote(x: ToneType | ToneType[]) {
	if (x instanceof Array) {
		return x.map((x) => transNote(x as ToneType))
	}
	return isNote(x)
		? x
		: isNoteFalling(x)
		? NOTE_LIST[NOTE_FALLING_LIST.indexOf(x)]
		: isInterval(x)
		? NOTE_LIST[INTERVAL_LIST.indexOf(x)]
		: isIntervalNum(x)
		? NOTE_LIST[INTERVAL_LIST.indexOf(x.toString() as Interval)]
		: NOTE_LIST[INTERVAL_FALLING_LIST.indexOf(x)]
}

// overload
function transTone(note: Note): ToneSchema
function transTone(note: number): ToneSchema
/**
 * Note or NoteIndex => Tone所有类型字符
 * @param note
 * @returns toneSchema
 */
function transTone(note: Note | number): ToneSchema {
	let index = 0
	if (typeof note === 'number') {
		index = note
	} else {
		index = NOTE_LIST.findIndex((item) => item === note)
	}
	return {
		note: NOTE_LIST[index],
		noteFalling: NOTE_FALLING_LIST[index],
		interval: INTERVAL_LIST[index],
		intervalFalling: INTERVAL_FALLING_LIST[index],
	}
}

const isNote = (x: any): x is Note => {
	return NOTE_LIST.includes(x)
}
const isNoteFalling = (x: any): x is NoteFalling => {
	return NOTE_FALLING_LIST.includes(x)
}
const isInterval = (x: any): x is Interval => {
	return INTERVAL_LIST.includes(x)
}
const isIntervalNum = (x: any): x is number => {
	return typeof x === 'number'
}
const isIntervalFalling = (x: any): x is IntervalFalling => {
	return INTERVAL_FALLING_LIST.includes(x)
}

export { transTone, transNote }
