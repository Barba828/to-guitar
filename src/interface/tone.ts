export declare type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'
export declare type NoteFalling = 'C' | 'bD' | 'D' | 'bE' | 'E' | 'F' | 'bG' | 'G' | 'bA' | 'A' | 'bB' | 'B'
export declare type Interval = '1' | '1#' | '2' | '2#' | '3' | '4' | '4#' | '5' | '5#' | '6' | '6#' | '7'
export declare type IntervalFalling = '1' | 'b2' | '2' | 'b3' | '3' | '4' | 'b5' | '5' | 'b6' | '6' | 'b7' | '7'
type IntervalNum = 1 | 2 | 3 | 4 | 5 | 6 | 7
/**
 * 音符类型
 */
export declare type ToneType = Note | NoteFalling | Interval | IntervalFalling | IntervalNum
export declare type ToneSchema = {
	/**
	 * 音名 升调
	 * Note #
	 */
	note: Note
	/**
	 * 音名 降调
	 * interval b
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
}
export declare type Pitch = number

/**
 * 指板音符位置
 */
export declare type Point = {
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
/**
 * Point标题类型
 */
export declare type PointType = 'note' | 'noteFalling' | 'interval' | 'intervalFalling'
