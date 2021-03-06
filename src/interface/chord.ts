import type { IntervalAll, Note, ToneSchema } from './tone'

export type ChordType = {
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
	constitute?: IntervalAll[]
	/**
	 * 和弦根音名
	 * C|D|...
	 */
	tone?: ToneSchema
	/**
	 * 转位和弦 即实际和弦名称over/note
	 * C/E ("C over E")
	 */
	over?: ToneSchema
}
/**
 * 和弦级数
 */
export type DegreeTag = 'Ⅰ' | 'Ⅱ' | 'Ⅲ' | 'Ⅳ' | 'Ⅴ' | 'Ⅵ' | 'Ⅶ'
export type RollType = 'Do' | 'Di' | 'Ra' | 'Re' | 'Mi' | 'Fa' | 'Fi' | 'Se' | 'So' | 'Si' | 'Le' | 'La' | 'Li' | 'Te' | 'Ti' //现代唱名系统对于升降调的区分
export type ChordDegreeNum = 3 | 7 | 9
export type ModeType = 'major' | 'minor'
export type DegreeType = {
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

export type Chord = {
	degree: DegreeType
	tone: ToneSchema
	chord: Note[]
	chordType: ChordType[]
}
