/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * 乐理知识配置
 */
/**
 * 音高Interval数组
 */
var NOTE_LIST = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var NOTE_FALLING_LIST = ['C', 'bD', 'D', 'bE', 'E', 'F', 'bG', 'G', 'bA', 'A', 'bB', 'B'];
var INTERVAL_LIST = ['1', '1#', '2', '2#', '3', '4', '4#', '5', '5#', '6', '6#', '7'];
var INTERVAL_FALLING_LIST = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
var DEFAULT_TUNE = ['E', 'A', 'D', 'G', 'B', 'E'];
/**
 * 品柱数量
 */
var GRADE_NUMS = 16;
/**
 * 弦数量
 */
var STRING_NUMS = 6;
/**
 * 手指品柱跨度
 */
var FINGER_GRADE_NUMS = 4;

/**
 * 和弦乐理配置
 */
/**
 * 和弦分类
 * @ToDo 他妈的转位和弦这种模式好难实现啊
 */
var chordMap = new Map([
    [43, { tag: '', name: 'major triad', constitute: ['1', '3', '5'], name_zh: '大三和弦' }],
    [44, { tag: 'aug', name: 'augmented triad', constitute: ['1', '3', '5#'], name_zh: '增三和弦' }],
    [34, { tag: 'm', name: 'minor triad', constitute: ['1', 'b3', '5'], name_zh: '小三和弦' }],
    [33, { tag: 'dim', name: 'diminished triad', constitute: ['1', 'b3', 'b5'], name_zh: '减三和弦' }],
    [25, { tag: 'sus2', name: 'suspended 2 chord', constitute: ['1', '2', '5'], name_zh: '挂二和弦' }],
    [52, { tag: 'sus4', name: 'suspended 4 chord', constitute: ['1', '4', '5'], name_zh: '挂四和弦' }],
    [437, { tag: 'add9', name: 'addition 9 chord', constitute: ['1', '3', '5', '2'], name_zh: '加九和弦' }],
    [434, { tag: 'maj7', name: 'major seventh chord', constitute: ['1', '3', '5', '7'], name_zh: '大七和弦' }],
    [433, { tag: '7', name: 'seventh chord', constitute: ['1', '3', '5', 'b7'], name_zh: '属七和弦' }],
    [343, { tag: 'm7', name: 'minor seventh chord', constitute: ['1', 'b3', '5', 'b7'], name_zh: '小七和弦' }],
    [334, { tag: 'm7-5' /**'M7b5' */, name: 'half-diminished seventh chord', constitute: ['1', 'b3', 'b5', 'b7'], name_zh: '半减七和弦' }],
    [333, { tag: 'dim7', name: 'diminished seventh chord', constitute: ['1', 'b3', 'b5', '6'], name_zh: '减七和弦' }],
    [344, { tag: 'mM7', name: 'minor major seventh chord', constitute: ['1', 'b3', '5', '7'], name_zh: '小大七和弦' }],
    [443, { tag: 'augM7' /**'M7#5' */, name: 'augmented major seventh chord', constitute: ['1', '3', '5#', '7'], name_zh: '增大七和弦' }],
    [442, { tag: 'aug7' /**'7#5' */, name: 'augmented seventh chord', constitute: ['1', '3', '5#', 'b7'], name_zh: '增属七和弦' }],
    [4343, { tag: 'maj9', name: 'major ninth chord', constitute: ['1', '3', '5', '7', '2'], name_zh: '大九和弦' }],
    [4334, { tag: '9', name: 'ninth chord', constitute: ['1', '3', '5', 'b7', '2'], name_zh: '属九和弦' }],
    [3434, { tag: 'm9', name: 'minor ninth chord', constitute: ['1', 'b3', '5', 'b7', '2'], name_zh: '小九和弦' }],
    [3335, { tag: 'dim9-5', name: 'half-diminished ninth chord', constitute: ['1', 'b3', 'b5', 'b7', '2'], name_zh: '半减九和弦' }],
    [3335, { tag: 'dim9', name: 'diminished ninth chord', constitute: ['1', 'b3', 'b5', '6', '2'], name_zh: '减九和弦' }],
    [4424, { tag: 'aug9', name: 'augmented ninth chord', constitute: ['1', '3', '5#', 'b7', '2'], name_zh: '增三和弦' }],
    [5234, { tag: '9(sus4)', name: 'suspended 4 chord', constitute: ['1', '4', '5', 'b7', '2'], name_zh: '属九挂四和弦' }],
    [4325, { tag: '69', name: 'sixth ninth chord', constitute: ['1', '3', '5', '6', '2'], name_zh: '六九和弦' }],
    [3425, { tag: 'm69', name: 'minor sixth ninth chord', constitute: ['1', 'b3', '5', '6', '2'], name_zh: '小六九和弦' }],
]);
/**
 * 级数分类
 */
