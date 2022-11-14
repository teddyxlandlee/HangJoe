///////////////////////////

const SLEEP = 50; // ms
const TIMES = 20;

const queries = _squeries(window.location.href);

const _getQin = function(e) {
    var n = Number(queries[e]);
    if (n >= 0) return n;
    return NaN;
};

const _getQi = function(e) {
    var p = _getQin(e);
    return isNaN(p) ? 0 : p;
};

const _randint = function(min,max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
};

function rollMin(){return _getQi('mi');}
function rollMax(){return _getQi('ma');}

function getNewNumber() {
    return _randint(rollMin(), rollMax());
}

const _err = function() {
    document.getElementById('body').innerHTML =
        '<div class="mainNumber">Not enough arguments!';
    throw new Error('Not enough arguments!');
};

/*var _thr = false;
//if (!queries.words) _thr = true;
if (!_thr){
    var words = _readWordList(queries.words);
    if (!words) _thr = true;
}
if (_thr) _err()*/
var _doc = document.getElementById('main0').innerHTML;
var words = [];
document.getElementById('main0').innerHTML = 'Loading...'

if (!queries.wl) _err();
_readFromUrl(queries.wl, function(c) {
    words = _readWordList(c);
    document.getElementById('main0').innerHTML = _doc;
}, _err);


const _numeralId = function(i) {
    if (i > 0 && i <= 20) return String.fromCodePoint(0x245F + i);
    else return String(i);
};

// MAIN
function roll() {
    document.getElementById('wordLen').innerHTML = '';
    rollOne(TIMES, function(f) {
        var n = getNewNumber()
        document.getElementById('mainNumber').innerHTML = String(n);
        if (f) {
            var s = words[n-1];
            document.getElementById('wordLen').innerHTML =
            "<span onclick='showAns(\"" + s + "\")'>World Length: " + _numeralId(s.length) +
            "&nbsp;<span id='answer'></span></span>"
        }
    });
}

function showAns(s) {
    document.getElementById('answer').innerHTML = s
}

if (isNaN(_getQin('mi')) || isNaN(_getQin('ma'))) {
    document.getElementById('body').innerHTML ="<div class='mainNumber'>Not enough arguments!</div>";
}
