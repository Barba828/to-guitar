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
 * @param points 指板数组
 * @param fingerSpan 手指品位跨度
 */
declare const transChordTaps: (tones: ToneType[], points?: Point[][], fingerSpan?: number) => {
    chordType: ChordType;
    chordList: Point[][];
};
/**
 * Tone音字符 => 标准Note字符
 * @param x
 * @returns Note
 */
declare const transNote: (x: ToneType) => Note;
/**
 * Note or NoteIndex => Tone所有类型字符
 * @param note
 */
declare const transTone: (note: Note | number) => {
    note: Note;
    noteFalling: NoteFalling;
    interval: Interval;
    intervalFalling: IntervalFalling;
};
/**
 * 大调音阶顺阶和弦
 * @param scale 大调
 * @returns
 */
declare const transScaleDegree: (scale: ToneType) => {
    tag: DegreeTag;
    chord: Note[];
    chordType: ChordType;
    note: Note;
    noteFalling: NoteFalling;
    interval: Interval;
    intervalFalling: IntervalFalling;
}[];
/**
 * 和弦变调
 * @param chords 和弦
 * @param calGrades 升降半音数
 */
declare const transChordDegree: (chords: ToneType[], calGrades: number) => Note[];

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
 */
declare const chordMap: Map<number, ChordType>;
/**
 * 级数分类
 */
declare const degreeArr: DegreeType[];

export { DEFAULT_TUNE, FINGER_GRADE_NUMS, GRADE_NUMS, INTERVAL_FALLING_LIST, INTERVAL_LIST, NOTE_FALLING_LIST, NOTE_LIST, STRING_NUMS, chordMap, degreeArr, transBoard, transChordDegree, transChordTaps, transNote, transScaleDegree, transTone };
