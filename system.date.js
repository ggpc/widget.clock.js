(function(module){
    /**
        %d   Day of the month, 2 digits with leading zeros   01 to 31
        %D   A textual representation of a day, three letters    Mon through Sun
        %j   Day of the month without leading zeros  1 to 31
        %l (lowercase 'L')   A full textual representation of the day of the week    Sunday through Saturday
        %N   ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)     1 (for Monday) through 7 (for Sunday)
        %S   English ordinal suffix for the day of the month, 2 characters   st, nd, rd or th. Works well with j
        %w   Numeric representation of the day of the week   0 (for Sunday) through 6 (for Saturday)
        %F   A full textual representation of a month, such as January or March  January through December
        %m   Numeric representation of a month, with leading zeros   01 through 12
        %M   A short textual representation of a month, three letters    Jan through Dec
        %n   Numeric representation of a month, without leading zeros    1 through 12
        %Y   A full numeric representation of a year, 4 digits   Examples: 1999 or 2003
        %y   A two digit representation of a year    Examples: 99 or 03
        %a   Lowercase Ante meridiem and Post meridiem   am or pm
        %A   Uppercase Ante meridiem and Post meridiem   AM or PM
        %g   12-hour format of an hour without leading zeros     1 through 12
        %G   24-hour format of an hour without leading zeros     0 through 23
        %h   12-hour format of an hour with leading zeros    01 through 12
        %H   24-hour format of an hour with leading zeros    00 through 23
        %i   Minutes with leading zeros  00 to 59
        %s   Seconds, with leading zeros     00 through 59
    */
    // langs
    var langs = ['en', 'ru', 'ua'];
    var super_default_lang = 'en';
    var default_lang = 'en';

    // format
    var date_format = '%d.%m.%Y %H:%i:%s';

    // week days
    var WeekDays = {'l': {}, 'D': {}, 'N': [], 'w': []};
    // week days: w
    WeekDays.w = [0, 2, 3, 4, 5, 6];
    // week days: N
    WeekDays.N = [7, 1, 2, 3, 4, 5, 6];
    // week days: D
    WeekDays.D.en = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    WeekDays.D.ru = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    WeekDays.D.ua = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    // week days: l
    WeekDays.l.en = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    WeekDays.l.ru = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    WeekDays.l.ua = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];

    // month
    var Months = {'F': {}, 'm': [], 'M': {}, 'n': []};
    // month: F
    Months.F.en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    Months.F.ru = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    Months.F.ua = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    // month: M
    Months.M.en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    Months.M.ru = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    Months.M.ua = ['Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер', 'Вер', 'Жов', 'Лис', 'Гру'];
    // month: m
    Months.m = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    // month: n
    Months.n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    // days
    var Days = {'d': [], 'j': []};
    // days: d
    Days.d = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    // days: j
    Days.j = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    // hours
    var Hours = {'g': [], 'G': [], 'h': [], 'H': []};
    // hours: g
    Hours.g = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    // hours: G
    Hours.G = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    // hours: h
    Hours.h = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
    // hours: H
    Hours.H = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

    var date_formatted = function(str, dt, lang){
        var local_date_cache = date_cache;
        if(typeof lang == 'undefined' || langs.indexOf(lang) == -1){
            lang = default_lang;
        }else{
            local_date_cache = create_date_cache(lang);
        }
        if(dt instanceof Date === false){
            switch(typeof dt){
                case 'number':
                    dt = new Date(dt);
                    break;
                case 'string':
                    dt = new Date(dt);
                    break;
                default:
                    dt = new Date();
                    break;
            }
        }
        if(typeof str != 'string'){
            str = date_format;
        }

        var hour = dt.getHours();
        var minute = dt.getMinutes();
        var seconds = dt.getSeconds();
        var weekday = dt.getDay();
        var day = dt.getDate();
        var month = dt.getMonth();
        var year = dt.getFullYear();


        var current_cache = {};
        current_cache['Y'] = String(year);
        current_cache['y'] = current_cache['Y'].substr(2);
        current_cache['i'] = minute>9?String(minute):'0'+String(minute);
        current_cache['s'] = seconds>9?String(seconds):'0'+String(seconds);
        current_cache['a'] = hour<13?'am':'pm';
        current_cache['A'] = hour<13?'AM':'PM';

        var val;
        for(var i in local_date_cache){
            switch(i){
                case 'w':
                case 'W':
                case 'D':
                case 'l':
                    val = weekday;
                    break;
                case 'F':
                case 'M':
                case 'm':
                case 'n':
                    val = month;
                    break;
                case 'd':
                case 'j':
                    val = day+1;
                    break;
                case 'g':
                case 'G':
                case 'h':
                case 'H':
                    val = hour;
                    break;
            }
            current_cache[i] = local_date_cache[i][val];
        }
        // apply to format string
        for(var i in current_cache){
            str = str.replace('%'+i, current_cache[i]);
        }
        return str;
    };
    module.date_formatted = date_formatted;

    var date_cache = {};
    var set_date_language = function(lang){
        if(langs.indexOf(lang) > -1){
            default_lang = lang;
        }
        date_cache = create_date_cache(default_lang);
    };
    module.set_date_language = set_date_language;

    var set_date_format = function(str){
        date_format = str;
    };
    module.set_date_format = set_date_format;

    var create_date_cache = function(lang){
        var result = {
            'w': WeekDays.w,
            'N': WeekDays.N,
            'D': typeof WeekDays.D[lang] == 'undefined'?WeekDays.D[default_lang]:WeekDays.D[lang],
            'l': typeof WeekDays.l[lang] == 'undefined'?WeekDays.L[default_lang]:WeekDays.l[lang],
            'F': typeof Months.F[lang] == 'undefined'?Months.F[default_lang]:Months.F[lang],
            'M': typeof Months.M[lang] == 'undefined'?Months.M[default_lang]:Months.M[lang],
            'm': Months.m,
            'n': Months.n,
            'd': Days.d,
            'j': Days.j,
            'g': Hours.g,
            'G': Hours.G,
            'h': Hours.h,
            'H': Hours.H
        };
        return result;
    };
    // initialization
    set_date_language(default_lang);
})(typeof module == 'object'?module:window);
