import type { ChordDegreeNum, ChordType, DegreeType, ModeType } from '../interface'

/**
 * 和弦乐理配置
 */

/**
 * 和弦分类
 */
const chordMap = new Map<number, ChordType>([
	/**
	 * 三和弦
	 */
	[43, { tag: '', name: 'major triad', constitute: ['1', '3', '5'], name_zh: '大三和弦' }],
	[44, { tag: 'aug', name: 'augmented triad', constitute: ['1', '3', '5#'], name_zh: '增三和弦' }],
	[34, { tag: 'm', name: 'minor triad', constitute: ['1', '3b', '5'], name_zh: '小三和弦' }],
	[33, { tag: 'dim', name: 'diminished triad', constitute: ['1', '3b', '5b'], name_zh: '减三和弦' }],
	[25, { tag: 'sus2', name: 'suspended 2 chord', constitute: ['1', '2', '5'], name_zh: '挂二和弦' }],
	[52, { tag: 'sus4', name: 'suspended 4 chord', constitute: ['1', '4', '5'], name_zh: '挂四和弦' }],
	[223, { tag: 'add9', name: 'addition 9 chord', constitute: ['1', '3', '5', '2'], name_zh: '加九和弦' }],
	[412, { tag: 'add11', name: 'addition 11 chord', constitute: ['1', '3', '5', '4'], name_zh: '加十一和弦' }],

	/**
	 * 七和弦
	 */
	[434, { tag: 'maj7', name: 'major seventh chord', constitute: ['1', '3', '5', '7'], name_zh: '大七和弦' }],
	[433, { tag: '7', name: 'seventh chord', constitute: ['1', '3', '5', '7b'], name_zh: '属七和弦' }], //（七和弦） 大七和弦 -> 给7度音一个降号 7b
	[343, { tag: 'm7', name: 'minor seventh chord', constitute: ['1', '3b', '5', '7b'], name_zh: '小七和弦' }], // 属七和弦 -> 给3度音一个降号 3b
	[334, { tag: 'm7b5' /**'m7-5' */, name: 'half-diminished seventh chord', constitute: ['1', '3b', '5b', '7b'], name_zh: '半减七和弦' }], // 小七和弦 -> 给5度音一个降号 5b
	[333, { tag: 'dim7', name: 'diminished seventh chord', constitute: ['1', '3b', '5b', '6'], name_zh: '减七和弦' }], //半减七和弦 -> 给7度音再给一个降号 bb7 （大-属-小-半-减 规律变化）
	[344, { tag: 'mM7', name: 'minor major seventh chord', constitute: ['1', '3b', '5', '7'], name_zh: '小大七和弦' }], // 大七和弦 -> 给3度音一个降号 3b
	[443, { tag: 'augM7' /**'M7#5' */, name: 'augmented major seventh chord', constitute: ['1', '3', '5#', '7'], name_zh: '增大七和弦' }], // 大七和弦 -> 给5度音一个升号 5#
	[442, { tag: 'aug7' /**'7#5' */, name: 'augmented seventh chord', constitute: ['1', '3', '5#', '7b'], name_zh: '增属七和弦' }], // （增七和弦）属七和弦 -> 给5度音一个升号 5#
	[523, { tag: '7sus4', name: 'seventh suspended 4 chord', constitute: ['1', '4', '5', '7b'], name_zh: '属七挂四和弦' }],
	[432, { tag: '6', name: 'sixth chord', constitute: ['1', '3', '5', '6'], name_zh: '大六和弦' }],
	[342, { tag: 'm6', name: 'minor sixth chord', constitute: ['1', '3b', '5', '6'], name_zh: '小六和弦' }],

	/**
	 * 九和弦
	 * 计算复音程真TMD麻烦
	 */
	// 1234 1243
	[2234, { tag: 'maj9', name: 'major ninth chord', constitute: ['1', '3', '5', '7', '2'], name_zh: '大九和弦' }],
	[2233, { tag: '9', name: 'ninth chord', constitute: ['1', '3', '5', '7b', '2'], name_zh: '属九和弦' }],
	[2143, { tag: 'm9', name: 'minor ninth chord', constitute: ['1', '3b', '5', '7b', '2'], name_zh: '小九和弦' }],
	[2133, { tag: 'dim9-5', name: 'half-diminished ninth chord', constitute: ['1', '3b', '5b', '7b', '2'], name_zh: '半减九和弦' }],
	[2133, { tag: 'dim9', name: 'diminished ninth chord', constitute: ['1', '3b', '5b', '6', '2'], name_zh: '减九和弦' }],
	[2144, { tag: 'mM9', name: 'minor major ninth chord', constitute: ['1', '3b', '5', '7', '2'], name_zh: '小大九和弦' }],
	[2243, { tag: 'augM9', name: 'augmented major ninth chord', constitute: ['1', '3', '5#', '7', '2'], name_zh: '增大九和弦' }],
	[2242, { tag: 'aug9', name: 'augmented ninth chord', constitute: ['1', '3', '5#', '7b', '2'], name_zh: '增九和弦' }],
	[2323, { tag: '9sus4', name: 'suspended 4 chord', constitute: ['1', '4', '5', '7b', '2'], name_zh: '属九挂四和弦' }],
	[2232, { tag: '69', name: 'sixth ninth chord', constitute: ['1', '3', '5', '6', '2'], name_zh: '六九和弦' }],
	[2142, { tag: 'm69', name: 'minor sixth ninth chord', constitute: ['1', '3b', '5', '6', '2'], name_zh: '小六九和弦' }],
	// @todo [...]
])