var degreeArr = [
    { interval: 0, tag: 'Ⅰ', scale: 'Tonic', roll: 'Do' },
    { interval: 2, tag: 'Ⅱ', scale: 'Supertonic', roll: 'Re' },
    { interval: 4, tag: 'Ⅲ', scale: 'Mediant', roll: 'Mi' },
    { interval: 5, tag: 'Ⅳ', scale: 'Subdominant', roll: 'Fa' },
    { interval: 7, tag: 'Ⅴ', scale: 'Dominant', roll: 'So' },
    { interval: 9, tag: 'Ⅵ', scale: 'Submediant', roll: 'La' },
    { interval: 11, tag: 'Ⅶ', scale: 'Leading Tone', roll: 'Ti' }, // 导，张力最大
];
/**
 * 顺接和弦级数
 * 三和弦/七和弦/九和弦
 */
var chordDegreeMap = new Map([
    [3, [1, 3, 5]],
    [7, [1, 3, 5, 7]],
    [9, [1, 3, 5, 7, 9]],
]);

/**
 * Tone音字符 => 标准Note字符
 * @param x
 * @returns Note
 */
function transNote(x) {
    if (x instanceof Array) {
        return x.map(function (x) { return transNote(x); });
    }
    return isNote(x)
        ? x
        : isNoteFalling(x)
            ? NOTE_LIST[NOTE_FALLING_LIST.indexOf(x)]
            : isInterval(x)
                ? NOTE_LIST[INTERVAL_LIST.indexOf(x)]
                : isIntervalNum(x)
                    ? NOTE_LIST[INTERVAL_LIST.indexOf(x.toString())]
                    : NOTE_LIST[INTERVAL_FALLING_LIST.indexOf(x)];
}
/**
 * Note or NoteIndex => Tone所有类型字符
 * @param note
 * @returns toneSchema
 */
function transTone(note) {
    var index = 0;
    if (typeof note === 'number') {
        index = note;
    }
    else {
        index = NOTE_LIST.findIndex(function (item) { return item === note; });
    }
    return {
        note: NOTE_LIST[index],
        noteFalling: NOTE_FALLING_LIST[index],
        interval: INTERVAL_LIST[index],
        intervalFalling: INTERVAL_FALLING_LIST[index],
    };
}
var isNote = function (x) {
    return NOTE_LIST.includes(x);
};
var isNoteFalling = function (x) {
    return NOTE_FALLING_LIST.includes(x);
};
var isInterval = function (x) {
    return INTERVAL_LIST.includes(x);
};
var isIntervalNum = function (x) {
    return typeof x === 'number';
};

/**
 * 和弦 => 和弦名称
 * @param chords
 */
var getChordType = function (chords) {
    var notes = chords.map(function (chord) { return NOTE_LIST.indexOf(chord); });
    var key = 0;
    for (var index = 1; index < notes.length; index++) {
        var prev = notes[index - 1];
        var curr = notes[index] > prev ? notes[index] : notes[index] + 12;
        var temp = curr - prev;
        key = key * 10 + temp;
    }
    return __assign({ note: chords[0] }, chordMap.get(key));
};
/**
 * 和弦根音 => 和弦
 * @param tone 根音
 * @param chordTypeTag 和弦类型标记（'m'|'aug'|'dim'|...）
 * @returns
 */
var transChord = function (tone, chordTypeTag) {
    if (chordTypeTag === void 0) { chordTypeTag = ''; }
    var note = transNote(tone);
    var chordTypeItem = Array.from(chordMap.entries()).find(function (_a) {
        _a[0]; var value = _a[1];
        return value.tag === chordTypeTag;
    });
    if (!chordTypeItem) {
        return null;
    }
    var key = chordTypeItem[0], chordType = chordTypeItem[1];
    var intervals = [NOTE_LIST.indexOf(note)];
    var intervalNums = key
        .toString()
        .split('')
        .map(function (item) { return parseInt(item); });
    intervalNums.reduce(function (preNum, curNum) {
        var temp = (preNum + curNum) % NOTE_LIST.length;
        intervals.push(temp);
        return temp;
    }, intervals[0]);
    var chord = intervals.map(function (interval) { return NOTE_LIST[interval]; });
    return {
        chord: chord,
        chordType: chordType,
    };
};
/**
 * 大调 => 顺阶和弦
 * @param scale 大调
 * @param chordType 和弦类型 3｜7｜9
 * @returns 大调音阶顺阶和弦 数组
 */
