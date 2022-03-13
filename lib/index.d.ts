import * as _interface from '@interface';
import { ToneType as ToneType$1, Note as Note$1, ChordType as ChordType$1, ChordDegreeNum as ChordDegreeNum$1, ToneSchema as ToneSchema$1, Point as Point$1, NoteFalling as NoteFalling$1, Interval as Interval$1, IntervalFalling as IntervalFalling$1, DegreeType as DegreeType$1 } from '@interface';

/**
 * 和弦根音 => 和弦
 * @param tone 根音
 * @param chordTypeTag 和弦类型标记（'m'|'aug'|'dim'|...）
 * @returns
 */
declare const transChord: (tone: ToneType$1, chordTypeTag?: string) => {
    chord: Note$1[];
    chordType: ChordType$1;
} | null;
/**
 * 大调 => 顺阶和弦
 * @param scale 大调
 * @param chordType 和弦类型 3｜7｜9
 * @returns 大调音阶顺阶和弦 数组
 */
declare const transScaleDegree: (scale?: ToneType$1, chordType?: ChordDegreeNum$1) => {
    degreeType: _interface.DegreeType;
    toneType: _interface.ToneSchema;
    chord: Note$1[];
    chordType: ChordType$1;
}[];
/**
 * 和弦 => 变调和弦
 * @param chords 和弦音数组
 * @param calGrades 升降度数
 */
declare const transChordDegree: (chords: ToneType$1[], calGrades?: number | undefined) => ChordType$1;

declare function transNote(x: ToneType$1): Note$1;
declare function transNote(x: ToneType$1[]): Note$1[];
declare function transTone(note: Note$1): ToneSchema$1;
declare function transTone(note: number): ToneSchema$1;

/**
 * 0品调音 => 指板二维数组
 * @param zeroGrades 指板0品调音
 * @param GradeLength 指板品数
 * @returns Point[][]
 */
declare const transBoard: (zeroTones?: ToneType$1[], GradeLength?: number) => Point$1[][];
/**
 * 和弦音名数组 + 指板 => 和弦指法
 * @param chords 和弦音数组
 * @param board 指板数组
 * @param fingerSpan 手指品位跨度
 */
declare const transChordTaps: (tones: ToneType$1[], board?: Point$1[][], fingerSpan?: number) => {
    chordType: _interface.ChordType;
    chordList: Point$1[][];
};

/**
 * 乐理知识配置
 */

/**
 * 音高Interval数组
 */
declare const NOTE_LIST: Note$1[];
declare const NOTE_FALLING_LIST: NoteFalling$1[];
declare const INTERVAL_LIST: Interval$1[];
declare const INTERVAL_FALLING_LIST: IntervalFalling$1[];
declare const DEFAULT_TUNE: Note$1[];
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
declare const chordMap: Map<number, ChordType$1>;
/**
 * 级数分类
 */
declare const degreeArr: DegreeType$1[];
/**
 * 顺接和弦级数
 * 三和弦/七和弦/九和弦
 */
declare const chordDegreeMap: Map<ChordDegreeNum$1, number[]>;

declare type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
declare type NoteFalling = 'C' | 'bD' | 'D' | 'bE' | 'E' | 'F' | 'bG' | 'G' | 'bA' | 'A' | 'bB' | 'B';
declare type Interval = '1' | '1#' | '2' | '2#' | '3' | '4' | '4#' | '5' | '5#' | '6' | '6#' | '7';
declare type IntervalFalling = '1' | 'b2' | '2' | 'b3' | '3' | '4' | 'b5' | '5' | 'b6' | '6' | 'b7' | '7';
declare type IntervalNum = 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
 * 音符类型
 */
declare type ToneType = Note | NoteFalling | Interval | IntervalFalling | IntervalNum;
declare type ToneSchema = {
    /**
     * 音名 升调
     * Note #
     */
    note: Note;
    /**
     * 音名 降调
     * interval b
     */
    noteFalling: NoteFalling;
    /**
     * 音程 升调
     * Interval #
     */
    interval: Interval;
    /**
     * 音程 降调
     * Interval b
     */
    intervalFalling: IntervalFalling;
};
declare type Pitch = number;
/**
 * 指板音符位置
 */
declare type Point = {
    /**
     * 相对音高
     * Tone: relative 0～11
     */
    tone: Pitch;
    /**
     * 绝对音高
     * Pitch: absolute 0～∞
     */
    pitch: Pitch;
    /**
     * 音高
     */
    toneSchema: ToneSchema;
    /**
     * 弦位
     * string position
     */
    string: number;
    /**
     * 品位
     * grade position
     */
    grade: number;
    /**
     * 唯一下标
     */
    index: number;
};
/**
 * Point标题类型
 */
declare type PointType = 'note' | 'noteFalling' | 'interval' | 'intervalFalling';

declare type ChordType = {
    /**
     * 和弦标记
     * dim|aug|...
     */
    tag: string;
    /**
     * 和弦名称
     * major triad|...
     */
    name: string;
    /**
     * 中文和弦名称
     */
    name_zh: string;
    /**
     * 和弦组成音
     */
    constitute?: (Interval | IntervalFalling)[];
    /**
     * 和弦音名
     * C|D|...
     */
    note?: Note;
};
/**
 * 和弦级数
 */
declare type ChordDegreeNum = 3 | 7 | 9;
declare type DegreeTag = 'Ⅰ' | 'Ⅱ' | 'Ⅲ' | 'Ⅳ' | 'Ⅴ' | 'Ⅵ' | 'Ⅶ';
declare type RollType = 'Do' | 'Re' | 'Mi' | 'Fa' | 'So' | 'La' | 'Ti';
declare type DegreeType = {
    /**
     * 音程
     * 距离I级和弦音程
     */
    interval: number;
    /**
     * 级数
     * 罗马数字标记
     */
    tag: DegreeTag;
    /**
     * 级数类型
     */
    scale: string;
    /**
     * 唱名
     */
    roll: RollType;
};

export { ChordDegreeNum, ChordType, DEFAULT_TUNE, DegreeTag, DegreeType, FINGER_GRADE_NUMS, GRADE_NUMS, INTERVAL_FALLING_LIST, INTERVAL_LIST, Interval, IntervalFalling, NOTE_FALLING_LIST, NOTE_LIST, Note, NoteFalling, Pitch, Point, PointType, RollType, STRING_NUMS, ToneSchema, ToneType, chordDegreeMap, chordMap, degreeArr, transBoard, transChord, transChordDegree, transChordTaps, transNote, transScaleDegree, transTone };
