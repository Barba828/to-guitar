/**
 * 乐理知识配置
 */

import type { Note, NoteFalling, Interval, IntervalFalling, ModeType, DegreeTag, IntervalNum } from '../interface'

/**
 * 音高Interval数组
 */
export const NOTE_LIST: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const NOTE_FALLING_LIST: NoteFalling[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
export const INTERVAL_LIST: Interval[] = ['1', '1#', '2', '2#', '3', '4', '4#', '5', '5#', '6', '6#', '7']
export const INTERVAL_FALLING_LIST: IntervalFalling[] = ['1', '2b', '2', '3b', '3', '4', '5b', '5', '6b', '6', '7b', '7']
export const DEFAULT_TUNE: Note[] = ['E', 'A', 'D', 'G', 'B', 'E']
export const DEFAULT_LEVEL = 2
export const NOTE_SORT: Note[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C']
/**
 * 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'
 * https://learningmusic.ableton.com/zh-Hans/advanced-topics/modes.html
 */
export const MODE_LIST: ModeType[] = ['major', 'minor']

export const DEGREE_TAG_MAP: Record<IntervalNum, DegreeTag> = {
	1: 'Ⅰ',
	2: 'Ⅱ',
	3: 'Ⅲ',
	4: 'Ⅳ',
	5: 'Ⅴ',
	6: 'Ⅵ',
	7: 'Ⅶ',
}

// export const SEMITONES_LENGTH = NOTE_LIST.length

/**
 * 品柱数量
 */
export const GRADE_NUMS = 16
/**
 * 弦数量
 */
export const STRING_NUMS = 6
/**
 * 手指品柱跨度
 */
export const FINGER_GRADE_NUMS = 4