var transScaleDegree = function (scale, chordType) {
    if (scale === void 0) { scale = 'C'; }
    if (chordType === void 0) { chordType = 3; }
    var note = transNote(scale);
    var initIndex = NOTE_LIST.findIndex(function (item) { return item === note; });
    var intervalLength = NOTE_LIST.length;
    var degreeLength = degreeArr.length;
    var chordScale = chordDegreeMap.get(chordType); // 顺阶和弦级数增量
    // 根据大调顺阶degreeArr转换大调
    var degrees = degreeArr.map(function (degree) {
        var curIndex = (initIndex + degree.interval) % intervalLength;
        var toneType = transTone(curIndex);
        return {
            degreeType: degree,
            toneType: toneType,
            chord: [],
            chordType: {},
        };
    });
    // 根据转换的大调获取大调和弦
    degrees.forEach(function (degree, index) {
        degree.chord = chordScale.map(function (scale) { return degrees[(index + scale - 1) % degreeLength].toneType.note; });
        degree.chordType = getChordType(degree.chord);
    });
    return degrees;
};
/**
 * 和弦 => 变调和弦
 * @param chords 和弦音数组
 * @param calGrades 升降度数
 */
var transChordDegree = function (chords, calGrades) {
    var chordNotes = transNote(chords);
    if (calGrades) {
        chordNotes = chordNotes
            .map(function (note) { return NOTE_LIST.indexOf(note); })
            .map(function (tone) { return (tone + calGrades) % NOTE_LIST.length; })
            .map(function (calTone) { return NOTE_LIST[calTone]; });
    }
    return getChordType(chordNotes);
};

/**
 * 便于计算，默认调音一线零品为低音，即
 * 数字 0~11 => 低音 C~B
 * 数字 12~23 => 标音 C~B
 * 数字 24~35 => 高音 C~B
 *
 * 标准调弦吉他：['E', 'A', 'D', 'G', 'B', 'E']
 * 即绝对音高为：[4, 9, 14, 19, 23, 28]
 */
/**
 * 调音 => 绝对音高 (单调递增)
 * @param zeroTones 0品调音
 * @returns pitchs 绝对音高数组
 */
var getAdditionPitchs = function (zeroTones) {
    if (zeroTones === void 0) { zeroTones = DEFAULT_TUNE; }
    var zeroNotes = transNote(zeroTones);
    var pitchs = [NOTE_LIST.indexOf(zeroNotes[0])];
    var upKey = 0;
    for (var index = 1; index < zeroNotes.length; index++) {
        var note = zeroNotes[index];
        var tone = NOTE_LIST.indexOf(note);
        if (tone + upKey * NOTE_LIST.length < pitchs[index - 1]) {
            upKey++;
        }
        pitchs.push(tone + upKey * NOTE_LIST.length);
    }
    return pitchs;
};
/**
 * 0品调音 => 指板二维数组
 * @param zeroGrades 指板0品调音
 * @param GradeLength 指板品数
 * @returns Point[][]
 */
var transBoard = function (zeroTones, GradeLength) {
    if (zeroTones === void 0) { zeroTones = DEFAULT_TUNE; }
    if (GradeLength === void 0) { GradeLength = GRADE_NUMS; }
    var tuneNums = getAdditionPitchs(zeroTones);
    var boardNums = tuneNums.map(function (tune, stringIndex) {
        var stringNums = [];
        for (var grade = 0; grade < GradeLength; grade++) {
            var pitch = tune + grade;
            var string = stringIndex + 1;
            var tone = pitch % NOTE_LIST.length;
            var toneSchema = transTone(tone);
            var index = stringIndex * GradeLength + grade;
            var point = {
                tone: tone,
                pitch: pitch,
                toneSchema: toneSchema,
                string: string,
                grade: grade,
                index: index,
            };
            stringNums[grade] = point;
        }
        return stringNums;
    });
    return boardNums;
};
/**
 * 和弦音名数组 + 指板 => 和弦指法
 * @param chords 和弦音数组
 * @param board 指板数组
 * @param fingerSpan 手指品位跨度
 */
