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
 */
var chordMap = new Map([
    [43, { tag: '', name: 'major triad' }],
    [34, { tag: 'm', name: 'minor triad' }],
    [44, { tag: 'aug', name: 'augmented triad' }],
    [33, { tag: 'dim', name: 'diminished triad' }],
    [433, { tag: '7', name: 'seventh chord' }],
    [434, { tag: 'maj7', name: 'major seventh chord' }],
    [343, { tag: 'm7', name: 'minor seventh chord' }],
    [344, { tag: 'mM7', name: 'minor major seventh chord' }],
    [333, { tag: 'dim7', name: 'diminished seventh chord' }],
    [334, { tag: 'm7-5', name: 'minor major seventh chord' }],
    [442, { tag: '7#5', name: 'minor major seventh chord' }],
    [443, { tag: 'mM7', name: 'minor major seventh chord' }], //增大七和弦
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
 * 便于计算，默认调音一线零品为低音，即
 * 数字 0~11 => 低音 C~B
 * 数字 12~23 => 标音 C~B
 * 数字 24~35 => 高音 C~B
 *
 * 标准调弦吉他：['E', 'A', 'D', 'G', 'B', 'E']
 * 即绝对音高为：[4, 9, 14, 19, 23, 28]
 */
/**
 * 0品调音 转 音高
 * @param zeros 0品调音
 * @returns tuneNumbers 数字音高数组
 */
var getTones = function (zeros) {
    if (zeros === void 0) { zeros = DEFAULT_TUNE; }
    var zeroGrades = transNotes(zeros);
    var tuneNums = [NOTE_LIST.indexOf(zeroGrades[0])];
    var upKey = 0;
    for (var index = 1; index < zeroGrades.length; index++) {
        var tune = zeroGrades[index];
        var nums = NOTE_LIST.indexOf(tune);
        if (nums + upKey * 12 < tuneNums[index - 1]) {
            upKey++;
        }
        tuneNums[index] = nums + upKey * 12;
    }
    return tuneNums;
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
    var zeroGrades = transNotes(zeroTones);
    var tuneNums = getTones(zeroGrades);
    var boardNums = tuneNums.map(function (tune, stringIndex) {
        var stringNums = [];
        for (var grade = 0; grade < GradeLength; grade++) {
            var pitch = tune + grade;
            var string = stringIndex + 1;
            var tone = pitch % NOTE_LIST.length;
            var toneType = transTone(tone);
            var index = stringIndex * GradeLength + grade;
            var point = __assign({ tone: tone, pitch: pitch, string: string, grade: grade, index: index }, toneType);
            stringNums[grade] = point;
        }
        return stringNums;
    });
    return boardNums;
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
 * 和弦音名数组 + 指板 => 和弦指法
 * @param chords 和弦音数组
 * @param points 指板数组
 * @param fingerSpan 手指品位跨度
 */
var transChordTaps = function (tones, points, fingerSpan) {
    if (points === void 0) { points = transBoard(); }
    if (fingerSpan === void 0) { fingerSpan = FINGER_GRADE_NUMS; }
    var chords = transNotes(tones);
    var root = chords[0]; //当前根音
    var roots = []; // 指板上的所有根音 数组
    var tapsList = []; // 指板上所有的符合的和弦 数组
    // 检索根音位置
    points.forEach(function (grades, stringIndex) {
        // 有几根弦 > 和弦音数
        if (stringIndex > points.length - chords.length) {
            return;
        }
        grades.forEach(function (grade) {
            if (grade.note === root) {
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
        if (stringIndex >= points.length) {
            tapsList.push(taps);
            return;
        }
        var grades = points[stringIndex];
        grades.forEach(function (grade) {
            if (chords.includes(grade.note)) {
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
     * 过滤 和弦指法手指按位超过4（正常指法不超过4根手指）
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
        return fingerNums <= 4;
    };
    /**
     * 过滤 非完整和弦音组成
     * @param taps
     */
    var integrityFilter = function (taps) {
        var intervals = taps.reduce(function (unique, tap) { return (unique.includes(tap.interval) ? unique : __spreadArray(__spreadArray([], unique, true), [tap.interval], false)); }, []);
        return intervals.length === chords.length;
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
    var chordType = getChordType(chords);
    var chordList = tapsList.filter(integrityFilter).filter(fingersFilter).sort(gradeSorter);
    return { chordType: chordType, chordList: chordList };
};
/**
 * Tone音字符 => 标准Note字符
 * @param x
 * @returns Note
 */
var transNote = function (x) {
    return isNote(x)
        ? x
        : isNoteFalling(x)
            ? NOTE_LIST[NOTE_FALLING_LIST.indexOf(x)]
            : isInterval(x)
                ? NOTE_LIST[INTERVAL_LIST.indexOf(x)]
                : NOTE_LIST[INTERVAL_FALLING_LIST.indexOf(x)];
};
var transNotes = function (xs) {
    return xs.map(transNote);
};
/**
 * Note or NoteIndex => Tone所有类型字符
 * @param note
 */
var transTone = function (note) {
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
};
var isNote = function (x) {
    return NOTE_LIST.includes(x);
};
var isNoteFalling = function (x) {
    return NOTE_FALLING_LIST.includes(x);
};
var isInterval = function (x) {
    return INTERVAL_LIST.includes(x);
};
/**
 * 大调音阶顺阶和弦
 * @param scale 大调
 * @returns
 */
var transScaleDegree = function (scale) {
    var note = transNote(scale);
    var initIndex = NOTE_LIST.findIndex(function (item) { return item === note; });
    var intervalLength = NOTE_LIST.length;
    var degreeLength = degreeArr.length;
    var chordScale = [0, 2, 4]; // 顺阶和弦级数增量
    var degrees = degreeArr.map(function (degree) {
        var curIndex = (initIndex + degree.interval) % intervalLength;
        var toneType = transTone(curIndex);
        return __assign(__assign({}, toneType), { tag: degree.tag, chord: [], chordType: {} });
    });
    degrees.forEach(function (degree, index) {
        degree.chord = chordScale.map(function (scale) { return degrees[(index + scale) % degreeLength].note; });
        degree.chordType = getChordType(degree.chord);
    });
    return degrees;
};
/**
 * 和弦变调
 * @param chords 和弦
 * @param calGrades 升降半音数
 */
var transChordDegree = function (chords, calGrades) {
    var chordNotes = transNotes(chords);
    var calNotes = chordNotes
        .map(function (note) { return NOTE_LIST.indexOf(note); })
        .map(function (tone) { return tone + calGrades; })
        .map(function (calTone) { return NOTE_LIST[calTone]; });
    return calNotes;
};

export { DEFAULT_TUNE, FINGER_GRADE_NUMS, GRADE_NUMS, INTERVAL_FALLING_LIST, INTERVAL_LIST, NOTE_FALLING_LIST, NOTE_LIST, STRING_NUMS, chordMap, degreeArr, transBoard, transChordDegree, transChordTaps, transNote, transScaleDegree, transTone };

if(typeof window !== 'undefined') {
  window._Dry_VERSION_ = '0.0.1'
}
//# sourceMappingURL=index.esm.js.map