/**
 * 和弦级数分类
 */
const degreeMap = new Map<ModeType, DegreeType[]>([
	[
		'major', // 自然大调
		[
			{ interval: 0, tag: 'Ⅰ', scale: 'Tonic', roll: 'Do' }, // 主，稳定
			{ interval: 2, tag: 'Ⅱ', scale: 'Supertonic', roll: 'Re' }, // 上主
			{ interval: 4, tag: 'Ⅲ', scale: 'Mediant', roll: 'Mi' }, // 中，张力很小
			{ interval: 5, tag: 'Ⅳ', scale: 'Subdominant', roll: 'Fa' }, // 下属，张力模糊
			{ interval: 7, tag: 'Ⅴ', scale: 'Dominant', roll: 'So' }, // 属，张力大而和谐
			{ interval: 9, tag: 'Ⅵ', scale: 'Submediant', roll: 'La' }, // 下中
			{ interval: 11, tag: 'Ⅶ', scale: 'Leading Tone', roll: 'Ti' }, // 导，张力最大
		],
	],
	[
		'minor', // 自然小调
		[
			{ interval: 0, tag: 'Ⅰ', scale: 'Tonic', roll: 'Do' }, // 主
			{ interval: 2, tag: 'Ⅱ', scale: 'Supertonic', roll: 'Re' }, // 上主
			{ interval: 3, tag: 'Ⅲ', scale: 'Mediant', roll: 'Mi' }, // 中
			{ interval: 5, tag: 'Ⅳ', scale: 'Subdominant', roll: 'Fa' }, // 下属
			{ interval: 7, tag: 'Ⅴ', scale: 'Dominant', roll: 'So' }, // 属
			{ interval: 8, tag: 'Ⅵ', scale: 'Submediant', roll: 'Le' }, // 下中 旋律小调 interval = 9, roll = 'La'
			{ interval: 10, tag: 'Ⅶ', scale: 'SubTonic', roll: 'Te' }, // 下主 和声小调/旋律小调 interval = 11, roll = 'Ti' 即为 导音
		],
	],
	// @todo [...]
])

/**
 * 顺接和弦级数
 * 三和弦/七和弦/九和弦
 */
const chordDegreeMap = new Map<ChordDegreeNum, { name: string; interval: number[] }>([
	[
		3,
		{
			name: 'triad',
			interval: [1, 3, 5],
		},
	],
	[
		7,
		{
			name: 'seventh chord',
			interval: [1, 3, 5, 7],
		},
	],
	[
		9,
		{
			name: 'ninth chord',
			interval: [1, 3, 5, 7, 9],
		},
	],
])

export { chordMap, degreeMap, chordDegreeMap }