var transChordTaps = function (tones, board, fingerSpan) {
    if (board === void 0) { board = transBoard(); }
    if (fingerSpan === void 0) { fingerSpan = FINGER_GRADE_NUMS; }
    var chords = transNote(tones);
    var root = chords[0]; //当前根音
    var roots = []; // 指板上的所有根音 数组
    var tapsList = []; // 指板上所有的符合的和弦 数组
    // 检索根音位置
    board.forEach(function (grades, stringIndex) {
        // 有几根弦 > 和弦音数
        if (stringIndex > board.length - chords.length) {
            return;
        }
        grades.forEach(function (grade) {
            if (grade.toneSchema.note === root) {
                roots.push(grade);
            }
        });
    });
    /**
     * 递归获取当前弦之后所有符合和弦音的和弦列表
     * @param stringIndex 当前弦下标
     * @param taps 递归当前和弦列表
     */
    var findNextString = function (stringIndex, taps) {
        if (stringIndex >= board.length) {
            tapsList.push(taps);
            return;
        }
        var grades = board[stringIndex];
        grades.forEach(function (grade) {
            if (chords.includes(grade.toneSchema.note)) {
                if (taps.every(function (tap) { return Math.abs(tap.grade - grade.grade) < fingerSpan; })) {
                    findNextString(stringIndex + 1, __spreadArray(__spreadArray([], taps, true), [grade], false));
                }
            }
        });
    };
    // 获取所有根音下的和弦列表
    roots.forEach(function (point) {
        findNextString(point.string, [point]);
    });
    /**
     * 过滤 和弦指法手指按位超过 fingerSpan（正常指法不超过4根手指）
     * @param taps
     */
    var fingersFilter = function (taps) {
        // 最小品位（最小品位超过1，则为横按指法）
        var minGrade = Math.min.apply(Math, taps.map(function (tap) { return tap.grade; }));
        var fingerNums = minGrade > 0 ? 1 : 0;
        taps.forEach(function (tap) {
            if (tap.grade > minGrade) {
                fingerNums++;
            }
        });
        return fingerNums <= fingerSpan;
    };
    /**
     * 过滤 非完整和弦音组成
     * @param taps
     */
    var integrityFilter = function (taps) {
        // const intervals = taps.reduce(
        // 	(unique: Point['toneSchema']['interval'][], tap) =>
        // 		unique.includes(tap.toneSchema.interval) ? unique : [...unique, tap.toneSchema.interval],
        // 	[]
        // )
        var notes = new Set(taps.map(function (tap) { return tap.toneSchema.note; }));
        return notes.size === chords.length;
    };
    /**
     * 排序 根据该和弦品位从低至高
     * @param tapsA
     * @param tapsB
     */
    var gradeSorter = function (tapsA, tapsB) {
        var maxGradeA = Math.max.apply(Math, tapsA.map(function (tap) { return tap.grade; }));
        var maxGradeB = Math.max.apply(Math, tapsB.map(function (tap) { return tap.grade; }));
        return maxGradeA - maxGradeB;
    };
    var chordType = transChordDegree(chords);
    var chordList = tapsList.filter(integrityFilter).filter(fingersFilter).sort(gradeSorter);
    return { chordType: chordType, chordList: chordList };
};

/** @class */ ((function () {
    // chord: Note[] = []
    function Board(zeroTones) {
        if (zeroTones === void 0) { zeroTones = DEFAULT_TUNE; }
        this._board = [];
        this._chords = [];
        this._board = transBoard(zeroTones);
    }
    Object.defineProperty(Board.prototype, "board", {
        get: function () {
            return this._board;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "chords", {
        get: function () {
            return this._chords;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "chordType", {
        get: function () {
            return this._chordType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Board.prototype, "chord", {
        set: function (chord) {
            var _a = transChordTaps(chord), chordType = _a.chordType, chordList = _a.chordList;
            this._chords = chordList;
            this._chordType = chordType;
        },
        enumerable: false,
        configurable: true
    });
    return Board;
})());

export { DEFAULT_TUNE, FINGER_GRADE_NUMS, GRADE_NUMS, INTERVAL_FALLING_LIST, INTERVAL_LIST, NOTE_FALLING_LIST, NOTE_LIST, STRING_NUMS, chordDegreeMap, chordMap, degreeArr, transBoard, transChord, transChordDegree, transChordTaps, transNote, transScaleDegree, transTone };

if(typeof window !== 'undefined') {
  window._Dry_VERSION_ = '0.0.2'
}
//# sourceMappingURL=index.esm.js.map
