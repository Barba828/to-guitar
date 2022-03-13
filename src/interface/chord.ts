import type { Interval, IntervalFalling, Note } from './tone'

export declare type ChordType = {
	/**
	 * 和弦标记
	 * dim|aug|...
	 */
	tag: string
	/**
	 * 和弦名称
	 * major triad|...
	 */
	name: string
	/**
	 * 中文和弦名称
	 */
	name_zh: string
	/**
	 * 和弦组成音
	 */
	constitute?: (Interval | IntervalFalling)[]
	/**
	 * 和弦音名
	 * C|D|...
	 */
	note?: Note
}
/**
 * 和弦级数
 */
export declare type ChordDegreeNum = 3 | 7 | 9
export declare type DegreeTag = 'Ⅰ' | 'Ⅱ' | 'Ⅲ' | 'Ⅳ' | 'Ⅴ' | 'Ⅵ' | 'Ⅶ'
export declare type RollType = 'Do' | 'Re' | 'Mi' | 'Fa' | 'So' | 'La' | 'Ti'
export declare type DegreeType = {
	/**
	 * 音程
	 * 距离I级和弦音程
	 */
	interval: number
	/**
	 * 级数
	 * 罗马数字标记
	 */
	tag: DegreeTag
	/**
	 * 级数类型
	 */
	scale: string
	/**
	 * 唱名
	 */
	roll: RollType
}
