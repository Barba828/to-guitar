/**
 * 和弦根音 => 和弦
 * @param tone 根音
 * @param chordTypeTag 和弦类型标记（'m'|'aug'|'dim'|...）
 * @returns
 */
declare const transChord: (tone: ToneType, chordTypeTag?: string) => {
    chord: Note[];
    chordType: ChordType;
} | null;
/**
 * 大调 => 顺阶和弦
 * @param scale 大调
 * @param chordType 和弦类型 3｜7｜9
 * @returns 大调音阶顺阶和弦 数组
 */
declare const transScaleDegree: (scale?: ToneType, chordType?: ChordDegreeNum) => {
    degreeType: DegreeType;
    toneType: ToneSchema;
    chord: Note[];
    chordType: ChordType;
}[];
/**
 * 和弦 => 变调和弦
 * @param chords 和弦音数组
 * @param calGrades 升降度数
 */
declare const transChordDegree: (chords: ToneType[], calGrades?: number | undefined) => ChordType;

declare function transNote(x: ToneType): Note;
declare function transNote(x: ToneType[]): Note[];
declare function transTone(note: Note): ToneSchema;
declare function transTone(note: number): ToneSchema;

/**
 * 0品调音 => 指板二维数组
 * @param zeroGrades 指板0品调音
 * @param GradeLength 指板品数
 * @returns Point[][]
 */
declare const transBoard: (zeroTones?: ToneType[], GradeLength?: number) => Point[][];
/**
 * 和弦音名数组 + 指板 => 和弦指法
 * @param chords 和弦音数组
 * @param board 指板数组
 * @param fingerSpan 手指品位跨度
 */
declare const transChordTaps: (tones: ToneType[], board?: Point[][], fingerSpan?: number) => {
    chordType: ChordType;
    chordList: Point[][];
};

/**
 * 乐理知识配置
 */
/**
 * 音高Interval数组
 */
declare const NOTE_LIST: Note[];
declare const NOTE_FALLING_LIST: NoteFalling[];
declare const INTERVAL_LIST: Interval[];
declare const INTERVAL_FALLING_LIST: IntervalFalling[];
declare const DEFAULT_TUNE: Note[];
/**
 * 品柱数量
 */
declare const GRADE_NUMS = 16;
/**
 * 弦数量
 */
declare const STRING_NUMS = 6;
/**
 * 手指品柱跨度
 */
declare const FINGER_GRADE_NUMS = 4;

/**
 * 和弦乐理配置
 */
/**
 * 和弦分类
 * @ToDo 他妈的转位和弦这种模式好难实现啊
 */
declare const chordMap: Map<number, ChordType>;
/**
 * 级数分类
 */
declare const degreeArr: DegreeType[];
/**
 * 顺接和弦级数
 * 三和弦/七和弦/九和弦
 */
declare const chordDegreeMap: Map<ChordDegreeNum, number[]>;

export { DEFAULT_TUNE, FINGER_GRADE_NUMS, GRADE_NUMS, INTERVAL_FALLING_LIST, INTERVAL_LIST, NOTE_FALLING_LIST, NOTE_LIST, STRING_NUMS, chordDegreeMap, chordMap, degreeArr, transBoard, transChord, transChordDegree, transChordTaps, transNote, transScaleDegree, transTone };
