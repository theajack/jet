// 18-3-20:
// message 增加30ms延迟 增加hover属性
// jetterjs
//    insertArray(使用原生splice) removeByIndex(支持第二个参数选择删除个数)
//    ajax 请求和 convertData
(function () {
    var C = Jet.__base__;
    C._useList.push('jui');
    var _loadedCall = null;
    var _loaded = false;
    var $J = Jet.$;
    C._JT.tag('head')._JT_findAttr('rel=stylesheet')._JT_each(function (style) {
        if (_loaded == false && style.href._JT_has('jui') && style.href._JT_has('css')) {
            _loaded = true;
        }
    });
    if (!_loaded) {
        var _link = C._JT.ct('link')._JT_attr({
            rel: 'stylesheet',
            href: 'https://www.theajack.com/jet/assets/css/jui.min.css',
        });
        _link.onload = function () {
            if (_loadedCall) {
                _loadedCall();
                _loaded = true;
            }
        };
        C._JT.tag('head')._JT_prepend(_link);
    }

    //* ********calendar-converter.js****************

    // /////////////////////////////////////////////////
    //
    // lunarInfo
    //
    // /////////////////////////////////////////////////

    // base data about chinese year informace
    // 保存公历农历之间的转换信息:以任意一年作为起点，
    // 把从这一年起若干年(依需要而定)的农历信息保存起来。 要保存一年的信息，只要两个信息就够了: 1)农历每个月的大小;2)今年是否有闰月，闰几月以及闰月的大小。 用一个整数来保存这些信息就足够了。 具体的方法是:用一位来表示一个月的大小，大月记为1，小月记为0，
    // 这样就用掉12位(无闰月)或13位(有闰月)，再用高四位来表示闰月的月份，没有闰月记为0。 ※-----例----: 2000年的信息数据是0xc96，化成二进制就是110010010110B，
    // 表示的含义是:1、2、5、8、10、11月大，其余月份小。 2001年的农历信息数据是0x1a95(因为闰月，所以有13位)，
    // 具体的就是1、2、4、5、8、10、12月大， 其余月份小(0x1a95=1101010010101B)，
    // 4月的后面那一个0表示的是闰4月小，接着的那个1表示5月大。 这样就可以用一个数组来保存这些信息。在这里用数组lunarInfo[]来保存这些信息
    var lunarInfo = new Array(
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260,
        0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255,
        0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40,
        0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0,
        0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4,
        0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0,
        0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570,
        0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4,
        0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a,
        0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50,
        0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552,
        0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9,
        0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60,
        0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0,
        0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577,
        0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

    var Gan = new Array('甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸');
    var Zhi = new Array('子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥');
    var Animals = new Array('鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪');
    // TODO is it need to do
    // var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
    var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
    var nStr2 = new Array('初', '十', '廿', '卅', '□');
    // var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
    var cmonthName = new Array('正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '腊');

    // 公历节日 *表示放假日
    var sFtv = new Array(
        '0101*元旦',
        '0214 情人节',
        '0308 妇女节',
        '0312 植树节',
        '0401 愚人节',
        '0422 地球日',
        '0501 劳动节',
        '0504 青年节',
        '0531 无烟日',
        '0601 儿童节',
        '0606 爱眼日',
        '0701 建党日',
        '0707 抗战纪念日',
        '0801 建军节',
        '0910 教师节',
        '0918 九·一八事变纪念日',
        '1001*国庆节',
        '1031 万圣节',
        '1111 光棍节',
        '1201 艾滋病日',
        '1213 南京大屠杀纪念日',
        '1224 平安夜',
        '1225 圣诞节');

    // 某月的第几个星期几。 5,6,7,8 表示到数第 1,2,3,4 个星期几
    var wFtv = new Array(
    // 一月的最后一个星期日（月倒数第一个星期日）
        '0520 母亲节',
        '0630 父亲节',
        '1144 感恩节');

    // 农历节日
    var lFtv = new Array(
        '0101*春节',
        '0115 元宵节',
        '0202 龙抬头',
        '0505 端午节',
        '0707 七夕',
        '0715 中元节',
        '0815 中秋节',
        '0909 重阳节',
        '1208 腊八节',
        '1223 小年',
        '0100*除夕');

    // ====================================== 返回农历 y年的总天数
    function lYearDays (y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
        return (sum + leapDays(y));
    }

    // ====================================== 返回农历 y年的闰月的天数
    function leapDays (y) {
        if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        else return (0);
    }

    // ====================================== 返回农历 y年闰哪个月 1-12，没闰返回 0
    function leapMonth (y) {
        return (lunarInfo[y - 1900] & 0xf);
    }

    // ====================================== 返回农历 y年m月的总天数
    function monthDays (y, m) {
        return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    }

    // ====================================== 算出农历，传入日期对象，返回农历日期日期对象
    // 该对象属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
    function Lunar (date) {
        var objDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var i, leap = 0, temp = 0;
        var baseDate = new Date(1900, 0, 31);
        // Mac和linux平台的firefox在此处会产生浮点数错误
        var offset = Math.round((objDate - baseDate) / 86400000);

        this.dayCyl = offset + 40;
        this.monCyl = 14;

        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = lYearDays(i);
            offset -= temp;
            this.monCyl += 12;
        }

        if (offset < 0) {
            offset += temp;
            i--;
            this.monCyl -= 12;
        }

        this.year = i;
        this.yearCyl = i - 1864;

        leap = leapMonth(i); // 闰哪个月
        this.isLeap = false;

        for (i = 1; i < 13 && offset > 0; i++) {
            // 闰月
            if (leap > 0 && i == (leap + 1) && this.isLeap == false) { --i; this.isLeap = true; temp = leapDays(this.year); }
            else { temp = monthDays(this.year, i); }

            // 解除闰月
            if (this.isLeap == true && i == (leap + 1)) this.isLeap = false;

            offset -= temp;
            if (this.isLeap == false) this.monCyl++;
        }

        if (offset == 0 && leap > 0 && i == leap + 1)
            if (this.isLeap) { this.isLeap = false; }
            else { this.isLeap = true; --i; --this.monCyl; }

        if (offset < 0) { offset += temp; --i; --this.monCyl; }

        this.month = i;
        this.day = offset + 1;
    }

    // /////////////////////////////////////////////////////////
    //
    // lunar 2 solar
    //
    // /////////////////////////////////////////////////////////
    // year .month .day .isLeap .yearCyl .dayCyl .monCyl
    function Solar (date, isLeapMonth) {
        var lyear = date.getFullYear(),
            lmonth = date.getMonth() + 1,
            lday = date.getDate(),
            offset = 0,
            leap = isLeap(lyear);

        // increment year
        for (var i = 1900; i < lyear; i++) {
            offset += lYearDays(i);
        }

        // increment month
        // add days in all months up to the current month
        for (var i = 1; i < lmonth; i++) {
            // add extra days for leap month
            if (i == leapMonth(lyear)) {
                offset += leapDays(lyear);
            }
            offset += monthDays(lyear, i);
        }
        // if current month is leap month, add days in normal month
        if (leap && isLeapMonth) {
            offset += monthDays(lyear, i);
        }

        // increment
        offset += parseInt(lday) - 1;

        var baseDate = new Date(1900, 0, 31);
        var solarDate = new Date(baseDate.valueOf() + offset * 86400000);

        this.year = solarDate.getFullYear();
        this.month = solarDate.getMonth();
        this.day = solarDate.getDate();
        this.isLeap = leap;
    }

    function isLeap (year) {
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    function getAnimalYear (year) {
        return Animals[((year - 1900) % 12)];
    }


    // ============================== 传入 offset 返回干支, 0=甲子
    function cyclical (num) {
        return (Gan[num % 10] + Zhi[num % 12]);
    }
    // ======================================= 返回该年的复活节(春分后第一次满月周后的第一主日)
    // function easter (y) {

    //     var term2 = sTerm(y, 5); // 取得春分日期
    //     var dayTerm2 = new Date(Date.UTC(y, 2, term2, 0, 0, 0, 0)); // 取得春分的公历日期控件(春分一定出现在3月)
    //     var lDayTerm2 = new Lunar(dayTerm2); // 取得取得春分农历

    //     if (lDayTerm2.day < 15) // 取得下个月圆的相差天数
    //         var lMlen = 15 - lDayTerm2.day;
    //     else
    //         var lMlen = (lDayTerm2.isLeap ? leapDays(y) : monthDays(y, lDayTerm2.month)) - lDayTerm2.day + 15;

    //     // 一天等于 1000*60*60*24 = 86400000 毫秒
    //     var l15 = new Date(dayTerm2.getTime() + 86400000 * lMlen); // 求出第一次月圆为公历几日
    //     var dayEaster = new Date(l15.getTime() + 86400000 * (7 - l15.getUTCDay())); // 求出下个周日

    //     this.m = dayEaster.getUTCMonth();
    //     this.d = dayEaster.getUTCDate();

    // }

    // ====================== 中文日期
    function getCDay (d) {
        var s;

        switch (d) {
            case 10:
                s = '初十'; break;
            case 20:
                s = '二十'; break;
            case 30:
                s = '三十'; break;
            default:
                s = nStr2[Math.floor(d / 10)];
                s += nStr1[d % 10];
        }
        return (s);
    }

    // //////////////////////////////////////////////////////////////
    //
    // 24 节气
    //
    // /////////////////////////////////////////////////////////////
    var solarTerm = new Array('小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明',
        '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分',
        '寒露', '霜降', '立冬', '小雪', '大雪', '冬至');

    var solarTermBase = new Array(4, 19, 3, 18, 4, 19, 4, 19, 4, 20, 4, 20, 6, 22, 6, 22, 6, 22, 7, 22, 6, 21, 6, 21);
    var solarTermIdx = '0123415341536789:;<9:=<>:=1>?012@015@015@015AB78CDE8CD=1FD01GH01GH01IH01IJ0KLMN;LMBEOPDQRST0RUH0RVH0RWH0RWM0XYMNZ[MB\\]PT^_ST`_WH`_WH`_WM`_WM`aYMbc[Mde]Sfe]gfh_gih_Wih_WjhaWjka[jkl[jmn]ope]qph_qrh_sth_W';
    var solarTermOS = '211122112122112121222211221122122222212222222221222122222232222222222222222233223232223232222222322222112122112121222211222122222222222222222222322222112122112121222111211122122222212221222221221122122222222222222222222223222232222232222222222222112122112121122111211122122122212221222221221122122222222222222221211122112122212221222211222122222232222232222222222222112122112121111111222222112121112121111111222222111121112121111111211122112122112121122111222212111121111121111111111122112122112121122111211122112122212221222221222211111121111121111111222111111121111111111111111122112121112121111111222111111111111111111111111122111121112121111111221122122222212221222221222111011111111111111111111122111121111121111111211122112122112121122211221111011111101111111111111112111121111121111111211122112122112221222211221111011111101111111110111111111121111111111111111122112121112121122111111011111121111111111111111011111111112111111111111011111111111111111111221111011111101110111110111011011111111111111111221111011011101110111110111011011111101111111111211111001011101110111110110011011111101111111111211111001011001010111110110011011111101111111110211111001011001010111100110011011011101110111110211111001011001010011100110011001011101110111110211111001010001010011000100011001011001010111110111111001010001010011000111111111111111111111111100011001011001010111100111111001010001010000000111111000010000010000000100011001011001010011100110011001011001110111110100011001010001010011000110011001011001010111110111100000010000000000000000011001010001010011000111100000000000000000000000011001010001010000000111000000000000000000000000011001010000010000000';

    // 形式如function sTerm(year, n)，用来计算某年的第n个节气（从0小寒算起）为几号，这也基本被认可为节气计算的基本形式。由于没个月份有两个节气，计算时需要调用两次（n和n+1）
    // ===== 某年的第n个节气为几日（从0小寒起算）
    function sTerm (y, n) {
        return (solarTermBase[n] + Math.floor(solarTermOS.charAt((Math.floor(solarTermIdx.charCodeAt(y - 1900)) - 48) * 24 + n)));
    }
    // ///////////////////////////////////////////////////////////////
    //
    //  calElement model
    //
    // ///////////////////////////////////////////////////////////////

    // ============================== 阴历属性
    function calElement (sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {
    // 瓣句
        this.sYear = sYear;   // 公元年4位数字
        this.sMonth = sMonth;  // 公元月数字
        this.sDay = sDay;    // 公元日数字
        this.week = week;    // 星期, 1个中文
        // 农历
        this.lYear = lYear;   // 公元年4位数字
        this.lMonth = lMonth;  // 农历月数字
        this.lDay = lDay;    // 农历日数字
        this.isLeap = isLeap;  // 是否为农历闰月?
        // 八字
        this.cYear = cYear;   // 年柱, 2个中文
        this.cMonth = cMonth;  // 月柱, 2个中文
        this.cDay = cDay;    // 日柱, 2个中文

        this.lunarDay = getCDay(lDay);
        this.lunarMonth = cmonthName[lMonth - 1];
        this.lunarYear = getAnimalYear(lYear);

        // this.color      = '';

        this.lunarFestival = ''; // 农历节日
        this.solarFestival = ''; // 公历节日
        this.solarTerms = ''; // 节气
    }
    // /////////////////////////////////////////////////////////////
    //
    //  main
    //
    // /////////////////////////////////////////////////////////////
    // date's month should be --, example: 2012-5-21 -> new Date(2012, 4, 21)
    // no matter solar or lunar
    function CalendarConverter () {
        this.solar2lunar = function (date) {
            var sYear = date.getFullYear(),
                sMonth = date.getMonth(),
                sDay = date.getDate(),
                weekDay = nStr1[date.getDay()],
                lunar = new Lunar(date),
                lunarYear = lunar.year,
                lunarMonth = lunar.month,
                lunarDay = lunar.day,
                isLeap = lunar.isLeap;

            return addFstv(sYear, sMonth, sDay, weekDay, lunarYear, lunarMonth, lunarDay, isLeap);
        };

        this.lunar2solar = function (date, isLeapMonth) {
            var lunarYear = date.getFullYear(),
                lunarMonth = date.getMonth() + 1,
                lunarDay = date.getDate(),
                solar = new Solar(date, isLeapMonth),
                sYear = solar.year,
                sMonth = solar.month,
                sDay = solar.day,
                weekDay = nStr1[new Date(sYear, sMonth, sDay).getDay()],
                isLeap = solar.isLeap;
                // cYear, cMonth, cDay, that = {};

            return addFstv(sYear, sMonth, sDay, weekDay, lunarYear, lunarMonth, lunarDay, isLeap);
        };

    }
    function addFstv (sYear, sMonth, sDay, weekDay, lunarYear, lunarMonth, lunarDay, isLeap) {
        var cYear, cMonth, cDay, that = {};
        // //////年柱 1900年立春后为庚子年(60进制36)
        if (sMonth < 2) {
            cYear = cyclical(sYear - 1900 + 36 - 1);
        } else {
            cYear = cyclical(sYear - 1900 + 36);
        }
        var term2 = sTerm(sYear, 2); // 立春日期

        // //////月柱 1900年1月小寒以前为 丙子月(60进制12)
        var firstNode = sTerm(sYear, sMonth * 2); // 返回当月「节」为几日开始
        cMonth = cyclical((sYear - 1900) * 12 + sMonth + 12);

        // 依节气调整二月分的年柱, 以立春为界
        if (sMonth == 1 && sDay >= term2) cYear = cyclical(sYear - 1900 + 36);
        // 依节气月柱, 以「节」为界
        if (sDay >= firstNode) cMonth = cyclical((sYear - 1900) * 12 + sMonth + 13);
        // 当月一日与 1900/1/1 相差天数
        // 1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
        var dayCyclical = Date.UTC(sYear, sMonth, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
        // 日柱
        cDay = cyclical(dayCyclical + sDay - 1);

        // sYear,sMonth,sDay,weekDay,
        // lYear,lMonth,lDay,isLeap,
        // cYear,cMonth,cDay
        that = new calElement(sYear, sMonth + 1, sDay, weekDay, lunarYear, lunarMonth, lunarDay, isLeap, cYear, cMonth, cDay);

        // 节气
        var tmp1 = sTerm(sYear, sMonth * 2) - 1;
        var tmp2 = sTerm(sYear, sMonth * 2 + 1) - 1;
        if (tmp1 == (sDay - 1)) {
            that.solarTerms = solarTerm[sMonth * 2];
        }
        if (tmp2 == (sDay - 1)) {
            that.solarTerms = solarTerm[sMonth * 2 + 1];
        }

        // 公历节日
        for (var i = 0, item; item = sFtv[i]; i++) {
            if (item.match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
                if (Number(RegExp.$1) == (sMonth + 1)) {
                    if (Number(RegExp.$2) == sDay) {
                        that.solarFestival += RegExp.$4 + ' ';
                    }
                }
            }
        }

        // 月周节日
        for (i = 0, item; item = wFtv[i]; i++) {
            if (item.match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {
                if (Number(RegExp.$1) == (sMonth + 1)) {
                    tmp1 = Number(RegExp.$2);
                    tmp2 = Number(RegExp.$3);
                    if (tmp1 < 5) {
                        var wFtvDate = (tmp2 == 0 ? 7 : 0) + (tmp1 - 1) * 7 + tmp2;
                        if (wFtvDate == sDay) {
                            that.solarFestival += RegExp.$5 + ' ';
                            break;
                        }
                    }
                }
            }
        }

        // 农历节日
        for (i = 0, item; item = lFtv[i]; i++) {
            if (item.match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
                tmp1 = Number(RegExp.$1);
                tmp2 = Number(RegExp.$2);
                var lMonLen = monthDays(lunarYear, lunarMonth);
                // 月份是12月，且为最后一天，则设置为春节
                if ((tmp1 == lunarMonth && tmp2 == lunarDay) || (tmp2 == '00' && lunarMonth == 12 && lMonLen == lunarDay)) {
                    that.lunarFestival += RegExp.$4 + ' ';
                    break;
                }
            }
        }

        return that;
    }

    /*
   * example:
   * var cc  =new CalendarConverter;
   *
   * cc.lunar2solar(new Date(2011, 0, 3)); ---> 2010,11,29
   * cc.solar2lunar(new Date(2010, 10, 29)); ----> 2011, 1, 3
   *
   * 农历转公历时，如果那一月是那一年的闰月，则需额外传一个参数，才能得到正确的公历日期
   * cc.solar2lunar(new Date(2012, 4, 27)); ---> 2012年4月初7, 其中 isLeap为true，表示为闰四月
   * cc.lunar2solar(new Date(2012, 3, 7)) ---> 得到错误时间：2012, 4, 27
   * cc.lunar2solar(new Date(2012, 3, 7), true) --> 正确: 2012, 5, 27
   *
   *result:
   *  {
   *    cDay: "戊戌"
        , cMonth: "丁未"
        , cYear: "壬辰"
        , isLeap: false             // 该月是否为闰月
        , lDay: 18
        , lMonth: 6
        , lYear: 2012
        , lunarDay: "十八"
        , lunarFestival: ""
        , lunarMonth: "六"
        , lunarYear: "龙"
        , sDay: 5
        , sMonth: 8
        , sYear: 2012
        , solarFestival: ""         // 节日
        , solarTerms: ""            // 节气
        , week: "日"                // 周几
      }
   *
   */

    /* JUI start**********************************************************************************/
    var _jui_bind = 'jui-bind';
    var _jui_change = 'jui-change';
    var _class_list = ['xl', 'l', 'm', 's', 'xs', 'success', 'normal', 'info', 'warn', 'danger'];
    // SELECT 动态绑定是列表不会改表 **
    // checkbox group 有bug
    // date 没设置初始值会有bug
    // date color 通过value设置初始值没反应

    // color :第一次选择颜色时 左上角不是fff

    function _createEmpty () {
        var a = {};
        a.__proto__ = null;
        return a;
    }
    window.JUI = {
        _jui_mounted: [],
        init: function (item, checkParGroup) {
            _loadedCall = function () {
                JUI.SELECT.init(item);
                // JUI.RADIO.init(item);
                JUI.RADIO_GROUP.init(item, checkParGroup);
                JUI.CHECKBOX_GROUP.init(item, checkParGroup);
                JUI.SWITCH.init(item);
                JUI.DATE.init(item);
                JUI.COLOR.init(item);
                JUI.SLIDER.init(item);
                JUI.DIALOG.init(item);
                JUI.PAGE.init(item);
                JUI.TAB.init(item);
                JUI.SCREEN_DRAG.init(item);
                JUI.CODE.init(item);
                JUI.BTN.init(item);
                JUI.INPUT.init(item);
                JUI.PROGRESS.init(item);
                JUI._jui_mounted.forEach(function (f) {
                    f();
                });
                _loadedCall = null;
            };
            if (_loaded) {
                _loadedCall();
            }
        }, useBind: function (jet) {
            var list = jet._tools._ele.findAttr(_jui_bind);
            // var list=$J.attr(_jui_bind);
            if (list.exist()) {
                JUI._jui_mounted.push(function () {
                    list.each(function (item) {
                        if (item.hasBind !== true) {
                            item.hasBind = true;
                            if (item.hasClass(JUI.RADIO._name) && !JUI.RADIO_GROUP.def_r_group.hasBind) {
                                JUI.RADIO_GROUP.def_r_group.hasBind = true;
                                JUI.RADIO_GROUP.def_r_group.ele.attr(_jui_bind, item.attr(_jui_bind));
                                _useBindSingle({
                                    item: JUI.RADIO_GROUP.def_r_group.ele,
                                    jet: jet,
                                    isDef: true
                                });
                            } else if (item.hasClass(JUI.CHECKBOX._name) && !JUI.CHECKBOX_GROUP.def_c_group.hasBind) {
                                JUI.CHECKBOX_GROUP.def_c_group.hasBind = true;
                                JUI.CHECKBOX_GROUP.def_c_group.ele.attr(_jui_bind, item.attr(_jui_bind));
                                _useBindSingle({
                                    item: JUI.CHECKBOX_GROUP.def_c_group.ele,
                                    jet: jet,
                                    isDef: true,
                                    type: JUI.CHECKBOX._name
                                });
                            } else {
                                _useBindSingle({
                                    item: item,
                                    jet: jet
                                });
                            }
                        }
                    });
                    // $J.attr('disabled').on('click',null);
                    // $J.select('.j-color[disabled] .j-color-icon').on('click',null);
                    // $J.select('.j-date[disabled] .j-date-v').on('click',null).attr('disabled','true');
                    // $J.select('.j-select[disabled] .j-color-icon').on('click',null);
                    JUI._jui_mounted.remove(this);
                });
            }
        }, msg: function (opt, type, time) {
            if (typeof opt !== 'object')
                opt = {text: opt, type: type, time: time};
            new JUI.MESSAGE(opt);
        }, confirm: function (opt, call, type) {
            if (typeof opt == 'string')
                opt = {text: opt, onconfirm: call, type: type};
            new JUI.CONFIRM(opt);
        },
        mounted: function (call) {
            JUI._jui_mounted.push(call);
        },
    };
    function _useBindSingle (opt) {
        var item = opt.item;
        var attr = item.attr(_jui_bind);
        var jet = opt.jet;
        var _jet = (opt.isDef) ? jet : _findJetPar(item, jet);
        if (attr && attr in _jet._tools._calls) {
            var jui = item.$jui;
            var d, cd;
            if (_jet == jet) {
                d = _jet._tools._data;
                cd = _jet;
                // d=_jet;
            } else {
                d = _jet._data[_jet.name];
                cd = _jet.data[_jet.name];
                // d=_jet.data[_jet.name];
            }
            if (item.hasAttr(_jui_change)) {
                jui._onchange = _getCallbackForBind(jet, jui, item.attr(_jui_change));
            }
            var jattr = getValueTxt(item);
            if (d[attr] !== undefined && jui['_' + jattr] !== d[attr]) {
                if (jui.checkValue) {
                    var cv = jui.checkValue(d[attr]);
                    if (cv !== d[attr]) {
                        cd[attr] = cv;
                    }
                }
                jui[jattr] = d[attr];
            }
            _jet._tools._calls[attr]._func.push(function (k, v) {
                if (jui['_' + jattr] !== v && v !== undefined) {
                    if (jui.checkValue) {
                        var cv = jui.checkValue(v);
                        if (cv !== v) {
                            cd[k] = cv;
                            return;
                        }
                    }
                    // if(v!==undefined){
                    jui['_' + jattr] = v;
                    jui.onchange.call(jui);
                }
            });
            _defindJuiBind(_jet, jui, jattr, cd, d, attr);

            _checkExtraBind(item, _jet, jui, cd, d, jet);
            item.removeAttr(_jui_bind);

            item._hasInitJui = true;
            if (item.hasClass(JUI.DIALOG._name)) {
                document.body.append(item);
            }
        }
    // jui[jattr]._jet=(_jet==jet)?_jet:d[attr]._jet
    // Object.defineProperty(_jet.get(),attr,opt);
    }
    function _isDisabled (ele) {
        return (ele.hasAttr('disabled') && ele.attr('disabled') !== 'false');
    }
    function _getCallbackForBind (jet, jui, func) {
        if (func !== '') {
            jui.jet = jet;
            if (func in jet && typeof jet[func] == 'function') {
                return jet[func];
            } else if (window[func] && typeof window[func] == 'function') {
                return window[func];
            } else {
                return new Function('opt', func);
            }
        }
    }
    function _checkExtraBind (item, _jet, jui, cd, d, jet) {
        if (item.hasAttr('jui-page-total')) {
            var attr = item.attr('jui-page-total');
            var jattr = 'total';
            if (d[attr] != undefined && jui['_' + jattr] != d[attr]) {
                jui[jattr] = d[attr];
                jui.onchangetotal.call(jui);
            }
            _jet._tools._calls[attr]._func.push(function (k, v) {
                if (jui['_' + jattr] != v && v != undefined) {
                    jui['_' + jattr] = v;
                    jui.onchangetotal.call(jui);
                }
            });
            _defindJuiBind(_jet, jui, jattr, cd, d, attr);
        }
        if (item.hasAttr('jui-onclose') && item.attr('jui-onclose') !== '') {
            jui._onclose = _getCallbackForBind(jet, jui, item.attr('jui-onclose'));
        }
        if (item.hasAttr('jui-onload') && item.attr('jui-onload') !== '') {
            jui._onload = _getCallbackForBind(jet, jui, item.attr('jui-onload'));
            jui._onload.call(jet);
        }
        if (item.hasAttr('callback') && item.attr('callback') !== '') {
            jui.ele.code_callback = _getCallbackForBind(jet, jui, item.attr('jui-onload'));
        }
    }
    function _defindJuiBind (_jet, jui, jattr, cd, d, attr) {
        Object.defineProperty(jui, jattr, {
            get: function () {
                return d[attr];
            },
            set: function (v) {
                if (typeof d[attr] == 'object') {
                    cd[attr].$replace(v);
                } else {
                    if (jui.checkValue) { v = jui.checkValue(v); }
                    d[attr] = v;
                }
                _jet._tools._calls[attr]._func.forEach(function (f) {
                    f(attr, v);
                });
            },
        });
    }
    function getValueTxt (item) {
        if (item.hasClass(JUI.RADIO._name)) {
            return 'checked';
        } else {
            return 'value';
        }
    }
    JUI.msg.success = function (txt, time) { _msgDefault(txt, time, JUI.MESSAGE.success); };
    JUI.msg.warn = function (txt, time) { _msgDefault(txt, time, JUI.MESSAGE.warn); };
    JUI.msg.error = function (txt, time) { _msgDefault(txt, time, JUI.MESSAGE.error); };
    JUI.msg.info = function (txt, time) { _msgDefault(txt, time, JUI.MESSAGE.info); };
    JUI.msg.close = function () { if (JUI.MESSAGE.msgList.length > 0) JUI.MESSAGE.msgList[0].close(); };
    JUI.msg.isOpen = function () { return (JUI.MESSAGE.msgList.length > 0); };
    JUI.msg.clear = function () {
        JUI.MESSAGE.msgList.forEach(function (m) {
            m.close();
        });
    };
    function _msgDefault (txt, time, type) {
        if (txt === undefined) txt = type;
        if (typeof txt == 'string' || typeof txt == 'number')
            JUI.msg(txt, type, time);
        else {
            txt.type = type;
            JUI.msg(txt);
        }
    }
    JUI.confirm.isOpen = function () {
        return (JUI.CONFIRM.confirmList.length > 0);
    };
    JUI.confirm.clear = function () {
        JUI.CONFIRM.confirmList.forEach(function (c) {
            c.close();
        });
    };
    JUI.confirm.success = function (txt, call) { _confirmDefault(txt, call, JUI.CONFIRM.success); };
    JUI.confirm.warn = function (txt, call) { _confirmDefault(txt, call, JUI.CONFIRM.warn); };
    JUI.confirm.error = function (txt, call) { _confirmDefault(txt, call, JUI.CONFIRM.error); };
    JUI.confirm.info = function (txt, call) { _confirmDefault(txt, call, JUI.CONFIRM.info); };
    JUI.confirm.close = function () { if (JUI.CONFIRM.confirmList.length > 0) JUI.CONFIRM.confirmList[0].close(); };
    function _confirmDefault (txt, call, type) {
        if (typeof txt == 'string')
            JUI.confirm(txt, call);
        else {
            txt.type = type;
            JUI.confirm(txt);
        }
    }
    function _findJetPar (item, jet) {
        var p = item.parent();
        while (p.__jet == undefined && p.tagName != 'BODY') {
            p = p.parent();
        }
        if (p.tagName == 'BODY') {
            return jet;
        }
        return p.__jet;
    }
    function _stopPro (event) {
        var e = arguments[0] || event;
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
    }
    function _throw (txt) {
        throw new Error(txt);
    }
    function getEleList (item, name) {
        if (item) {
            return item.findClass(name);
        } else {
            return $J.cls(name);
        }
    }
    /* SELECT*************************************************************/
    JUI.SELECT = function (opt) {
        this.ele = opt.ele || null;
        this.options = opt.options || {};
        this.onchange = opt.onchange || function () { };
        this._value = opt.value || '';
        this.text = opt.text || '';
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = v;
                _this.onchange.call(_this);
            }
        });
    };
    JUI.SELECT.prototype = _createEmpty();
    JUI.SELECT._name = 'j-select';
    JUI.SELECT.option_txt = 'j-option';
    JUI.SELECT.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                _formatWidthAttr(item);
                var _jui = new JUI.SELECT({ele: item});
                var list = item.child();
                // if(list.length>0){
                var def = list[0];
                var ow = $J.ct('div.j-option-w');
                var vw = $J.ct('div.j-select-vw');
                var v_span = $J.ct('span.j-select-v');
                var icon = $J.ct('i.j-icon.icon-caret-down');
                vw.append([v_span, icon]);
                _jui.onchange = function () {
                    this.text = this.options[this.value];
                    v_span.txt(this.text);
                    item.attr('value', this.value);
                    if (_jui._onchange) {
                        var __t = _jui.jet || _jui;
                        _jui._onchange.call(__t, {
                            ele: item,
                            value: _jui._value,
                            jui: _jui
                        });
                    }
                };
                list.each(function (_item) {
                    _formatIcon(_item);
                    ow.append(_item);
                    // _item.css('visibility','visible');
                    if (_item.hasAttr('default')) {
                        def = _item;
                    }
                    if (_item.hasAttr('disabled')) {
                        _item.addClass('c-disabled');
                    }
                    var val = getVoT(_item);
                    if (val == '') {
                        _throw('SELECT:value值不能设置为空');
                    }
                    _jui.options[val] = getToH(_item);
                    // var val=getVoT(_item);
                    // if(val==''){
                    //     _throw('SELECT:value值不能设置为空');
                    // }
                    // _jui.options[val]=getToH(_item);
                    // if(_item.hasAttr('disabled')){
                    //     _item.addClass('c-disabled').clk(function(){
                    //         _stopPro(event);
                    //     })
                    // }else{
                    //     _item.clk(function(){
                    //         _jui.value=val;
                    //     })
                    // }
                });
                ow.clk(function (e) {
                    var obj = e.target;
                    if (!obj.hasClass('j-option')) { obj = obj.parent(); }
                    if (obj.hasClass('j-option') && !obj.hasClass('c-disabled')) {
                        _jui.value = getVoT(obj);
                    }
                });
                if (def) {
                    _jui.value = getVoT(def);
                }
                item.append([ow, vw]).clk(function () {
                    if (!_isDisabled(this)) {
                        this.child(0).toggleClass('s-open');
                        this.child(1).child(1).toggleClass('s-open');
                    }
                }, true);
                item.$jui = _jui;
                // }else{////绑定数据为[] 的select做特殊处理

                // }

                // if(item.hasAttr('icon')){
                //   item.html('<i class="j-icon icon-'+item.attr('icon')+'"></i>'+item.html());
                //   item.removeAttr('icon')
                // }
                if (item.__jet !== undefined && item.__jet.type === 'Jfor') {// 绑定数据的select做特殊处理
                    item.__jet.originEle = item;
                    item.__jet.ele = item.children[0];
                    item.__jet.__addSelectOption = function (obj, isRemove) {
                        _formatIcon(obj);
                        var val = getVoT(obj);
                        if (isRemove === true) {
                            if (_jui.options[val] === undefined) {
                                delete _jui.options[val];
                            }
                            if (_jui._value === val) {
                                _jui.value = '';
                            }
                        } else {
                            if (_jui.options[val] === undefined) {
                                _jui.options[val] = getToH(obj);
                            }
                            if (ow.child().length === 1) {
                                _jui.value = val;
                            }
                        }
                    };
                }
            }
        });
    };
    function _formatIcon (item) {
        if (item.forEach) {
            item.forEach(function (d) {
                _formatIcon(d);
            });
            return;
        }
        if (item.hasAttr('icon')) {
            item.html('<i class="j-icon icon-' + item.attr('icon') + '"></i>' + item.html());
            item.removeAttr('icon');
        }
    }
    // 获取value或者text或者Html
    var getVoT = function (o) {
        return ((o.hasAttr('value')) ? o.attr('value') : getToH(o));
    };
    // visiable hidden的时候获取不到innerText
    // 获取text或者Html
    var getToH = function (o) {
        if (o.hasAttr('jhtml')) {
            return o.html().trim();
        }
        return ((o.innerText === '') ? o.html() : o.txt()).trim();
    };
    /* MESSAGE**************************************** */
    JUI.MESSAGE = function (opt) {
        this.text = (opt.text === undefined) ? '提示文字为空' : opt.text;
        this.type = opt.type || JUI.MESSAGE.info;
        this.time = opt.time || 2300;
        this.hover = opt.hover || true;
        this.autoClose = opt.autoClose;
        this.call = opt.call || null;
        this.html = opt.html || false;
        this.init();
        this.timer = null;
        if (this.autoClose != false) {
            this.start();
        }
    };
    JUI.MESSAGE.prototype = _createEmpty();
    JUI.MESSAGE.prototype.pause = function () {
        clearTimeout(this.timer);
    }; JUI.MESSAGE.prototype.start = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.close();
        }, this.time);
    }; JUI.MESSAGE.prototype.init = function () {
        var _this = this;
        this.ele = $J.ct('div.j-msg-w.' + this.type);
        var _i = $J.ct('i.j-icon.icon-' + JUI.MESSAGE.res.icon[this.type] + '.j-msg-i');
        var _c = $J.ct('i.j-icon.icon-times.j-msg-close');
        _c.clk(function () {
            _this.close();
        });
        var _t = $J.ct('div.j-msg-txt');
        if (_this.html === true) {
            _t.html(this.text);
        } else {
            _t.txt(this.text);
        }
        this.ele.append([_i, _c, _t]);
        $J.body().append(this.ele);
        JUI.MESSAGE.msgList.push(this);
        setTimeout(function () { _this.ele.addClass('msg-open'); }, 30);
        if (this.hover) {
            _this.ele.onmouseenter = function () {
                _this.pause();
            };
            _this.ele.onmouseleave = function () {
                _this.start();
            };
        }
    }; JUI.MESSAGE.prototype.close = function () {
        this.ele.removeClass('msg-open');
        clearTimeout(this.timer);
        var _this = this;
        setTimeout(function () {
            _this.ele.remove();
            if (_this.call) {
                _this.call();
            }
            JUI.MESSAGE.msgList.splice(JUI.MESSAGE.msgList.indexOf(_this), 1);
        }, 300);
    };
    JUI.MESSAGE.msgList = [];
    JUI.MESSAGE.success = 'success';
    JUI.MESSAGE.warn = 'warn';
    JUI.MESSAGE.error = 'error';
    JUI.MESSAGE.info = 'info';
    JUI.MESSAGE.res = {
        color: {
            success: '#2ac32f',
            warn: '#dfa02b',
            error: '#dc5454',
            info: '#9e9e9e'
        }, icon: {
            success: 'check-circle',
            warn: 'exclamation-sign',
            error: 'remove-sign',
            info: 'info-sign'
        }
    };

    // JUI.msg({
    //     text:'text',
    //     time:2000,
    //     type:'warn',
    //     autoClose:true,
    //     call:function(){console.log('close')},
    // })
    /* CONFIRM***************************************** */
    JUI.CONFIRM = function (opt) {
        this.title = opt.title || '确认框';
        this.text = opt.text || '是否确认该操作？';
        this.type = opt.type || null;
        this.onconfirm = opt.onconfirm || null;
        this.oncancel = opt.oncancel || null;
        this.onclose = opt.onclose || null;
        this.html = opt.html || false;
        this.width = opt.width || null;
        this.init();
    };
    JUI.CONFIRM.prototype = _createEmpty();
    JUI.CONFIRM.prototype.init = function () {
        var _this = this;
        this.ele = $J.ct('div.j-confirm');
        var _close = $J.ct('i.j-confirm-close.j-icon.icon-times');
        var _t = $J.ct('div.j-confirm-t');
        if (this.type != null) {
            _t.addClass(this.type).append($J.ct('i.j-icon.icon-' + JUI.CONFIRM.res.icon[this.type]));
        }
        _t.append($J.ct('span').txt(this.title));
        var _c = $J.ct('div.j-confirm-c');
        if (_this.html === true) {
            _c.html(this.text);
        } else {
            _c.txt(this.text);
        }
        var _b = $J.ct('div.j-confirm-bw');
        var _ok = $J.ct('button.j-confirm-b.j-btn').txt('确定');
        var _cancel = $J.ct('button.j-confirm-b.j-btn.info').txt('取消');
        _b.append([_ok, _cancel]);
        this.ele.append([_close, _t, _c, _b]);
        _close.clk(function () {
            _this.close();
        });
        _ok.clk(function () {
            if (_this.onconfirm) {
                _this.onconfirm();
            }
            _this.close();
        });
        _cancel.clk(function () {
            if (_this.oncancel) {
                _this.oncancel();
            }
            _this.close();
        });
        $J.body().append(this.ele);
        new JUI.SCREEN_DRAG({
            ele: this.ele,
            drag: this.ele,
            type: 'confirm'
        });
        JUI.CONFIRM.confirmList.push(this);
    }; JUI.CONFIRM.prototype.close = function () {
        this.ele.addClass('j-confirm-hide');
        var _this = this;
        if (_this.onclose) {
            _this.onclose();
        }
        setTimeout(function () {
            _this.ele.remove();
            JUI.CONFIRM.confirmList.splice(JUI.CONFIRM.confirmList.indexOf(_this), 1);
        }, 500);
    };
    JUI.CONFIRM.confirmList = [];
    JUI.CONFIRM.success = 'success';
    JUI.CONFIRM.warn = 'warn';
    JUI.CONFIRM.error = 'error';
    JUI.CONFIRM.info = 'info';
    JUI.CONFIRM.res = {
        color: {
            success: '#2ac32f',
            warn: '#dfa02b',
            error: '#dc5454',
            info: '#9e9e9e'
        }, icon: {
            success: 'check-circle',
            warn: 'exclamation-sign',
            error: 'remove-sign',
            info: 'info-sign'
        }
    };

    // JUI.confirm({
    //     title:"title",
    //     text:'text',
    //     type:'warn',
    //     onconfirm:function(){console.log('confirm')},
    //     oncancel:function(){console.log('cancel')},
    //     onclose:function(){console.log('close')},
    // })
    /* RADIO_GROUP************************************************************/
    JUI.RADIO_GROUP = function (opt) {
        this.ele = opt.ele || null;
        this._value = opt.value || '';
        this.onchange = opt.onchange || function () { };
        var _this = this;
        this.radioList = [];
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = v;
                _this.onchange.call(_this);
            }
        });
    };
    JUI.RADIO_GROUP.prototype = _createEmpty();
    JUI.RADIO_GROUP.prototype.removeAll = function () {
        this.value = [];
        this.radioList = [];
    };
    JUI.RADIO_GROUP.prototype.remove = function (i) {
        if (typeof i === 'number') {
            this.radioList.removeByIndex(i);
        } else {
            this.radioList.remove(i);
        }
    };
    JUI.RADIO_GROUP.prototype.clear = function () {
        this.radioList.forEach(function (radio) {
            radio.checked = false;
        });
        this.value = [];
    };
    JUI.RADIO_GROUP._name = 'j-radio-group';
    JUI.RADIO_GROUP.def_r_group = null;
    JUI.RADIO_GROUP.init = function (item, checkParGroup) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                _initOneRadioGroup(item);
            }
        });
        if (checkParGroup === true) {// for循环添加元素的时候
            getEleList(item, JUI.RADIO._name).each(function (item) {
                if (!item._hasInitJui) {
                    JUI.RADIO.init({
                        ele: item,
                        group: _findGroupPar(item, JUI.RADIO_GROUP._name)
                    });
                }
            });
        } else {
            _initOneRadioGroup($J.body(), true);
        }
    };
    function _initOneRadioGroup (item, isBody) {
        if (!isBody && item.findClass(JUI.RADIO_GROUP._name).length > 0) {
            _throw('radio group 不支持嵌套使用');
        }
        var _jui;
        if (isBody) {
            JUI.RADIO_GROUP.def_r_group = new JUI.RADIO_GROUP({ele: $J.ct('div.' + JUI.RADIO_GROUP._name)});
            _jui = JUI.RADIO_GROUP.def_r_group;
            _jui.ele.$jui = _jui;
        } else {
            _jui = new JUI.RADIO_GROUP({ele: item});
            item.$jui = _jui;
        }
        _jui.onchange = function () {
            _jui.ele.attr('value', _jui._value);
            var _c = _jui.radioList.filter(function (item) {
                return item.ele.hasClass('j-checked');
            });
            if (_c.length > 0) _c[0].$checked = false;
            _c = _jui.radioList.filter(function (radio) {
                return radio.value == _jui.value;
            });
            if (_c.length > 0 && _c[0]._checked == false) _c[0].$checked = true;
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };

        var arr = [];
        // if(item.hasClass('aaa'))
        // console.log('aa')

        item.findClass(JUI.RADIO._name).each(function (radio) {
            if (!radio._hasInitJui) {
                var value = getVoT(radio);
                if (arr.indexOf(value) != -1)
                    _throw('同一组 radio 中不允许有相同的value值');
                arr.push(value);
                radio._hasInitJui = true;
                var r_jui = new JUI.RADIO({ele: radio, text: getToH(radio), value: value, group: _jui});
                if (r_jui.checked) {
                    _jui.value = r_jui.value;
                }
            }
        });
    // if(item.hasAttr('checked')&&item.attr('checked')!='false'){
    //     _jui.checked=true;
    // }
    }
    /* RADIO*************************************************************/
    var _jui_type = 'jui-type';
    function _getJuiType (ele) {
        return (ele) ? ele.attr(_jui_type) : null;
    }
    function _checkJUIType (type, value) {
        if (type === null) {
            return value;
        }
        switch (type) {
            case 'bool': return (value === 'true');
            case 'number': return parseFloat(value);
            case 'string': return value.toString();
            default: return value;
        }
    }
    JUI.RADIO = function (opt) {
        this.ele = opt.ele || null;
        this._checked = opt.checked || false;
        this.onchange = opt.onchange || function () { };
        this.text = opt.text || '';
        this.group = opt.group || null;
        this._juiType = _getJuiType(opt.ele);
        this.value = _checkJUIType(this._juiType, opt.value || getVoT(opt.ele));
        var _this = this;
        Object.defineProperties(_this, {
            'checked': {
                configurable: true,
                get: function () {
                    return _this._checked;
                }, set: function (v) {
                    if (typeof v != 'boolean') { _throw('radio.checked只支持布尔类型'); };
                    if (_this._checked != v) {
                        _this._checked = v;
                        if (v == true) {
                            _this.group.value = _this.value;
                        } else {
                            _this.group.value = '';
                        }
                        _this.onchange.call(_this);
                    }
                }
            },
            '$checked': {
                configurable: true,
                get: function () {
                    return _this._checked;
                }, set: function (v) {
                    _this._checked = v;
                    _this.onchange.call(_this);
                }
            }
        });
        this.init();
    };
    JUI.RADIO.prototype = _createEmpty();
    JUI.RADIO.prototype.init = function () {
    // var _jui=new JUI.RADIO({ele:item,text:item.txt(),value:getVoT(item)});
        var _jui = this;
        var item = this.ele;
        _formatIcon(item);
        item.html('<div class="j-radio-cw"><div class="j-radio-c"></div></div>' +
      // '<span class="j-radio-t">'+_jui.text+'</span>');
      '<span class="j-radio-t">' + item.html().trim() + '</span>');
        item.clk(function () {
            if (!_isDisabled(this)) {
                _jui.group.value = _jui.value;
            }
        }, true);
        _jui.onchange = function () {
            if (_jui.checked) {
                _jui.ele.addClass('j-checked');
            } else {
                _jui.ele.removeClass('j-checked');
            }
            _jui.ele.attr('checked', _jui.checked);
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        if (item.hasAttr('checked') && item.attr('checked') != 'false' && this.group.value == '') {
            _jui.checked = true;
            this.group.value == _jui.value;
        } else {
            item.attr('checked', 'false');
        }
        item.$jui = _jui;
        this.group.radioList.push(_jui);
    };
    JUI.RADIO.init = function (opt) {
        if (!opt.ele._hasInitJui) {
            opt.ele._hasInitJui = true;
            var group = opt.group || JUI.RADIO_GROUP.def_r_group;
            new JUI.RADIO({
                ele: opt.ele,
                text: getToH(opt.ele),
                group: group
            });
        }
    };
    JUI.RADIO._name = 'j-radio';
    /* CHECKBOX_GROUP************************************************************/
    JUI.CHECKBOX_GROUP = function (opt) {
        this.ele = opt.ele || null;
        this._value = opt.value || [];
        this.onchange = opt.onchange || function () { };
        var _this = this;
        this.checkList = [];
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = v;
                _this.onchange.call(_this);
            }
        });


    // 需重新定义 没有jet框架时的属性
    };
    JUI.CHECKBOX_GROUP.prototype = _createEmpty();
    JUI.CHECKBOX_GROUP.prototype.selectAll = function () {
        this.checkList.forEach(function (check) {
            check.checked = true;
        });
        return this.value;
    };
    JUI.CHECKBOX_GROUP.prototype.clear = function () {
        this.checkList.forEach(function (check) {
            check.checked = false;
        });
        this.value = [];
    };
    JUI.CHECKBOX_GROUP.prototype.remove = function (i) {
        if (typeof i === 'number') {
            this.checkList.removeByIndex(i);
        } else {
            this.checkList.remove(i);
        }
    };
    JUI.CHECKBOX_GROUP.prototype.removeAll = function () {
        this.value = [];
        this.checkList = [];
    };
    JUI.CHECKBOX_GROUP._name = 'j-checkbox-group';
    JUI.CHECKBOX_GROUP.def_c_group = null;
    JUI.CHECKBOX_GROUP.init = function (item, checkParGroup) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                _initOneCheckGroup(item);
            }
        });
        if (checkParGroup === true) {// for循环添加元素的时候
            getEleList(item, JUI.CHECKBOX._name).each(function (item) {
                if (!item._hasInitJui) {
                    JUI.CHECKBOX.init({
                        ele: item,
                        group: _findGroupPar(item, JUI.CHECKBOX_GROUP._name)
                    });
                }
            });
        } else {
            _initOneCheckGroup($J.body(), true);
        }
    };
    function _findGroupPar (ele, name) {
        var p = ele.parent();
        while (!p.hasClass(name) && p.tagName != 'BODY') {
            p = p.parent();
        }
        if (p.tagName == 'BODY') {
            return null;// 在init 方法中，如果group是null，会使用默认的group
        }
        return p.$jui;
    }
    function _initOneCheckGroup (item, isBody) {
        if (!isBody && item.findClass(JUI.CHECKBOX_GROUP._name).length > 0) {
            _throw('checkbox group 不支持嵌套使用');
        }
        var _jui;
        if (isBody) {
            if (JUI.CHECKBOX_GROUP.def_c_group === null) {
                JUI.CHECKBOX_GROUP.def_c_group = new JUI.CHECKBOX_GROUP({ele: $J.ct('div.' + JUI.CHECKBOX_GROUP._name)});
            }
            _jui = JUI.CHECKBOX_GROUP.def_c_group;
            _jui.ele.$jui = _jui;
        } else {
            _jui = new JUI.CHECKBOX_GROUP({ele: item});
            item.$jui = _jui;
        }
        _jui.onchange = function () {
            _jui.ele.attr('value', _jui._value.toString());
            _jui.checkList.forEach(function (ele) {
                if (_jui.value.has(ele.value)) {
                    if (ele._checked == false) ele.$checked = true;
                } else {
                    if (ele._checked == true) ele.$checked = false;
                }
            });
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        item.findClass(JUI.CHECKBOX._name).each(function (check) {
            if (!check._hasInitJui) {
                check._hasInitJui = true;
                var r_jui = new JUI.CHECKBOX({ele: check, text: getToH(check), group: _jui});
                if (r_jui.checked) {
                    _jui.value.push(r_jui.value);
                }
            }
        });
    // if(item.hasAttr('checked')&&item.attr('checked')!='false'){
    //     _jui.checked=true;
    // }
    }
    /* CHECKBOX*************************************************************/
    JUI.CHECKBOX = function (opt) {
        this.ele = opt.ele || null;
        this._checked = opt.checked || false;
        this.onchange = opt.onchange || function () { };
        this.text = opt.text || '';
        this.group = opt.group || null;
        this._juiType = _getJuiType(opt.ele);
        this.value = _checkJUIType(this._juiType, opt.value || getVoT(opt.ele));
        var _this = this;
        Object.defineProperties(_this, {
            'checked': {
                configurable: true,
                get: function () {
                    return _this._checked;
                }, set: function (v) {
                    if (typeof v != 'boolean') _throw('checkbox.checked只支持布尔类型');
                    if (_this._checked != v) {
                        _this._checked = v;
                        if (v) {
                            if (!_this.group.value.has(_this.value)) {
                                _this.group.value.push(_this.value);
                            }
                        } else {
                            if (_this.group.value.has(_this.value)) {
                                _this.group.value.removeByIndex(_this.group.value.indexOf(_this.value));
                            }
                        }
                        _this.onchange.call(_this);
                    }
                }
            }, '$checked': {
                configurable: true,
                get: function () {
                    return _this._checked;
                }, set: function (v) {
                    _this._checked = v;
                    _this.onchange.call(_this);
                }
            }
        });
        this.init();
    };
    JUI.CHECKBOX.prototype = _createEmpty();
    JUI.CHECKBOX.prototype.init = function () {
    // var _jui=new JUI.CHECKBOX({ele:item,text:item.txt(),value:getVoT(item)});
        var _jui = this;
        var item = this.ele;
        _formatIcon(item);
        item.html('<div class="j-checkbox-cw"><i class="j-icon icon-check j-checkbox-c"></i></div>' +
      // '<span class="j-checkbox-t">'+_jui.text+'</span>');
      '<span class="j-checkbox-t">' + item.html().trim() + '</span>');

        item.clk(function () {
            if (!_isDisabled(this)) {
                var arr = _jui.group._value.clone();
                if (arr.has(_jui.value)) arr.remove(_jui.value);
                else arr.push(_jui.value);
                _jui.group.value = arr;
            }
        }, true);
        _jui.onchange = function () {
            if (_jui.checked) {
                _jui.ele.addClass('j-checked');
            } else {
                _jui.ele.removeClass('j-checked');
            }
            _jui.ele.attr('checked', _jui.checked);
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        if (item.hasAttr('checked') && item.attr('checked') != 'false' && this.group.value == '') {
            _jui.checked = true;
            this.group.value == _jui.value;
        } else {
            item.attr('checked', 'false');
        }
        item.$jui = _jui;
        this.group.checkList.push(_jui);
    };
    JUI.CHECKBOX.init = function (opt) {
        if (!opt.ele._hasInitJui) {
            opt.ele._hasInitJui = true;
            var group = opt.group || JUI.CHECKBOX_GROUP.def_c_group;
            new JUI.CHECKBOX({
                ele: opt.ele,
                group: group
            });
        }
    };
    JUI.CHECKBOX._name = 'j-checkbox';
    /* SWITCH****************************************** */
    JUI.SWITCH = function (opt) {
        this.ele = opt.ele || null;
        this._value = opt.value || false;
        this.onchange = opt.onchange || function () { };
        this._juiType = _getJuiType(this.ele);
        this.value = _checkJUIType(this._juiType, opt.value || '');
        this._valueList = opt._valueList || [];
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                v = _checkJUIType(_this._juiType, v);
                if (_this._valueList.has(v) && v != _this.value) {
                    _this._value = v;
                    _this.onchange();
                }
            }
        });
        this.init();
    };
    JUI.SWITCH.prototype = _createEmpty();
    JUI.SWITCH.prototype.init = function () {
    // var _jui=new JUI.SWITCH({ele:item,text:item.txt(),value:getVoT(item)});
        var _jui = this;
        var item = this.ele;
        var _width = null;
        var child = item.child();
        var _on_t, _off_t;
        var _circle = $J.ct('div.j-switch-c');
        _formatWidthAttr(item, function (w) {
            _width = w;
            if (item.hasClass('j-s-on')) {
                _circle.css('left', (w - _circle.wid() - 2) + 'px');
            }
        });
        var open = function () {
            item.addClass('j-s-on');
            if (_width != null) {
                _circle.css('left', (_width - _circle.wid() - 2) + 'px');
            }
        };
        var close = function () {
            item.removeClass('j-s-on');
            if (_width != null) {
                _circle.css('left', '1px');
            }
        };
        if (child.length > 1) {
            if (child.length > 2) {
                _throw('switch 组件只能有两个元素');
            }
            var v = getVoT(child[0]);
            if (v === '') v = true;
            this._valueList.push(v);
            _on_t = $J.ct('div.j-switch-t.j-st-on').txt(getToH(child[0])).attr('value', v);
            v = getVoT(child[1]);
            if (v === '') v = false;
            if (this._valueList[0] == v) _throw('switch 两个元素值不能相等');
            this._valueList.push(v);
            this._value = v;
            _off_t = $J.ct('div.j-switch-t.j-st-off').txt(getToH(child[1])).attr('value', v);
            if (child[0].hasAttr('icon')) {
                _on_t.attr('icon', child[0].attr('icon'));
            }
            if (child[1].hasAttr('icon')) {
                _off_t.attr('icon', child[1].attr('icon'));
            }
            var hasChecked = child[0].hasAttr('checked');
            item.empty();
            item.append([_on_t, _off_t, _circle]);
            if (hasChecked) {
                open();
                this._value = this._valueList[0];
            }
        } else {
            item.empty();
            this._valueList = [true, false];
            this._value = false;
            _on_t = $J.ct('div.j-switch-t.j-st-on').attr('value', 'true');
            _off_t = $J.ct('div.j-switch-t.j-st-off').attr('value', 'false');
            this._valueList = [true, false];
            item.append([_on_t, _off_t, _circle]);
            if (item.hasAttr('on')) {
                this._value = true;
                open();
                item.removeAttr('on');
            }
        }
        _formatIcon([_on_t, _off_t]);
        item.attr('value', this._value);
        item.clk(function () {
            if (!_isDisabled(item)) {
                if (_jui._valueList.indexOf(_jui._value) == 0) {
                    _jui.value = _jui._valueList[1];
                } else {
                    _jui.value = _jui._valueList[0];
                }
            }
        }, true);
        _jui.onchange = function () {
            if (_jui._valueList.indexOf(_jui._value) == 0) {
                open();
            } else {
                close();
            }
            item.attr('value', _jui._value);
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        item.$jui = _jui;
    };
    JUI.SWITCH._name = 'j-switch';
    JUI.SWITCH.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.SWITCH({ele: item});
            }
        });
    };
    /* DATE*********************** */
    JUI.DATE = function (opt) {
        var d = new Date();
        this.today = d;
        this.ele = opt.ele || null;
        this.needTime = false;
        this.detail = (this.ele.attr('jui-date-detail') === 'true');// 是否显示农历以及节日信息
        this._time = {h: 0, m: 0, s: 0};
        if (opt.ele.attr('jui-date-time') === 'true') {
            this.needTime = true;
        }
        if (!opt.value) {
            var value = this.ele.attr('value');
            if (value === null) {
                opt.value = _dateToStr(d);
                if (this.needTime) {
                    opt.value += ' 00:00:00';
                }
            } else {
                opt.value = value;
            }
        }
        this._value = opt.value || '';
        this.onchange = opt.onchange || function () { };
        this._date = _dateToJson(d);
        var _this = this;
        this.max = this.ele.attr('jui-date-max');
        this.min = this.ele.attr('jui-date-min');
        if (this.max === 'today') {
            this.max = strToDateJson(_dateToStr(d));
        } else if (typeof this.max === 'string') {
            this.max = strToDateJson(this.max);
        }
        if (this.min === 'today') {
            this.min = strToDateJson(_dateToStr(d));
        } else if (typeof this.min === 'string') {
            this.min = strToDateJson(this.min);
        }
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = v;
                _this.onchange();
            }
        });
        this.init();
    };
    JUI.DATE.prototype = _createEmpty();
    JUI.DATE.prototype.init = function () {
    // var _jui=new JUI.DATE({ele:item,text:item.txt(),value:getVoT(item)});
        var _jui = this;
        var item = this.ele;
        var _w = $J.ct('div.j-date-allw');
        var _close = $J.ct('i.j-icon.icon-times.j-date-close');
        var _d = $J.ct('div.j-date-w');
        var _dt = $J.ct('div.j-date-t.j-clearfix');
        var _dty = $J.ct('div.j-date-ty');
        var _dtyil = $J.ct('i.j-icon.icon-angle-left.j-date-icon');
        var _d_year = $J.ct('input.j-date-input[attr=text][value=' + this._date.year + ']');
        var _dtyir = $J.ct('i.j-icon.icon-angle-right.j-date-icon');
        _dty.append([_dtyil, _d_year, _dtyir]);
        var _dtm = $J.ct('div.j-date-ty');
        var _dtmil = $J.ct('i.j-icon.icon-angle-left.j-date-icon');
        var _d_month = $J.ct('input.j-date-input[attr=text][value=' + fixNum(this._date.month) + ']');
        var _dtmir = $J.ct('i.j-icon.icon-angle-right.j-date-icon');
        _dtm.append([_dtmil, _d_month, _dtmir]);
        _dtyil.clk(function () {
            var year = parseInt(_d_year.val()) - 1, month = parseInt(_d_month.val());
            _dtyil.next().val(year);

            resetDayList(_jui, _sw, year, month,
                (year == _jui._date.year && month == _jui._date.month)
                , _d_year, _d_month, true);
        });
        _dtyir.clk(function () {
            var year = parseInt(_d_year.val()) + 1, month = parseInt(_d_month.val());
            _dtyir.prev().val(year);
            resetDayList(_jui, _sw, year, month,
                (year == _jui._date.year && month == _jui._date.month)
                , _d_year, _d_month, true);
        });
        _dtmil.clk(function () {
            var year = parseInt(_d_year.val()), month = parseInt(_d_month.val());
            month = (month <= 1) ? 12 : month - 1;
            _dtmil.next().val(fixNum(month));
            resetDayList(_jui, _sw, year, month,
                (year == _jui._date.year && month == _jui._date.month)
                , _d_year, _d_month, true);
        });
        _dtmir.clk(function () {
            var year = parseInt(_d_year.val()), month = parseInt(_d_month.val());
            month = (month > 11) ? 1 : month + 1;
            _dtmir.prev().val(fixNum(month));
            resetDayList(_jui, _sw, year, month,
                (year == _jui._date.year && month == _jui._date.month)
                , _d_year, _d_month, true);
        });
        _d_year.on('input', function () {
            if (/^([12]\d{3})$/.test(this.val())) {
                var year = parseInt(this.val()), month = parseInt(_d_month.val());
                resetDayList(_jui, _sw, year, month,
                    (year == _jui._date.year && month == _jui._date.month)
                    , _d_year, _d_month, true);
            }
        });
        _d_month.on('input', function () {
            var month = parseInt(this.val());
            if (month > 0 && month < 13) {
                var year = parseInt(_d_year.val());
                resetDayList(_jui, _sw, year, month,
                    (year == _jui._date.year && month == _jui._date.month)
                    , _d_year, _d_month, true);
                this.val(fixNum(month));
            }
        });
        _dt.append([_dty, _dtm]);

        var _dw = $J.ct('div.j-date-dw.j-clearfix');
        ['日', '一', '二', '三', '四', '五', '六'].forEach(function (name) {
            _dw.append($J.ct('div.j-date-di').txt(name));
        });
        var _sw = $J.ct('div.j-date-sw.j-clearfix');
        var _d_today = $J.ct('div.j-date-today').txt('今:' + _dateToStr(_jui.today));
        _d_today.on({
            click: function () {
                if (_isInRange(_jui, _jui.today) === true) {
                    _chooseAdate(_dateToJson(_jui.today), _jui, this.prev());
                } else {
                    JUI.msg.warn('选择的日期超过了限制的范围');
                }
            },
            mouseenter: function () {
                var d = _dateToJson(_jui.today);
                _jui.showDetail(d.day, d.year, d.month);
            }, mouseleave: function () {
                _jui.hideDetail();
            }
        });
        // resetDayList(_jui,_sw,this._date.year,this._date.month,true,_d_year,_d_month);
        _d.append([_dt, _dw, _sw, _d_today]);
        _formatWidthAttr(item, function () {
            _w.css({'width': '100%', left: '0'});
        });
        if (this.detail === true) {
            var _detail = $J.ct('div.j-date-detail');
            var _converter = new CalendarConverter();

            _jui.showDetail = function (day, year, month) {
                _detail.empty();
                year = year || _d_year.val();
                month = parseInt(month || _d_month.val());
                var d = _converter.solar2lunar(new Date(year, month - 1, day));
                var txt = [];
                txt.push('<div>' + year + '年' + month + '月' + day + '日 周' + d.week + '</div>');
                var fes = '';
                if (d.solarFestival !== '') {
                    fes += d.solarFestival + ' ';
                }
                if (d.lunarFestival !== '') {
                    fes += d.lunarFestival;
                }
                if (fes !== '') {
                    txt.push('<div><span>节日: </span>' + fes + '</div>');
                }
                txt.push('<div class="j-date-no-b"><span>农历:</span><br>' + d.lYear + '(' + d.lunarYear + ')年' + d.lunarMonth + '月' + d.lunarDay + '</div>');
                txt.push('<div></div>');
                txt.push('<div>[' + d.cYear + '年' + d.cMonth + '月' + d.cDay + '日]</div>');
                if (d.solarTerms !== '') {
                    txt.push('<div><span>节气: </span>' + d.solarTerms + '</div>');
                }
                _detail.html(txt.join(''));
                _detail.show();
            };
            _jui.hideDetail = function () {
                _detail.hide();
            };
            _d.append(_detail);
        }

        _w.append([_d, _close]);
        var _time_dreg = /^((0[0-9])|(1[0-9])|(2[0-3])):([0-5][0-9]):([0-5][0-9])$/;
        if (this.needTime) {
            var _t = $J.ct('div.j-time-w');
            var _t_tw = $J.ct('div.j-tt-w');
            var _t_t_info = $J.ct('div.j-tt-info.j-clearfix');
            _t_t_info.append([$J.ct('div').txt('时'), $J.ct('div').txt('分'), $J.ct('div').txt('秒')]);
            _t_tw.append([$J.ct('div').txt('选择时间'), _t_t_info]);
            var _t_cw = $J.ct('div.j-tc-w.j-clearfix');
            var _hour = $J.ct('div.j-ti-w');
            for (var i = 0; i < 24; i++) {
                _hour.append($J.ct('div').txt(fixNum(i)));
            }
            var _min = $J.ct('div.j-ti-w');
            for (var i = 0; i < 60; i++) {
                _min.append($J.ct('div').txt(fixNum(i)));
            }
            var _sec = $J.ct('div.j-ti-w');
            for (var i = 0; i < 60; i++) {
                _sec.append($J.ct('div').txt(fixNum(i)));
            }
            _t_cw.append([_hour, _min, _sec]);
            _t_cw.child().clk(function (e) {
                var time = e.target.txt();
                this.attr('value', time);
                this.findClass('j-active').removeClass('j-active');
                e.target.addClass('j-active');
                switch (this.index()) {
                    case 0: _jui._time.h = parseInt(time); break;
                    case 1: _jui._time.m = parseInt(time); break;
                    case 2: _jui._time.s = parseInt(time); break;
                }
                _jui.value = _jui._value.split(' ')[0] + ' ' + fixNum(_jui._time.h) + ':' + fixNum(_jui._time.m) + ':' + fixNum(_jui._time.s);
            });
            var _t_bw = $J.ct('div.j-tb-w');
            var _t_back = $J.ct('button.j-btn.info.xs').txt('返回日期');
            _t_back.clk(function () {
                resetDayList(_jui, _sw, _jui._date.year, _jui._date.month, true, _d_year, _d_month);
                _t.hide();
                _d.show();
            });
            var _t_now = $J.ct('button.j-btn.xs').txt('现在');
            _t_now.clk(function () {
                var d = new Date();
                _jui._date = _dateToJson(d);
                _jui._time = {
                    h: d.getHours(),
                    m: d.getMinutes(),
                    s: d.getSeconds()
                };
                _jui._value = _dateToStr(_jui._date);
                _jui.setTime(fixNum(_jui._time.h) + ':' + fixNum(_jui._time.m) + ':' + fixNum(_jui._time.s));
            });
            var _t_confirm = $J.ct('button.success.j-btn.xs').txt('确定');
            _t_confirm.clk(function () {
                _jui.close();
            });
            _t_bw.append([_t_back, _t_now, _t_confirm]);
            _t.append([_t_tw, _t_cw, _t_bw]);
            _w.append(_t);
            _jui.setTime = function (v) {
                if (!_time_dreg.test(v)) {
                    return;
                }
                var arr = v.split(':');
                _jui._time = {h: parseInt(arr[0]), m: parseInt(arr[1]), s: parseInt(arr[2])};
                _jui.value = _jui._value.split(' ')[0] + ' ' + v;
                _t_cw.findClass('j-active').removeClass('j-active');
                _hour.attr('value', arr[0]).child(_jui._time.h).addClass('j-active');
                _hour.scrollTop = _jui._time.h * 22;
                _min.attr('value', arr[1]).child(_jui._time.m).addClass('j-active');
                _min.scrollTop = _jui._time.m * 22;
                _sec.attr('value', arr[2]).child(_jui._time.s).addClass('j-active');
                _sec.scrollTop = _jui._time.s * 22;
            };
            _jui.showTime = function () {
                _t.show();
                _d.hide();
                _jui.setTime(_jui._value.split(' ')[1]);
            };
        }
        var _dv = $J.ct('input.j-date-v[type=text]');// [readonly=true]
        item.append([_w, _dv]);
        var _dreg = /^(([12]\d{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|3(0|1))))$/;
        _jui.onchange = function () {
            var value = _jui._value;
            var d = new Date();
            if (d.getDate() !== _jui.today.getDate()) {
                _jui.today = d;
                _d_today.txt('今:' + _dateToStr(d));
            }
            var r = _isInRange(_jui, strToDateJson(_jui._value));
            if (r !== true) {
                if (r === '1') {
                    _jui._value = _dateToStr(_jui.max);
                } else if (r === '-1') {
                    _jui._value = _dateToStr(_jui.min);
                }
                if (_jui.needTime) {
                    _jui._value += (' ' + value.split(' ')[1]);
                }
                value = _jui._value;
                _jui.value = _jui._value;
            }
            if (_dreg.test(_getDate(value)) && _time_dreg.test(_getTime(value))) {
                if (_jui.isFromInput !== true) {
                    _dv.val(value);
                } else {
                    _jui.isFromInput = false;
                }
                item.attr('value', value);
                if (_jui._onchange) {
                    var __t = _jui.jet || _jui;
                    _jui._onchange.call(__t, {
                        ele: item,
                        value: value,
                        jui: _jui
                    });
                }
            } else {
                // _throw('DATE 格式错误：请修改为xxxx-xx-xx')

            }
        };
        item.$jui = _jui;
        if (_isDisabled(item)) {
            _dv.attr('readonly', 'true');
        }
        _dv.clk(function () {
            if (!_isDisabled(item)) {
                _dv.removeAttr('readonly');
                if (!item.hasClass('j-active')) {
                    _w.css('display', 'block');
                    if (_d.css('display') === 'none') {
                        _d.show();
                        _t.hide();
                    }
                    setTimeout(function () { item.addClass('j-active'); }, 30);
                    if (!_dreg.test(_getDate(_jui._value))) {
                        resetDayList(_jui, _sw, _jui._date.year, _jui._date.month, true, _d_year, _d_month);
                    } else {
                        var _val_d = strToDateJson(_jui._value);
                        resetDayList(_jui, _sw, _val_d.year, _val_d.month,
                            (_val_d.year == _jui._date.year && _val_d.month == _jui._date.month)
                            , _d_year, _d_month);
                    }
                }
            } else {
                _dv.attr('readonly', 'true');
            }
        }, true);
        _dv.oninput = function () {
            if (_dreg.test(_getDate(this.val())) && _time_dreg.test(_getTime(this.val()))) {
                this.css('color', '#222');
                if ((_isInRange(_jui, strToDateJson(this.val())) === true)) {
                    _jui.isFromInput = true;
                }
                _jui.value = this.val();
                if (_jui.needTime && _d.css('display') === 'none') {
                    _jui.setTime(_getTime(_jui._value));
                } else {
                    var _val_d = strToDateJson(_jui._value);
                    resetDayList(_jui, _sw, _val_d.year, _val_d.month,
                        (_val_d.year == _jui._date.year && _val_d.month == _jui._date.month)
                        , _d_year, _d_month);
                }
            } else {
                this.css('color', '#d44');
            }
        };
        _close.clk(function () {
            _jui.close();
        });
        this.value = this._value;
    }; JUI.DATE.prototype.close = function () {
        if (this.ele.hasClass('j-active')) {
            var _this = this;
            this.ele.removeClass('j-active');
            setTimeout(function () { _this.ele.child(0).css('display', 'none'); }, 300);
            this.ele.child(1).css('cursor', 'pointer');
        }
    };
    JUI.DATE._name = 'j-date';
    JUI.DATE.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.DATE({ele: item});
            }
        });
    };
    function _getDate (v) {
        return (v.has(' ')) ? v.split(' ')[0] : v;
    }
    function _getTime (v) {
        return (v.has(' ')) ? v.split(' ')[1] : '00:00:00';
    }
    function _dateToStr (date) {
        var d = date || new Date();
        if (d.getFullYear) {
            return d.getFullYear() + '-' + fixNum(d.getMonth() + 1) + '-' + fixNum(d.getDate());
        } else {
            return d.year + '-' + fixNum(d.month) + '-' + fixNum(d.day);
        }
    }
    function _dateToJson (date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }
    function strToDateJson (v) {
        var _dreg = /^(([12]\d{3}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|3(0|1))))$/;
        if (_dreg.test(_getDate(v))) {
            var arr = v.split('-');
            return {
                year: parseInt(arr[0]),
                month: parseInt(arr[1]),
                day: parseInt(arr[2])
            };
        }
        return {};
    }
    function fixNum (d) { return (d < 10) ? '0' + d : d; };
    function _isInRange (jui, year, month, day) {
        var d;
        if (typeof year === 'object') {
            if (year.getFullYear) {
                d = year;
            } else {
                d = new Date(year.year, year.month - 1, year.day);
            }
        } else {
            d = new Date(year, month - 1, day);
        }
        if (jui.max === null && jui.min === null) {
            return true;
        }
        if (jui.max !== null && new Date(jui.max.year, jui.max.month - 1, jui.max.day) < d) {
            return '1';
        }
        if (jui.min !== null && new Date(jui.min.year, jui.min.month - 1, jui.min.day) > d) {
            return '-1';
        }
        return true;
    }
    function resetDayList (_jui, ele, year, month, isCur, _d_year, _d_month, bool) {
        var isCurM = false;
        ele.empty();
        var d = strToDateJson(_jui._value);
        getAllDaysList(year, month).forEach(function (day) {
            if (day == 1 && !isCurM) {
                isCurM = true;
            } else if (day == 1 && isCurM) {
                isCurM = false;
            }
            var range = (_isInRange(_jui, year, month, day) === true);
            var item;
            if (isCurM && range) {
                item = $J.ct('div.j-date-si' +
          ((isCur && day == _jui.today.getDate()) ? '.j-date-current' : '') +
          ((d.year == year && d.month == month && d.day == day) ? '.j-active' : '')).txt(day).clk(function () {
                    _chooseAdate({
                        year: parseInt(_d_year.val()),
                        month: parseInt(_d_month.val()),
                        day: day
                    }, _jui, this.parent());
                });
            } else {
                if (!bool) {
                    _d_year.val(d.year);
                    _d_month.val(fixNum(d.month));
                }
                item = $J.ct('div.j-date-si.j-disabled').txt(day);
                if (!range && isCurM) {
                    item.addClass('j-date-overflow').clk(function () {
                        JUI.msg.warn('选择的日期超过了限制的范围');
                    });
                }
            }
            if (isCurM && _jui.detail === true) {
                item.on({
                    mouseenter: function () {
                        _jui.showDetail(day);
                    }, mouseleave: function () {
                        _jui.hideDetail();
                    }
                });
            }
            ele.append(item);
        });
    }
    function _chooseAdate (d, _jui, sw) {
        _jui._date = d;
        var date = _dateToStr(_jui._date);
        sw.findClass('j-active').removeClass('j-active');
        if (_jui.needTime) {
            _jui.showTime();
            _jui.value = date + ' ' + _jui._value.split(' ')[1];
        } else {
            _jui.value = date;
            _jui.close();
        }
    }
    function getAllDaysList (year, month) {
        var list = [];
        var first = getFirstDay(year, month);// 第一天是星期几，上一个月剩余几天
        var days = getDays(year, month);
        var lastDays = (month == 1) ? getDays(year - 1, 12) : getDays(year, month - 1);
        for (var i = lastDays - first + 1; i <= lastDays; i++) {
            list.push(i);
        }
        for (var i = 1; i <= days; i++) {
            list.push(i);
        }
        var lastDay = getLastDay(year, month);
        for (var i = 1; i <= 6 - lastDay; i++) {
            list.push(i);
        }
        return list;
    }
    function getDays (year, month) {
        return new Date(year, month, 0).getDate();
    }
    function getLastDay (year, month) {
        return new Date(year, month, 0).getDay();
    }
    function getFirstDay (year, month) {
        return new Date(year, month - 1, 1).getDay();
    }
    // function getCurrentDay () {
    //     return new Date().getDate();
    // }


    /* DRAG*********************************** */
    JUI.DRAG = function (opt) {
        this.ele = opt.ele;
        this.par = opt.par || this.ele.parent();
        this._w = this.ele.wid() / 2;
        this._h = this.ele.hei() / 2;
        this.x = opt.x || -this._w;
        this.y = opt.y || -this._h;
        this.mode = opt.mode || 'xy';
        this.onchange = opt.onchange || function () { };
        this.init();
    };
    JUI.DRAG.prototype = _createEmpty();
    JUI.DRAG.prototype.init = function () {
        var _this = this;
        this.setPosition();
        this.par.on('mousedown', function (ev) {
            var oEvent = ev || event;
            var pw = _this.par.wid();
            var ph = _this.par.hei();
            var ew = _this.ele.wid();
            var eh = _this.ele.hei();

            var o = _this.par.getBoundingClientRect();
            _this.x = oEvent.clientX - o.left;
            _this.y = oEvent.clientY - o.top;

            // _this.x=oEvent.layerX;
            // _this.y=oEvent.layerY;
            _this.setPosition();
            var disX = oEvent.clientX - _this.ele.offsetLeft; // 鼠标的X坐标减去DIV的左边距就等于disX, 这个disXs是用于确定鼠标移动DIV时鼠标点和DIV之间的左面距离，这个距离是不会变的，通过这个新鼠标的X坐标减去disX就是DIV的Left
            var disY = oEvent.clientY - _this.ele.offsetTop; // 鼠标的Y坐标减去DIV的左边距就等于disY, 这个disY是用于确定鼠标移动DIV时鼠标点和DIV之间的上面距离，这个距离是不会变的，通过这个新鼠标的Y坐标减去disY就是DIV的Top
            _this.par.onmousemove = function (ev) {// 为了防止鼠标移动太快而离开了DIV产生了bug，所以要给整个页面加onmousemove事件
                var oEvent = ev || event;
                var oLeft = oEvent.clientX - disX; // 新鼠标X坐标减去disX,也就是鼠标移动DIV后的Left
                var oTop = oEvent.clientY - disY; // 新鼠标Y坐标减去disY,也就是鼠标移动DIV后的Top
                if (oLeft < -ew / 2) {// 当DIV的Left小于0，也就是移出左边
                    oLeft = -ew / 2; // 就把DIV的Left设置为0，就不能移出左边
                } else if (oLeft > pw - ew / 2) {// 屏幕宽度减去DIV的宽度就得出了DIV到达最右边的宽度，如果Left大于这个像素
                    oLeft = pw - ew / 2; // 就把Left设置为这个像素
                }
                if (oTop < -eh / 2) {// 当DIV的To小于0，也就是移出左边
                    oTop = -eh / 2; // 就把DIV的Top设置为0，就不能移出上边
                } else if (oTop > ph - eh / 2) {// 屏幕高度减去DIV的高度就得出了DIV到达最下面边的像素，如果Top大于这个像素
                    oTop = ph - eh / 2; // 就把Top设置为这个像素
                }
                _this.setPosition(oLeft, oTop);
                return false;
            };
            _this.par.onmouseleave = function () {
                // _this.par.onmousemove=null; //把鼠标移动清楚
                // _this.par.onmouseup=null; //把鼠标松开清楚
            };
            _this.par.onmouseup = function () {// 鼠标松开时
                _this.par.onmousemove = null; // 把鼠标移动清楚
                _this.par.onmouseup = null; // 把鼠标松开清楚
            };
            return false;
        });
        document.documentElement.on('mousemove', function (e) {
            if (_this.par.onmousemove)
                _this.par.onmousemove(e);
        }, true);
        document.documentElement.on('mouseup', function (e) {
            if (_this.par.onmouseup)
                _this.par.onmouseup(e);
        }, true);

    }; JUI.DRAG.prototype.setPosition = function (x, y, f) {
        if (x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }
        var d = {
            x: (this.x + this._w) / this.par.wid(),
            y: (this.y + this._h) / this.par.hei()
        };
        if (this.mode == 'x') {
            this.y = y = 0;
            delete d.y;
        } else if (this.mode == 'y') {
            this.x = x = 0;
            delete d.x;
        }
        if (f == undefined)
            this.onchange(d);
        this.ele.css({
            left: this.x + 'px',
            top: this.y + 'px'
        });
    }; JUI.DRAG.prototype.setPositionByRate = function (x, y) {
        this.setPosition(x * this.par.wid() - this._w, y * this.par.hei() - this._h, false);
    };


    /* COLOR****************************************/
    JUI.COLOR = function (opt) {
        this.ele = opt.ele || null;
        this._value = opt.value || '';
        this.onchange = opt.onchange || function () { };
        this.value = opt.value || '';
        this.showAlp = (opt.ele.hasAttr('alpha') && opt.ele.attr('alpha') != 'false');
        this._alpha = 1;
        this._showColor = {
            r: 255, g: 0, b: 0
        };
        this._rangeColor = {
            r: 255, g: 0, b: 0,
            dr: 0, dg: 255, db: 255
        };
        this._rate = {
            x: 1, y: 0
        };
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = v;
                _this.onchange();
            }
        });
        this.init();
        if (this._value == '') {
            if (this.showAlp) {
                this.value = _jsonToRGB(this._showColor, this._alpha);
            } else {
                this.value = _jsonToSixteen(this._showColor);
            }
        }
    };
    JUI.COLOR.prototype = _createEmpty();
    JUI.COLOR.prototype.init = function () {
        var _jui = this;
        var item = this.ele;
        var _cw = $J.ct('div.j-color-w');
        var _pick = $J.ct('div.j-color-pick');
        var _pc1 = $J.ct('div.j-color-cover1');
        var _pc2 = $J.ct('div.j-color-cover2');
        var _ps = $J.ct('div.j-color-pick-s');
        var _pca = $J.ct('div.j-color-cover-a');
        _pick.append([_pc1, _pc2, _ps, _pca]);
        var _range = $J.ct('div.j-color-range');
        var _rs = $J.ct('div.j-color-range-s');
        var _ra = $J.ct('div.j-color-range-a');
        _range.append([_rs, _ra]);
        _cw.append([_pick, _range]);
        var _colorc = $J.ct('div.j-color-bg');
        if (this.showAlp) {
            var _alp = $J.ct('div.j-color-alp');
            var _ac = $J.ct('div.j-color-alp-color');
            var _as = $J.ct('div.j-color-alp-s');
            var _aa = $J.ct('div.j-color-alp-a');
            _alp.append([_ac, _as, _aa]);
            _cw.append(_alp);
            item.addClass('j-color-bg-alp');
        }
        var _vw = $J.ct('div.j-color-vw');
        var _v = $J.ct('input.j-color-v.j-input.s');
        var _bc = $J.ct('div.j-color-btn.j-btn.s.info').txt('清空');
        var _bok = $J.ct('div.j-color-btn.j-btn.s').txt('确定');
        _vw.append([_v, _bc, _bok]);
        _cw.append(_vw);
        var _icon = $J.ct('i.j-icon.j-color-icon.icon-chevron-down');
        item.append([_cw, _colorc, _icon]);
        var setColor = function (color) {
            if (color == undefined) {
                if (_jui.showAlp) {
                    color = 'rgba(' + _jui._showColor.r + ',' + _jui._showColor.g + ',' + _jui._showColor.b + ',' + _jui._alpha + ')';
                } else {
                    color = _jsonToSixteen(_jui._showColor);
                }
            }
            if (_jui._isFromInput) {
                _jui._isFromInput = false;
            } else {
                _v.val(color);
            }
            _colorc.css('background-color', color);
            var r = _jui._rangeColor;
            _pick.css('background-color', 'rgb(' + r.r + ',' + r.g + ',' + r.b + ')');
            if (_jui.showAlp) {
                _ac.css('background', 'linear-gradient(to right, rgba(' + r.r + ', ' + r.g + ', ' + r.b + ', 0) 0%, rgb(' + r.r + ', ' + r.g + ', ' + r.b + ') 100%)');
            }
        };
        var close = function () {
            if (_jui.ele.hasClass('j-active')) {
                _jui.ele.removeClass('j-active');
                setTimeout(function () { _jui.ele.child(0).css('display', 'none'); }, 300);
            }
        };
        _bc.clk(function () {// clear
            if (_jui.showAlp) {
                _jui.value = 'rgba(255,255,255,0)';
            } else {
                _jui.value = '#ffffff';
            }
            close();
        });
        _bok.clk(function () {// ok
            _jui.value = _v.val();
            close();
        });
        _icon.clk(function () {
            if (!_isDisabled(item)) {
                if (!item.hasClass('j-active')) {
                    _cw.css('display', 'block');
                    setTimeout(function () { item.addClass('j-active'); }, 30);
                    _jui.onchange();
                } else {
                    _jui.value = _v.val();
                    close();
                }
            }
        }, true);
        var color_drag = new JUI.DRAG({
            ele: _ps,
            par: _pca,
            onchange: function (d) {
                d.x = 1 - d.x;
                _jui._rate.x = d.x;// 记录上一次的位置
                _jui._rate.y = d.y;
                _jui._showColor.r = parseInt(_jui._rangeColor.r + d.x * _jui._rangeColor.dr);
                _jui._showColor.g = parseInt(_jui._rangeColor.g + d.x * _jui._rangeColor.dg);
                _jui._showColor.b = parseInt(_jui._rangeColor.b + d.x * _jui._rangeColor.db);
                _jui._showColor.r = parseInt(_jui._showColor.r - d.y * (_jui._showColor.r));
                _jui._showColor.g = parseInt(_jui._showColor.g - d.y * (_jui._showColor.g));
                _jui._showColor.b = parseInt(_jui._showColor.b - d.y * (_jui._showColor.b));
                setColor();
            }
        });
        var _split = 1 / 6;
        var range_drag = new JUI.DRAG({
            ele: _rs,
            par: _ra,
            mode: 'y',
            onchange: function (d) {
                var rate = (d.y % _split) / _split;
                var pos = Math.floor(d.y / _split);
                var c1 = 255 * rate;
                var c2 = 255 - c1;
                var r = _jui._rangeColor;
                switch (pos) {
                    case 0: r.r = 255; r.g = c1; r.b = 0; break;
                    case 1: r.r = c2; r.g = 255; r.b = 0; break;
                    case 2: r.r = 0; r.g = 255; r.b = c1; break;
                    case 3: r.r = 0; r.g = c2; r.b = 255; break;
                    case 4: r.r = c1; r.g = 0; r.b = 255; break;
                    case 5: r.r = 255; r.g = 0; r.b = c2; break;
                    case 6: r.r = 255; r.g = 0; r.b = 0; break;
                }
                r.dr = 255 - r.r; r.dg = 255 - r.g; r.db = 255 - r.b;
                r.r = Math.round(r.r);
                r.g = Math.round(r.g);
                r.b = Math.round(r.b);
                _pick.css('background-color', 'rgb(' + r.r + ',' + r.g + ',' + r.b + ')');
                var sc = _jui._showColor;
                sc.r = parseInt(r.r + _jui._rate.x * r.dr);
                sc.g = parseInt(r.g + _jui._rate.x * r.dg);
                sc.b = parseInt(r.b + _jui._rate.x * r.db);
                sc.r = parseInt(sc.r - _jui._rate.y * (sc.r));
                sc.g = parseInt(sc.g - _jui._rate.y * (sc.g));
                sc.b = parseInt(sc.b - _jui._rate.y * (sc.b));
                setColor();
            }
        });
        if (this.showAlp) {
            var alpha_drag = new JUI.DRAG({
                ele: _as,
                par: _aa,
                mode: 'x',
                onchange: function (d) {
                    _jui._alpha = parseFloat(d.x.toFixed(2));
                    setColor();
                }
            });
        }
        _v.oninput = function () {
            _jui._isFromInput = true;
            if (_checkColorValid(this.val(), _jui.showAlp)) {
                this.css('color', '#222');
                _jui.value = this.val();
            } else {
                this.css('color', '#d44');
            }
        };
        _jui.onchange = function () {
            if (_checkColorValid(_jui._value, _jui.showAlp)) {
                // var color = _jui._value;
                initParams.call(_jui);
                setColor();
                color_drag.setPositionByRate(1 - _jui._rate.x, _jui._rate.y);
                range_drag.setPositionByRate(0, countRangeRate(_jui._rangeColor));
                if (_jui.showAlp) alpha_drag.setPositionByRate(_jui._alpha, 0);
                item.attr('value', _jui._value);
                if (_jui._onchange) {
                    var __t = _jui.jet || _jui;
                    _jui._onchange.call(__t, {
                        ele: item,
                        value: _jui._value,
                        jui: _jui
                    });
                }
            } else {
            }
        };
        _cw.css('display', 'none');
        item.$jui = _jui;
    }; JUI.COLOR.prototype.close = function () {

    };
    JUI.COLOR._name = 'j-color';
    JUI.COLOR.init = function (item) {
        getEleList(item, JUI.COLOR._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.COLOR({ele: item});
            }
        });
    };
    function _checkColorValid (v, sa) {
        var t = _whatTypeColor(v);
        if (t != 'not') {
            if (((t == 'sixteen' || t == 'rgb') && !sa) || (t == 'rgba' && sa)) {
                return true;
            }
        }
        return false;
    }
    function initParams () {
        if (this._value.has('#')) {
            this._showColor = _sixteenToJson(this._value);
        } else {
            this._showColor = _RGBToJson(this._value);
            if (this.showAlp) this._alpha = this._showColor.a;
        }
        var d = colorToRangeColor(this._showColor);
        this._rate = d.rate;
        this._rangeColor = d.rangeColor;
    }
    function colorToRangeColor (sc) {
        if (sc.r == sc.g && sc.b == sc.g && sc.r == sc.b) {
            return {
                rangeColor: {
                    r: 255, g: 0, b: 0,
                    dr: 0, dg: 255, db: 255
                },
                rate: {
                    x: 1,
                    y: (255 - sc.r) / 255
                }
            };
        }
        // debugger;
        // var d={};
        // var max=Math.max(sc.r,sc.g,sc.b);
        // var min=Math.min(sc.r,sc.g,sc.b);
        // var y=max/255;
        // var x=min/max;
        // var rc={};
        // for(var k in sc){
        //   rc[k]=parseInt( ((sc[k]/(1-y)) - 255*x)/(1-x) );
        //   rc['d'+k]=255-rc[k];
        // }
        // return {
        //   rangeColor:rc,
        //   rate:{
        //     x:x,y:y
        //   }
        // };


        var d = {};
        var max = Math.max(sc.r, sc.g, sc.b);
        var rate = 255 / max;
        d.y = 1 - 1 / rate;
        var temp = {
            r: sc.r * rate,
            g: sc.g * rate,
            b: sc.b * rate,
            dr: 255 - sc.r * rate,
            dg: 255 - sc.g * rate,
            db: 255 - sc.b * rate,
        };
        var min = Math.min(temp.r, temp.g, temp.b);
        rate = min / (255 - min);
        d.x = min / 255;
        for (var k in temp) {
            if (temp[k] != min) {
                temp[k] = Math.round(temp[k] - rate * (255 - temp[k]));
            } else {
                temp[k] = 0;
            }
        }
        return {
            rangeColor: temp,
            rate: d
        };
    };
    // f00->ff0->0f0->0ff->00f->f0f->f00
    function countRangeRate (c) {
        var _split = 1 / 6;
        var rate;
        var index;
        if (c.b == 0) {// 0,1
            if (c.r == 255) {// 0
                index = 0;
                rate = c.g / 255;
            } else {
                index = 1;
                rate = 1 - c.r / 255;
            }
        } else {// 2345
            if (c.b != 255) {// 25
                if (c.g == 255) {// 2
                    index = 2;
                    rate = c.b / 255;
                } else {
                    index = 5;
                    rate = 1 - c.b / 255;
                }
            } else if (c.r == 0) {
                index = 3;
                rate = 1 - c.g / 255;
            } else {
                index = 4;
                rate = c.r / 255;
            }
        }
        return _split * (rate + index);
    }
    var _sixteenReg = /^#([0-9a-f]{3}|[0-9a-f]{6})$/;
    var _sArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    function _sixteenToJson (v) {
        v = v.toLowerCase();
        if (_sixteenReg.test(v)) {
            if (v.length == 4) {
                v = v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
            } else {
                v = v.substring(1);
            }
            var c = {};
            var t = ['r', 'g', 'b'];
            for (var i = 0; i < 3; i++) {
                c[t[i]] = _sixteenToNum(v.substring(i * 2, (i + 1) * 2));
            }
            return c;
        } else {
            _throw('色值的16进制格式有误:' + v);
        }
    }
    function _whatTypeColor (v) {
        v = v.toLowerCase();
        if (_sixteenReg.test(v)) {
            return 'sixteen';
        } else {
            if (v.has('rgb')) {
                var bool = true;
                var str = v.substring(v.indexOf('(') + 1, v.indexOf(')')).split(',');
                if (str.length != 3 && str.length != 4) {
                    bool = false;
                } else {
                    str.each(function (item) {
                        var num = parseInt(item);
                        if (num.toString() == 'NaN' || num < 0 || num > 255) {
                            bool = false;
                        }
                    });
                }
                if (bool) {
                    if (v.has('rgba')) {
                        return 'rgba';
                    } else {
                        return 'rgb';
                    }
                } else {
                    return 'not';
                }
            }
        }
    }
    function _sixteenToNum (v) {
        return _sArr.indexOf(v[0]) * 16 + _sArr.indexOf(v[1]);
    }
    function _numToSixteen (v) {
    // console.error('色co值的必须在0到255之间:'+v);
        if (v < 0) v = 0;
        else if (v > 255) v = 255;
        return _sArr[Math.floor(v / 16)] + _sArr[v % 16];
    }
    function _jsonToSixteen (v) {
        var c = '#';
        for (var i in v) {
            if (i != 'a') {
                c += _numToSixteen(parseInt(v[i]));
            }
        }
        return c;
    }
    function _RGBToJson (v) {
        var str = v.substring(v.indexOf('(') + 1, v.indexOf(')'));
        var arr = str.split(',');
        var c = {};
        var t = ['r', 'g', 'b'];
        for (var i = 0; i < 3; i++) {
            var num = parseInt(arr[i]);
            if (num < 0 || num > 255) {
                _throw('色值的rgb格式有误:' + v);
            }
            c[t[i]] = num;
        }
        if (arr.length == 4) {
            c.a = parseFloat(arr[3]);
            if (c.a < 0 || c.a > 1) {
                _throw('色值的rgb格式有误:' + v);
            }
        }
        return c;
    }
    function _jsonToRGB (v, a) {
        if ('a' in v) {
            return 'rgba(' + v.r + ',' + v.g + ',' + v.b + ',' + v.a + ')';
        } else if (a != undefined) {
            return 'rgba(' + v.r + ',' + v.g + ',' + v.b + ',' + a + ')';
        }
        return 'rgb(' + v.r + ',' + v.g + ',' + v.b + ')';
    }
    // f00->ff0->0f0->0ff->00f->f0f->f00

    // x:rgb -> r g-- b--
    // <div class='j-slider' min='0' max='100' value='0'></div>
    /* SLIDER**********************************************************/
    JUI.SLIDER = function (opt) {
        this.ele = opt.ele || null;
        this._value = opt.value || false;
        this.onchange = opt.onchange || function () { };
        this.value = opt.value || '';
        this.min = 0;
        this.max = 100;
        this.rate = 0;
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = _this.checkValue(v);
                _this.onchange();
            }
        });
        this.init();
    };
    JUI.SLIDER.prototype = _createEmpty();
    JUI.SLIDER.prototype.checkValue = function (v) {
        if (v < this.min) v = this.min;
        if (v > this.max) v = this.max;
        return v;
    };
    JUI.SLIDER.prototype.init = function () {
        var _jui = this;
        var item = this.ele;
        if (item.hasAttr('min')) _jui.min = parseFloat(item.attr('min'));
        if (item.hasAttr('max')) _jui.max = parseFloat(item.attr('max'));
        _formatWidthAttr(item);
        var pw = item.wid();
        var bar = $J.ct('div.j-slider-bar');
        var c = $J.ct('div.j-slider-c');
        item.append(bar.append(c));
        var func = function (e) {
            if (_isDisabled(item))
                return;
            var o = item.getBoundingClientRect();
            var w = e.clientX - o.left;
            if (w > pw) { w = pw; }
            if (w < 0) { w = 0; }
            _jui.value = _jui.min + (w / pw) * (_jui.max - _jui.min);
            _jui.onchange();
            return false;
        };
        _jui.onchange = function () {
            _jui.rate = (_jui.value - _jui.min) / (_jui.max - _jui.min);
            bar.css('width', (_jui.rate * 100) + '%');
            item.attr('value', _jui._value);
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        if (item.hasAttr('value')) _jui._value = parseFloat(item.attr('value'));
        _jui._value = _jui.checkValue(_jui._value);
        _jui.onchange();
        item.onclick = func;
        c.onmousedown = function () {
            c.onmousemove = func;
            item.onmousemove = func;
            return false;
        };
        c.onmouseup = function () {
            c.onmousemove = null;
            item.onmousemove = null;
        };
        item.onmouseup = function () {
            c.onmousemove = null;
            item.onmousemove = null;
        };
        document.documentElement.on('mousemove', function (e) {
            if (c.onmousemove)
                c.onmousemove(e);
        }, true);
        document.documentElement.on('mouseup', function (e) {
            if (c.onmouseup)
                c.onmouseup(e);
        }, true);
        item.attr('value', this._value);
        item.$jui = _jui;
    };
    JUI.SLIDER._name = 'j-slider';
    JUI.SLIDER.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.SLIDER({ele: item});
            }
        });
    };
    function _formatWidthAttr (item, call) {
        if (item.hasAttr('width')) {
            var w = item.attr('width');
            if (parseFloat(w).toString() == w) {
                w = w + 'px';
            }
            item.css('width', w);
            if (call) {
                setTimeout(function () {
                    call(item.wid());
                }, 500);// wid 数值改变
            }
        }
    }
    /* SCREEN_DRAG********************************** */
    JUI.SCREEN_DRAG = function (opt) {
        this.ele = opt.ele;
        this.drag = opt.drag || opt.ele;
        this._w = this.ele.wid() / 2;
        this._h = this.ele.hei() / 2;
        this.x = opt.x || -this._w;
        this.y = opt.y || -this._h;
        this.ondrag = opt.ondrag || function () { };
        this.ondrop = opt.ondrop || function () { };
        this.init(opt);
    };
    JUI.SCREEN_DRAG.prototype = _createEmpty();
    JUI.SCREEN_DRAG._name = 'j-drag';
    JUI.SCREEN_DRAG.prototype.init = function (opt) {
        var _this = this;
        // this.setPosition();
        _this.drag.on('mousedown', function (ev) {
            var oEvent = ev || event;
            _stopPro(oEvent);
            var x = _this.ele.offsetLeft;
            var y = _this.ele.offsetTop;
            var sx = oEvent.clientX;
            var sy = oEvent.clientY;
            _this.drag.onmousemove = function (ev2) {
                var e = ev2 || event;
                var oLeft = x + (e.clientX - sx);
                var oTop = y + (e.clientY - sy);
                _this.setPosition(oLeft, oTop);
                return false;
            };
            _this.drag.onmouseup = function () {// 鼠标松开时
                _this.drag.onmousemove = null; // 把鼠标移动清楚
                _this.drag.onmouseup = null; // 把鼠标松开清楚
            };
            return false;
        });
        document.documentElement.on('mousemove', function (e) {
            if (_this.drag.onmousemove)
                _this.drag.onmousemove(e);
        }, true);
        document.documentElement.on('mouseup', function (e) {
            if (_this.drag.onmouseup)
                _this.drag.onmouseup(e);
        }, true);
        var initPos = function () {
            _this.ele.css({
                left: (_this.ele.offsetLeft) + 'px',
                top: (_this.ele.offsetTop) + 'px',
                margin: '0'
            });
        };
        if (opt.type === 'confirm') {
            setTimeout(function () {
                initPos();
            }, 700);
        } else {
            initPos();
        }
    }; JUI.SCREEN_DRAG.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.ele.css({
            left: this.x + 'px',
            top: this.y + 'px'
        });
        this.ondrag();
    };
    JUI.SCREEN_DRAG._drag_area = 'j-drag-area';
    JUI.SCREEN_DRAG.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                var drag;
                var dragEle = item.findClass(JUI.SCREEN_DRAG._drag_area);
                if (dragEle.exist()) {
                    drag = dragEle;
                } else {
                    drag = item;
                    item.addClass(JUI.SCREEN_DRAG._drag_area);
                }
                new JUI.SCREEN_DRAG({
                    ele: item,
                    drag: drag
                });
            }
        });
    };
    /* <div class='j-drag' style='background:#000;width:300px;height:300px;'>
    <div class='j-drag-area' style='background:#aaa;width:300px;height:100px;'>
        
    </div>
  </div> */
    /* DIALOG*************************************************************/
    JUI.DIALOG = function (opt) {
        this.ele = opt.ele || null;
        this.title = (opt.ele.hasAttr('dialog-title')) ? opt.ele.attr('dialog-title') : '';
        this._nodrag = (opt.ele.attr('dialog-drag') === 'false');
        this._noclose = (opt.ele.attr('dialog-close') === 'false');
        this.onchange = opt.onchange || function () { };
        this._value = opt.value || false;
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = v;
                _this.onchange.call(_this);
            }
        });
    };
    JUI.DIALOG.prototype = _createEmpty();
    JUI.DIALOG._name = 'j-dialog';
    JUI.DIALOG._ds = [];
    JUI.dialog = {
        isOpen: function () {
            return ($J.cls('j-dialog-open j-dialog').exist());
        }, clear: function () {
            JUI.DIALOG._ds.forEach(function (ele) {
                ele.$jui.value = false;
            });
        }, removeAll: function () {
            JUI.DIALOG._ds.forEach(function (ele) {
                ele.$jui.value = false;
                setTimeout(function () {
                    if (ele.parentNode)
                        ele.remove();
                }, 500);
            });
            JUI.DIALOG._ds = [];
        }
    };
    JUI.DIALOG.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                var _jui = new JUI.DIALOG({ele: item});
                var childs = item.childNodes;
                var _head = $J.ct('div.j-dialog-head');
                var _t = $J.ct('div.j-dialog-title').txt(_jui.title);
                _head.append(_t);
                if (!_jui._noclose) {
                    var _i = $J.ct('i.j-icon.icon-times');
                    _i.clk(function () {
                        _jui.value = false;
                    });
                    _head.append(_i);
                }
                var _body = $J.ct('div.j-dialog-body');
                childs.each(function (_item) {
                    _body.append(_item);
                });
                item.append([_head, _body]);
                var itemHeight = item.hei();
                var itemWidth = item.wid();

                item.css({
                    'margin-top': '0',
                    'margin-left': '0'
                });
                var reinitTop = function () {
                    item.css({
                        'top': ($J.height() - itemHeight) / 2 + 'px',
                        'left': ($J.width() - itemWidth) / 2 + 'px'
                    });
                };
                _jui.reinitPos = function () {
                    if (item.hei() !== itemHeight) {
                        itemHeight = item.hei();
                        itemWidth = item.wid();
                        reinitTop();
                    }
                };
                reinitTop();
                _jui.onchange = function () {
                    if (_jui._value) {
                        _jui.reinitPos();
                        _jui.ele.css('visibility', 'visible');
                        _jui.ele.addClass('j-dialog-open').removeClass('j-dialog-close');
                    } else {
                        _jui.ele.addClass('j-dialog-close').removeClass('j-dialog-open');
                        setTimeout(function () {
                            _jui.ele.css('visibility', 'hidden');
                        }, 500);
                        if (_jui._onclose) { _jui._onclose.call(_jui.jet); }
                    }
                };
                item.$jui = _jui;
                if (!_jui._nodrag) {
                    new JUI.SCREEN_DRAG({
                        ele: item,
                        drag: _head
                    });
                } else {
                    _head.css('cursor', 'default');
                }
                JUI.DIALOG._ds.push(item);
                // setTimeout(function(){
                //   document.body.append(item);
                // },300)

            }
        });
    };
    /* PAGE************************************* */
    JUI.PAGE = function (opt) {
        this.total = opt.total || 10;
        this._value = opt.current || 1;
        this.ele = opt.ele || null;
        this.call = opt.call || null;
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                v = _this.checkValue(v);
                if (v !== _this._value) {
                    _this._value = v;
                    _this.onchange();
                }
            }
        });
        this.init();
    };
    JUI.PAGE.prototype = _createEmpty();
    JUI.PAGE.prototype.checkValue = function (v) {
        if (v < 1) {
            v = 1;
        } else if (v > this.total) {
            v = this.total;
        }
        return v;
    };
    JUI.PAGE.prototype.init = function () {
        var _jui = this;
        var item = this.ele;
        var _f = $J.ct('button.j-btn.s[title=首页]').html('<i class="j-icon icon-step-backward"></i>').clk(function () {
            _jui.value = 1;
        });
        var _p = $J.ct('button.j-btn.s[title=上一页]').html('<i class="j-icon icon-chevron-left"></i>').clk(function () {
            _jui.value = _jui.value - 1;
        });
        var _page = $J.ct('span.j-page-text');
        var _cur = $J.ct('span').txt(_jui._value);
        var _split = $J.ct('span').txt(' / ');
        var _total = $J.ct('span').txt(_jui.total);
        _page.append([_cur, _split, _total]);
        var _input = $J.ct('input.j-input.s[type=number]').val(_jui.value);
        var _j = $J.ct('button.j-btn.info.s[title=跳转]').html('<i class="j-icon icon-location-arrow"></i>').clk(function () {
            var v = this.prev().val();
            if (v !== '') _jui.value = parseInt(v);
        });
        var _n = $J.ct('button.j-btn.s[title=下一页]').html('<i class="j-icon icon-chevron-right"></i>').clk(function () {
            _jui.value = _jui.value + 1;
        });
        var _l = $J.ct('button.j-btn.s[title=末页]').html('<i class="j-icon icon-step-forward"></i>').clk(function () {
            _jui.value = _jui.total;
        });
        item.append([_f, _p, _page, _input, _j, _n, _l]);
        _jui.onchange = function () {
            _cur.txt(_jui._value);
            _input.val(_jui.value);
            if (_jui.call) {
                _jui.call({
                    current: _jui._value,
                    total: _jui.total
                });
            }
            item.attr('value', this._value);
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        _jui.onchangetotal = function () {
            _total.txt(_jui.total);
            if (_jui.call) {
                _jui.call({
                    current: _jui._value,
                    total: _jui.total
                });
            }
        };
        item.attr('value', this._value);
        item.$jui = _jui;
    };
    JUI.PAGE._name = 'j-page';
    JUI.PAGE.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.PAGE({ele: item});
            }
        });
    };
    /* TAB********************************************** */
    JUI.TAB = function (opt) {
        this._value = opt.value || opt.ele.attr('value');
        this.ele = opt.ele || null;
        this.call = opt.call || null;
        this.tabs = [];
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                v = _this.checkValue(v);
                if (v !== _this._value) {
                    _this._value = v;
                    _this.onchange();
                }
            }
        });
        this.init();
    };
    JUI.TAB.prototype = _createEmpty();
    JUI.TAB.prototype.checkValue = function (v) {
        if (this.tabs.indexOf(v.toString()) != -1) {
            return v.toString();
        }
        return this.tabs[0];
    };
    JUI.TAB.prototype.init = function () {
        var _jui = this;
        var item = this.ele;
        var _active = 'j-tab-active';
        var childs = item.child();
        var _h = $J.ct('div.j-tab-head');
        var _b = $J.ct('div.j-tab-body');
        var index = 0;
        childs.each(function (ele, i) {
            var title = (ele.hasAttr('title')) ? ele.attr('title') : ele.attr('value');
            var value = (ele.hasAttr('value')) ? ele.attr('value') : ele.attr('title');
            var _tab = $J.ct('span').txt(title).clk(function () {
                if (!this.hasClass(_active)) {
                    _jui.value = this._j_tab_value;
                }
            });
            _tab._j_tab_value = value;
            _jui.tabs.push(value);
            if (i === 0 || value === _jui._value) {
                _tab.addClass(_active);
                _h.append(_tab);
                if (i > 0) {
                    _h.child(0).removeClass(_active);
                    index = i;
                }
            } else {
                _h.append(_tab);
            }
            ele.addClass('j-tab-item');
            _b.append(ele);
        });
        _b.child(index).addClass(_active);
        item.append([_h, _b]);

        _jui.onchange = function () {
            var index = _jui.tabs.indexOf(_jui._value);
            item.findClass(_active).removeClass(_active);
            _h.child(index).addClass(_active);
            _b.child(index).addClass(_active);
            if (_jui.call) {
                _jui.call({
                    current: _jui._value,
                    total: _jui.total
                });
            }
            item.attr('value', this._value);
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };

        item.attr('value', this._value);
        item.$jui = _jui;
    };
    JUI.TAB._name = 'j-tab';
    JUI.TAB.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.TAB({ele: item});
            }
        });
    };

    /* CODE********************************************** */
    var _ce_btn = 'buttons', _ce_disabled = 'disabled', _ce_callback = 'callback', _ce_full = 'j_full', _ce_hidden = 'j_hidden', _def_w = 300, _def_h = 200;
    var _code = {
        _str: 1,
        _key: ['if', 'else', 'for', 'switch', 'while', 'try', 'catch', 'finally', 'new ', 'return', 'this', 'break',
            'default', 'case', 'continue', 'throw', 'throws', 'in ', // common
            'function', 'var', 'undefined', 'typeof', // js
            'important', // css
            'private', 'protected', 'public', 'abstract', 'static', 'void',
            'boolean', 'byte', 'char', 'int ', 'double', 'enum', 'const', 'final', 'float', 'long', 'short', 'true', 'True',
            'false', 'False', 'null', 'String', 'string', 'object',
            'assert', 'class ', 'do', 'extends', 'goto', 'implements', 'import', 'instanceof', 'interface', 'native',
            'package', 'strictfp', 'super', 'synchronized', 'transient', 'volatile',
            'operator', 'out ', 'override', 'params', 'readonly', 'ref', 'sbyte', 'sealed', 'sizeof', 'stackalloc',
            'struct', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using', 'virtual', 'void', 'volatile', 'as ',
            'base', 'bool', 'checked', 'decimal', 'delegate', 'event', 'explicit', 'extern', 'foreach', 'internal',
            'is ', 'lock', 'namespace'// c#
        ],
        _tag: 3,
        _attr: 4,
        _sign: ['#', '=', '&gt;', '&lt;', '{', '}', '\\(', '\\)', '\\[', '\\]', ',', '&&', '\\.',
            '\\?', '\\|', '\\+', '-', ';\n', ':', '!', '%', '\\^'], // 转义
    };
    JUI.CODE = function (opt) {
        this._value = opt.value || opt.ele.attr('value');
        this.ele = opt.ele || null;
        this.call = opt.call || null;
        this.lineHeight = 20;
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                if (v !== _this._value) {
                    _this._value = v;
                    _this.onchange();
                }
            }
        });
        this.init();
    };
    JUI.CODE.prototype = _createEmpty();
    JUI.CODE.prototype.init = function () {
        var _jui = this;
        var item = this.ele;
        _initFrame(item, _jui);
        _initCodeMain(item.findClass('code_editor'), _jui);

        _jui.onchange = function () {
            _jui.codearea.val(_jui._value);
            _geneViewCode.call(_jui);
            if (_jui.call) {
                _jui.call({
                    current: _jui._value,
                    total: _jui.total
                });
            }
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        item.$jui = _jui;
        this.fontSize(this.fontSize()); // 初始化lineheight
    };
    JUI.CODE._name = 'j-code';
    JUI.CODE.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.CODE({ele: item});
            }
        });
    };
    function _initCodeMain (item, _jui) {
        item.on({
            mouseleave: function () {
                // showResult(false);
            },
            keydown: function (event) {
                _codeChange.call(_jui, event, this);
            },
            keyup: function (e) {
                var k = e.keyCode;
                if (k == 13 || k == 9) {// 回车和tab键
                    _jui.value = this.value;
                }
                if (
                    k === 38 || k === 40 || k === 13 || k === 8 ||// 上下 回车 删除
                    (e.ctrlKey && (k === 86 || k === 88 || k === 89 || k === 90)) // ctrl + v x y z
                ) {
                    _activeLine.call(_jui);
                }
            },
            input: function () {
                _jui.value = this.value;
            },
            scroll: function () {
                _getView(_jui.ele).scrollTo(this.scroll(), null, 10).scrollXTo(this.scrollX(), null, 10);
            },
            click: function () {
                _activeLine.call(_jui);
                _jui.setActiveLine('show');
            }, blur: function () {
                _jui.setActiveLine('hide');
            }
            // onclick:moveCursor
        });
        _tabEnable(item);
        item.each(function (_i) {
            if (_i.parent().hasAttr('onload')) {
                window[_i.parent().attr('onload')](item.parent());
            }
        });
    }
    function _initFrame (item, jui) {
        if (item.findClass('code_editor').length == 0) {// 防止两次初始化
            if (item.hasAttr('dark')) {
                if (item.attr('dark') !== 'false') {
                    item.addClass('j-c-dark');
                }
            } else if (JUI.CODE.theme === 'dark') {
                item.addClass('j-c-dark');
            }
            var cont = item.html();// .trim();
            if (!item.hasAttr('jui-code-trim') || item.attr('jui-code-trim') !== 'false') {
                while (cont[0] == '\n') {
                    cont = cont.substr(1);
                }
                cont = cont.replace(/(\s*$)/g, '');
            }
            var num = /^\d+$/;
            var w = item.hasAttr('width') ? item.attr('width') : _def_w + 'px';
            if (num.test(w)) {
                w += 'px';
            }
            var h = item.hasAttr('height') ? item.attr('height') : _def_h + 'px';
            if (num.test(h)) {
                h += 'px';
            }
            item.empty();
            var activeLine = $J.ct('div.code_active_line');
            item.append(activeLine);
            var c_view1 = $J.ct('pre.code_editor_view._bottom').html(cont);
            item.append(c_view1);
            var c_view2 = $J.ct('pre.code_editor_view').html(cont);
            item.append(c_view2);
            jui.view1 = c_view1;
            jui.view2 = c_view2;
            var ta = $J.ct('textarea.code_editor[spellcheck=false]').html(cont).data('code', cont);
            jui.codearea = ta;
            if (item.hasAttr(_ce_disabled) && item.attr(_ce_disabled) !== 'false') {
                ta.attr(_ce_disabled, _ce_disabled).css('cursor', 'no-drop');
            }
            item.append(ta);
            var needSubmit = false;
            if (item.hasAttr(_ce_callback)) {
                needSubmit = true;
                item.code_callback = C._checkFunction(item.attr(_ce_callback));
            }
            item.css({
                width: w,
                height: h
            });
            if (h == 'auto') {
                jui.view1.css('height', h);
                jui.view2.css('height', h);
                jui.codearea.data('height', 'auto').css('overflow-y', 'hidden').css('height', h);
            } else {
                item.child().css('height', '100%');
            }
            if (w == 'auto') {
                jui.view1.css('width', h);
                jui.view2.data('width', w).css('width', h);
                jui.codearea.data('width', 'auto').css('overflow-x', 'hidden').css('width', w); ;
            } else {
                jui.view1.css('width', '100%');
                jui.view2.css('width', '100%');
                jui.codearea.css('width', '100%');
            }
            var mh = 45;
            if (item.hasAttr(_ce_btn)) {
                jui.view1.css('padding-top', '40px');
                jui.view2.css('padding-top', '40px');
                jui.codearea.css('padding-top', '40px');
                mh += 40;
                var btn = item.attr(_ce_btn);
                var arr = [];
                if (btn == _ce_btn || btn == 'true' || btn == '') {
                    $J.each(_buttons, function (item, attr) {
                        if (attr != 'submit' || needSubmit) {
                            arr.push(_getButton(item, jui));
                        }
                    });
                } else {
                    var ba = btn.split(';');
                    ba.each(function (item) {
                        if (item != '') {
                            if (item != 'submit' || needSubmit) {
                                arr.push(_getButton(_buttons[item.toLowerCase()], jui));
                            }
                        }
                    });
                }
                item.append($J.ct('div.code_set_w').append(arr));
            }
            var line = undefined;
            if (item.attr('jui-code-line') !== 'false') {
                line = $J.ct('div.code_line_w');
                item.append(line);
                jui.reinitLine = function () {
                    var len = line.children.length;
                    var lines = jui.codearea.val().timeOf('\n') + 1;
                    if (lines > len) {
                        for (var i = 1; i <= lines - len; i++) {
                            line.append($J.ct('div').txt(fixNum(len + i)));
                        }
                    } else if (lines < len) {
                        for (var i = lines; i < len; i++) {
                            line.child(lines).remove();
                        }
                    }
                };
            }
            jui.setActiveLine = function (index) {
                if (index === 'hide') {
                    activeLine.css('opacity', '0');
                    if (line) {
                        line.findClass('j-active').removeClass('j-active');
                    }
                } else if (index === 'show') {
                    activeLine.css('opacity', '1');
                } else {
                    var top = index * jui.lineHeight;
                    activeLine.css('transform', 'translate(0,' + top + 'px)');
                    activeLine.css('-webkit-transform', '-webkit-translate(0,' + top + 'px)');
                    if (line && line.children.length > 0) {
                        line.findClass('j-active').removeClass('j-active');
                        line.child(index).addClass('j-active');
                    }
                }
            };
            jui.setHeight = function () {
                if (line) {
                    line.child().css({
                        height: jui.lineHeight + 'px',
                        'line-height': jui.lineHeight + 'px'
                    });
                }
                item.child(0).css('height', jui.lineHeight + 'px');
            };
            item.css('min-height', mh + 'px');
            if (cont != '') {
                _geneViewCode.call(jui);
            }
            if (window.navigator.userAgent.has('iPhone')) {
                jui.view1.css('left', '3px');
                jui.view2.css('left', '3px');
            }
        }
    }
    function _getCurLine (obj) {
        var v = obj.value;
        // 开始到光标位置的内容
        var cv = '';
        if ('selectionStart' in obj) {
            cv = v.substr(0, obj.selectionStart);
        } else if (document.createRange) {
            var oSel = document.createRange();
            oSel.moveStart('character', -obj.value.length);
            cv = oSel.text;
        } else {
            var oSel = document.selection.createRange();
            oSel.moveStart('character', -obj.value.length);
            cv = oSel.text;
        }
        // 获取当前是几行
        var cl = cv.split('\n').length - 1;
        // console.log(cl);
        return cl;
    }
    var _buttons = {
        fontsizeup: ['fontSizeUp', '放大字体', 'zoom-in'],
        fontsizedown: ['fontSizeDown', '缩小字体', 'zoom-out'],
        fullscreen: ['fullScreen', '全屏显示', 'expand-full'], // collapse-full
        fix: ['fix', '修复重影问题', 'wrench'],
        changeTheme: ['changeTheme', '切换主题', 'paint-brush'],
        clearcode: ['clearCode', '清除代码', 'trash'],
        resetcode: ['resetCode', '重置代码', 'undo'],
        copy: ['copy', '复制代码', 'copy'],
        submit: ['submit', '提交代码', 'share-sign']
    };
    function _getButton (a, jui) {
        return $J.ct('i.j-icon.icon-' + a[2]).clk(function () {
            jui[a[0]](this);
        }).tip(a[1]);
    }

    JUI.CODE.prototype.fix = function (obj) {
        if (obj.data('flag')) {
            obj.data('flag', false);
            this.view1.css('left', '3px');
            this.view2.css('left', '3px');
        } else {
            obj.data('flag', true);
            this.view1.css('left', '0px');
            this.view2.css('left', '0px');
        }
    };
    JUI.CODE.prototype.changeTheme = function () {
        this.ele.toggleClass('j-c-dark');
        // this.codearea.toggleClass('bg');
        // this.view1.fadeToggle();
        // this.view2.fadeToggle();
    };
    JUI.CODE.prototype.clearCode = function () {
        JUI.confirm('是否确认清空代码(该操作不可撤销)？', function () {
            // var par = this.ele;
            this.view1.empty();
            this.view2.empty();
            this.codearea.val('').focus();
        });
    };
    JUI.CODE.prototype.resetCode = function () {
        var _this = this;
        JUI.confirm('是否确认重置代码(该操作不可撤销)？', function () {
            var c = this.codearea;
            c.val(c.data('code').replaceAll('&lt;', '<').replaceAll('&gt;', '>')).focus();
            _geneViewCode.call(_this);
        });
    };
    JUI.CODE.prototype.copy = function () {
        if ($J.isMobile()) {
            JUI.msg('移动端不支持该方法', 'warn');
        } else {
            if (this.codearea.copy()) {
                JUI.msg('复制成功！', 'success');
            } else {
                this.codearea.select();
                JUI.msg('您的浏览器不支持该方法。请按Ctrl+V手动复制', 'info');
            }
        }
    };
    JUI.CODE.prototype.fullScreen = function (obj) {
        this.ele.toggleClass(_ce_full);
        obj.toggleClass('icon-collapse-full');
        $J.body().toggleClass(_ce_hidden);
        if(!this.ele.hasClass(_ce_full)){
            _checkSizeAuto(this.ele.findClass('code_editor'));
        }
    };
    JUI.CODE.prototype.fontSizeUp = function () {
        var n = this.fontSize();
        if (n < 35) {
            this.fontSize(n + 1);
        } else {
            JUI.msg('已达到最大大小(35px)', 'warn');
        }
    }; JUI.CODE.prototype.fontSizeDown = function () {
        var n = this.fontSize();
        if (n > 12) {
            this.fontSize(n - 1);
        } else {
            JUI.msg('已达到最小大小(12px)', 'warn');
        }
    };
    JUI.CODE.prototype.submit = function () {
        var par = this.ele;
        par.code_callback.call(this, this.codearea.val());
    };
    JUI.CODE.prototype.txt = function (txt) {
        var c = this.codearea;
        if (typeof txt == 'undefined') {
            return c.val();
        } else {
            c.val(txt).focus();
            _geneViewCode.call(this);
        }
    };
    JUI.CODE.prototype.fontSize = function (size) {
        var par = this.ele;
        if (size !== undefined) {
            par.css({
                'font-size': size + 'px',
                'line-height': (size + 4) + 'px'
            });
            var _this = this;
            countLineHeight(par.findClass('_bottom'), function (lineHeight) {
                // _this.lineHeight = size + 4;
                _this.lineHeight = lineHeight;
                if (_this.ele.attr('height') === 'auto') {
                    _geneViewCode.call(_this);
                }
                par.css({
                    'line-height': _this.lineHeight + 'px'
                });
                _this.setHeight();
            });
        } else {
            var fs = par.css('font-size');
            return parseInt(fs.substring(0, fs.length - 2));
        }
    };
    JUI.CODE.extend = function (a) {
        if (typeof a == 'array') {
            _code._key.appendArray(a);
        } else if (typeof a == 'string') {
            _code._key.append(a);
        } else {
            throw new Error('extend:参数类型错误');
        }
    };
    function countLineHeight (el, cb) {
        setTimeout(() => {
            var length = 100, strLine = '';
            for (var i = 0; i < length; i++) {strLine += '1\n';}
            var content = el.html();
            el.html(strLine);
            var padding = el.css('padding').replaceAll('px', '').split(' ');
            var lineHeight = (el.offsetHeight - (parseInt(padding[0])) - (parseInt(padding[2]))) / length; // 50是padding
            el.html(content);
            cb(lineHeight);
        }, 10);
    }
    JUI.CODE.tab = '\t';// \t
    function _tabEnable (obj) {
        obj.on('keydown', _keyDown, true);
    }
    function _keyDown (e) {
        var a = JUI.CODE.tab;
        var b = a.length;
        if (e.keyCode === 9) {
            e.preventDefault();
            var c = this.selectionStart,
                currentEnd = this.selectionEnd;
            if (e.shiftKey === false) {
                if (!_isMultiLine(this)) {
                    this.value = this.value.slice(0, c) + a + this.value.slice(c);
                    this.selectionStart = c + b;
                    this.selectionEnd = currentEnd + b;
                } else {
                    var d = _findStartIndices(this),
                        l = d.length,
                        newStart = undefined,
                        newEnd = undefined,
                        affectedRows = 0;
                    while (l--) {
                        var f = d[l];
                        if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
                        if (f >= c && d[l] < currentEnd) {
                            this.value = this.value.slice(0, d[l]) + a + this.value.slice(d[l]);
                            newStart = d[l];
                            if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end');
                            affectedRows++;
                        }
                    }
                    this.selectionStart = newStart;
                    this.selectionEnd = (newEnd !== 'end' ? newEnd + (b * affectedRows) : this.value.length);
                }
            } else {
                if (!_isMultiLine(this)) {
                    if (this.value.substr(c - b, b) == a) {
                        this.value = this.value.substr(0, c - b) + this.value.substr(c);
                        this.selectionStart = c - b;
                        this.selectionEnd = currentEnd - b;
                    } else if (this.value.substr(c - 1, 1) == '\n' && this.value.substr(c, b) == a) {
                        this.value = this.value.substring(0, c) + this.value.substr(c + b);
                        this.selectionStart = c;
                        this.selectionEnd = currentEnd - b;
                    }
                } else {
                    var d = _findStartIndices(this),
                        l = d.length,
                        newStart = undefined,
                        newEnd = undefined,
                        affectedRows = 0;
                    while (l--) {
                        var f = d[l];
                        if (d[l + 1] && c != d[l + 1]) f = d[l + 1];
                        if (f >= c && d[l] < currentEnd) {
                            if (this.value.substr(d[l], b) == a) {
                                this.value = this.value.slice(0, d[l]) + this.value.slice(d[l] + b);
                                affectedRows++;
                            } else { }
                            newStart = d[l];
                            if (!newEnd) newEnd = (d[l + 1] ? d[l + 1] - 1 : 'end');
                        }
                    }
                    this.selectionStart = newStart;
                    this.selectionEnd = (newEnd !== 'end' ? newEnd - (affectedRows * b) : this.value.length);
                }
            }
        } else if (e.keyCode === 13 && e.shiftKey === false) {
            var cursorPos = this.selectionStart,
                d = _findStartIndices(this),
                numStartIndices = d.length,
                startIndex = 0,
                endIndex = 0,
                tabMatch = new RegExp('^' + a.replace('\t', '\\t').replace(/ /g, '\\s') + '+', 'g'),
                lineText = '',
                tabs = null;
            for (var x = 0; x < numStartIndices; x++) {
                if (d[x + 1] && (cursorPos >= d[x]) && (cursorPos < d[x + 1])) {
                    startIndex = d[x];
                    endIndex = d[x + 1] - 1;
                    break;
                } else {
                    startIndex = d[numStartIndices - 1];
                    endIndex = this.value.length;
                }
            }
            lineText = this.value.slice(startIndex, endIndex);
            tabs = lineText.match(tabMatch);
            if (tabs !== null) {
                e.preventDefault();
                var h = tabs[0];
                var i = h.length;
                var j = cursorPos - startIndex;
                if (i > j) {
                    i = j;
                    h = h.slice(0, j);
                }
                this.value = this.value.slice(0, cursorPos) + '\n' + h + this.value.slice(cursorPos);
                this.selectionStart = cursorPos + i + 1;
                this.selectionEnd = this.selectionStart;
            }
        }
    }
    function _isMultiLine (a) {
        var b = a.value.slice(a.selectionStart, a.selectionEnd),
            nlRegex = new RegExp(/\n/);
        if (nlRegex.test(b)) return true;
        else return false;
    }
    function _findStartIndices (a) {
        var b = a.value,
            startIndices = [],
            offset = 0;
        while (b.match(/\n/) && b.match(/\n/).length > 0) {
            offset = (startIndices.length > 0 ? startIndices[startIndices.length - 1] : 0);
            var c = b.search('\n');
            startIndices.push(c + offset + 1);
            b = b.substring(c + 1);
        }
        startIndices.unshift(0);
        return startIndices;
    }


    function _codeChange (e, obj) {
        if (obj.attr('jet-change') == '0') {
            obj.attr('jet-change', '1');
        }
        if (e.keyCode == 13 || e.keyCode == 9) {
            _geneViewCode.call(this);
        }
    // _geneViewCode();
    }
    function _geneLine () {
        if (this.reinitLine)
            this.reinitLine();
    }
    function _activeLine () {
        var line = _getCurLine(this.codearea);
        this.setActiveLine(line);
    }
    function _geneViewCode () {
    // moveCursor();.replaceAll("<","&lt;").replaceAll(">","&gt;")
        var val = this.codearea.val();
        var html = val.replaceAll('<', '&lt;').replaceAll('>', '&gt;') + ' ';// 为了不让最后一个字符是换行
        html = _geneHtmlNote(html);
        html = _geneHtmlElement(html);
        // html = _geneKey(html);
        // html = _geneFun(html);
        // html = _geneDefineFun(html);
        // html = _geneNumber(html);
        html = _geneString(html);
        // html = _geneNote(html);
        _getView(this.ele, 1).html(html);

        // var htmlSign = _geneSign(val.replaceAll('<', '&lt;').replaceAll('>', '&gt;') + ' ');
        // _getView(this.ele, 0).html(htmlSign);
        var htmlSign = renderColor(val.replaceAll('<', '&lt;').replaceAll('>', '&gt;') + ' ');
        _getView(this.ele, 0).html(htmlSign);
        _checkSizeAuto(this.codearea);
        _geneLine.call(this);
    }

    var keyword1 = ['var', 'new', 'const', 'let', 'typeof', 'in', 'function', 'this', 'true', 'false', 'null', 'undefined', 'async', 'delete', 'class', 'extends']; // var
    var keyword2 = ['return', 'for', 'while', 'else if', 'if', 'else', 'switch', 'case', 'default', 'break', 'continue', 'await', 'yield', 'try', 'catch', 'finally', 'throw', 'export', 'import', 'from']; // return
    var keyword3 = ['console', 'window', 'document', 'Date', 'Array', 'Object', 'Boolean', 'Number', 'String', 'alert', 'RegExp', 'Function', 'JSON', 'Date']; // Date
    // var sign = ['"', "'", "`", ",", ";", "\\:", "\\.", "\\(", "\\)", "\\{", "\\}", "\\[", "\\]", "\\+", "\\-", "\\*", "\\/", "_", "\\|", "\\", "\\&", "\\%", "\\$", "\\!", "\\<", "\\=", "\\>",  "\\^", "~", "@", "#"];
    var sign = ['\\/', '\\', '\\(', '\\)', '\\[', '\\]', '\\{', '\\}', '\\+', '\\-', '\\*', '\\=', ',', '\\.', ':', '%', '_', '\\$', '@', '#', '\\^', '\\|', '!', '~'];

    var signBegin = '(^|(&lt;)|(&lt;)|[\\n\\t;<> ' + sign.join('') + '])';
    var signEnd = '([' + sign.join('') + '\\n;<> ]|(&lt;)|(&lt;)|$)';

    // var punc = ''
    // var reg = {
    //     str:1,
    //     comment:1,
    //     keyword(){

    //     }
    // }


    function sp (str, cls) {
        return '<span class="j-c-js-' + cls + '">' + str + '</span>';
    }

    function _replace (str, reg, cls, word) {
        return str.replace(reg, function (s) {
            if (typeof word === 'string') {
                return s.replace(word, sp(word, cls));
            } else if (typeof word === 'object') {
                return s.replace(word, function (s2) {
                    return sp(s2, cls);
                });
            }
            return sp(s, cls);
        });
    }

    function replace (str, reg, cls, word) {
        if (str.indexOf('</span>') !== -1) {
            var _regExp = (typeof reg === 'string') ? regExp(reg) : reg[0];
            str = str.replace(_regExp, function (s1) {
            // 只有字符串
                var _regExp2 = (typeof reg === 'string') ? new RegExp(reg, 'g') : reg[1];
                return _replace(s1, _regExp2, cls, word);
            });
        } else {
            var _regExp = (typeof reg === 'string') ? new RegExp(reg, 'g') : reg[1];
            str = _replace(str, _regExp, cls, word);
        }
        return str;
    }

    function regExp (reg) {
        return new RegExp(reg + '(?![^<]*>|[^<>]*<\/)', 'g');
    }
    function renderColor (text) {
    // var html = '';
    // debugger
        // text = text.replace('\t', '    ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        text = pipe(text, [
        // /("(?:[^"\\]|\.)*")|(`(?:[^"\\]|\.)*`)|('(?:[^"\\]|\.)*')/g
        // ['("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)','str'],// 有bug：需要不包含字符串本身
            [
                [
                    /("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)(?![^<]*>|[^<>]*<\/)/g,
                    /("(?:[^"\\]|\\.)*")|(\'(?:[^\'\\]|\\.)*\')|(`((?:[^`\\]|\\.)|\n)*`)/g
                ],
                'str'
            ], // 有bug：需要不包含字符串本身
            ['(//.*(\n|$))|(\\/\\*(.|\n)*?\\*\\/)', 'cm'],
            ['\\/[a-zA-Z0-9' + sign.slice(1).join('') + ' ]+\\/g?', 'reg'], // 正则
            grArr(keyword1, 'k1'),
            grArr(keyword1, 'k1'), // 重复是为了解决相邻同类元素 无法被匹配 比如 function function 只有第一个function被匹配，因为他们共享一个空格
            grArr(keyword2, 'k2'),
            grArr(keyword2, 'k2'),
            grArr(keyword3, 'k3'),
            grArr(keyword3, 'k3'),
            [signBegin + '[0-9]+(\\.?[0-9]+)?' + signEnd, 'num', /[0-9]+(.?[0-9]+)?/g],
            // [signBegin+'[0-9]+'+signEnd,'num',/[0-9]+/g],
            [signBegin + '[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]*\\(', 'f', new RegExp('[a-zA-Z_\\$]+[a-zA-Z_\\$0-9]*', 'g')],
            ['[' + sign.join('') + ']', 'punc', new RegExp('[' + sign.join('') + ']', 'g')],
        ]);
        text = text.replace(/\&lt;/g, sp('<', 'punc')).replace(/\&gt;/g, sp('>', 'punc')).replace(/;/g, sp(';', 'punc')).replace(/&/g, sp('&', 'punc'));
    
        return text;
    }

    // var signEnd = '[ \\(\\.\\n]';

    function grArr (array, cls) {
        return [signBegin + '((' + array.join(')|(') + '))' + signEnd, cls, new RegExp('((' + array.join(')|(') + '))', 'g')];
    }

    function pipe (text, array) {
        for (var i = 0; i < array.length; i++) {
            array[i].unshift(text);
            text = replace.apply(null, array[i]);
        }
        return text;
    }

    function _getView (obj, i) {
        if (i != undefined) {
            return obj.child(i + 1);
        }
        return obj.findClass('code_editor_view');
    }
    function _checkSizeAuto (obj) {
        _checkSizeAutoPart(obj, 'height');
        _checkSizeAutoPart(obj, 'width');
    }
    function _checkSizeAutoPart (obj, s) {
        if (obj.data(s) == 'auto' && !obj.parent().hasClass(_ce_full)) {
            var n = obj.prev().css(s);
            if (n == 'auto') {
                setTimeout(function () { obj.css(s, obj.prev().css(s)); }, 0);
            } else {
                obj.css(s, n);
            }
        }
    }
    // function _checkSizeAutoPart (obj, s) {
    //     if (obj.data(s) === 'auto' && !obj.parent().hasClass(_ce_full)) {
    //         var n = obj.prev().data(s);
    //         if (n == 'auto') {
    //             obj.css(s, obj.prev().css(s));
    //         } else {
    //             obj.css(s, n);
    //         }
    //     }
    // }

    // function _geneSign (html) {
    //     _code._sign.each(function (a) {
    //         html = html.replaceAll(a, '<cd_sign>' + (a.has('\\') ? a.substring(1) : a) + '</cd_sign>');
    //     });
    //     return html;
    // }
    // function _geneDefineFun (html) {// js
    //     var dFun = html.match(/(function)(.*?)(<)/g);
    //     if (dFun != null) {
    //         dFun.each(function (a, i) {
    //             dFun[i] = a.substring(a.lastIndexOf(' ') + 1, a.length - 1);
    //         });
    //         dFun.sortByAttr('length', false);
    //         dFun.each(function (a) {
    //             if (a != '' && a != 'function') {// 匿名函数排除掉
    //                 html = html.replaceAll(a, '<cd_dfun>' + a + '</cd_dfun>');
    //             }
    //         });
    //     }
    //     return html;
    // }
    // var _funReg = /(\.)(.*?)(\()/g;
    // function _geneFun (html) {
    //     var arr = html.match(_funReg);
    //     if (arr != null) {
    //         arr.each(function (a, i) {
    //             arr[i] = arr[i].replace(a, a[0] + '<cd_fun>' + a.substring(1, a.length - 1) + '</cd_fun>(');
    //         });
    //         return html.replaceAll(_funReg, arr);
    //     }
    //     return html;
    // }
    // function _geneKey (html) {
    //     _code._key.each(function (a) {
    //         html = html.replaceAll(a, '<cd_key>' + a + '</cd_key>');
    //     });
    //     return html;
    // }
    function _geneHtmlElement (html) {
        return _geneCommon(html, /(&lt;)(.*?)(&gt;)/g, 'cd_tag', 'html');
    }
    // function _geneNumber (html) {
    //     return _geneCommon(html, /(\d+)/g, 'cd_num');
    // }
    function _geneString (html) {
        return _geneCommon(html, /((")(.*?)("))|((')(.*?)('))/g, 'cd_str');
    }
    // function _geneNote (html) {
    //     return _geneCommon(html, /((\/\/)(.*?)(\n))|((\/\*)((.|\n)*?)(\*\/))/g, 'cd_note');
    // }
    function _geneHtmlNote (html) {
        return _geneCommon(html, /(&lt;!--)((.|\n)*?)(--&gt;)/g, 'cd_note');
    }
    function _geneCommon (html, reg, tag, type) {
        var arr = html.match(reg);
        if (arr != null) {
            arr.each(function (a, i) {
                if (type === 'html') {
                    a = _geneCommon(a, /(&lt;)|(&gt;)|(\/)/g, 'cd_attr_punc');
                    a = _geneCommon(a, /( )(\S*?)(=)/g, 'cd_attr', 'attr');
                }
                if (type === 'attr') {
                    a = a.replace('=', '<cd_attr_equal>=</cd_attr_equal>');
                }
                arr[i] = '<' + tag + '>' + a + '</' + tag + '>';
                // if (type === 'html') {
                //     a = _geneCommon(a, /(&gt;)(.*?)(&lt;\/)/g, 'cd_html_c');
                // }
                // arr[i] = a;
            });
            html = html.replaceAll(reg, arr);
        }
        return html;
    }

    JUI.BTN = {
        _name: 'j-btn',
        init: function (item) {
            getEleList(item, JUI.BTN._name).each(function (item) {
                _formatWidthAttr(item);
                if (item.hasAttr('icon')) {
                    var _i = '<i class="j-icon icon-' + item.attr('icon') + '"></i>';
                    if (item.hasClass('j-icon-right')) {
                        _i = item.html() + _i;
                    } else {
                        _i += item.html();
                    }
                    item.html(_i).removeAttr('icon');
                }
            });
        }
    };
    JUI.INPUT = {
        _name: 'j-input',
        init: function (item) {
            getEleList(item, JUI.INPUT._name).each(function (item) {
                _formatWidthAttr(item);
                if (item.hasAttr('icon') || item.hasAttr('title')) {
                    var left = true;
                    if (item.hasClass('j-icon-right')) {
                        left = false;
                    }
                    var html = '';
                    if (item.hasAttr('icon')) {
                        html += '<i class="j-icon icon-' + item.attr('icon') + '"></i>';
                        item.removeAttr('icon');
                    }
                    if (item.hasAttr('title')) {
                        html += item.attr('title');
                        item.removeAttr('title');
                    }
                    var w = $J.ct('div.j-input-w').html('<div class="j-icon-w">' + html + '</div>');
                    item.className.split(' ').forEach(function (c) {
                        if (_class_list.has(c)) {
                            w.addClass(c);
                        }
                    });
                    item.before(w);
                    w.prepend(item);
                    var padding = w.child(1).wid() + 5;
                    if (left) {
                        item.css('padding-left', padding + 'px');
                    } else {
                        item.css('padding-right', padding + 'px');
                    }

                    // item.html('<i class="j-icon icon-'+item.attr('icon')+'"></i>'+item.html());
                    // item.removeAttr('icon')
                }
            });
        }
    };

    /* PROGRESS**********************************************************/
    JUI.PROGRESS = function (opt) {
        this.ele = opt.ele || null;
        this._value = opt.value || false;
        this.onchange = opt.onchange || function () { };
        this.value = opt.value || '';
        var _this = this;
        Object.defineProperty(_this, 'value', {
            configurable: true,
            get: function () {
                return _this._value;
            }, set: function (v) {
                _this._value = v;
                if (_this._value < 0) _this._value = 0;
                if (_this._value > 100) _this._value = 100;
                _this.onchange();
            }
        });
        this.init();
    };
    JUI.PROGRESS.prototype = _createEmpty();
    JUI.PROGRESS.prototype.init = function () {
        var _jui = this;
        var item = this.ele;
        _formatWidthAttr(item);
        // var pw = item.wid();
        var bar = $J.ct('div.j-progress-bar');
        item.append(bar);
        _jui.onchange = function () {
            _jui.rate = (_jui.value) / (100);
            bar.css('width', (_jui.rate * 100) + '%');
            item.attr('value', _jui._value);
            if (_jui._onchange) {
                var __t = _jui.jet || _jui;
                _jui._onchange.call(__t, {
                    ele: item,
                    value: _jui._value,
                    jui: _jui
                });
            }
        };
        if (item.hasAttr('value')) _jui._value = parseFloat(item.attr('value'));
        _jui._value = _jui.checkValue(_jui._value);
        _jui.onchange();
        item.attr('value', this._value);
        item.$jui = _jui;
    }; JUI.PROGRESS.prototype.checkValue = function (v) {
        if (v < 0) v = 0;
        if (v > 100) v = 100;
        return v;
    };
    JUI.PROGRESS._name = 'j-progress';
    JUI.PROGRESS.init = function (item) {
        getEleList(item, this._name).each(function (item) {
            if (!item._hasInitJui) {
                item._hasInitJui = true;
                new JUI.PROGRESS({ele: item});
            }
        });
    };

    $J.ready(function () {
        JUI.init();
    });
})();