export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
export type NoteFalling = 'C' | 'Db' | 'D' | 'Eb' | 'E' | 'F' | 'Gb' | 'G' | 'Ab' | 'A' | 'Bb' | 'B'
export type Interval = '1' | '1#' | '2' | '2#' | '3' | '4' | '4#' | '5' | '5#' | '6' | '6#' | '7'
export type IntervalFalling = '1' | '2b' | '2' | '3b' | '3' | '4' | '5b' | '5' | '6b' | '6' | '7b' | '7'
type IntervalNum = 1 | 2 | 3 | 4 | 5 | 6 | 7
/**
 * 音符类型
 */
export type Tone = Note | NoteFalling | Interval | IntervalFalling | IntervalNum
/**
 * ToneType名称
 */
export type ToneTypeName = 'note' | 'noteFalling' | 'interval' | 'intervalFalling'
export type ToneSchema = {
	/**
	 * 音名 升调
	 * Note #
	 */
	note: Note
	/**
	 * 音名 降调
	 * Note b
	 */
	noteFalling: NoteFalling
	/**
	 * 音程 升调
	 * Interval #
	 */
	interval: Interval
	/**
	 * 音程 降调
	 * Interval b
	 */
	intervalFalling: IntervalFalling
	/**
	 * 下标
	 */
	index?: number
	/**
	 * 八度高度
	 * C4
	 */
	level?: number
}
export type Pitch = number

/**
 * 指板音符位置
 */
export type Point = {
	/**
	 * 相对音高
	 * Tone: relative 0～11
	 */
	tone: Pitch
	/**
	 * 绝对音高
	 * Pitch: absolute 0～∞
	 */
	pitch: Pitch
	/**
	 * 音高
	 */
	toneSchema: ToneSchema
	/**
	 * 弦位
	 * string position
	 */
	string: number
	/**
	 * 品位
	 * grade position
	 */
	grade: number
	/**
	 * 唯一下标
	 */
	index: number
}
