const SLEEP = 50; // ms
const TIMES = 60;

const queries = _squeries(window.location.href);

var _doc = document.getElementById('main0').innerHTML;
var words = {};
document.getElementById('main0').innerHTML = 'Loading...';
var maxNum0 = -1;

if (!queries.wl) _err();
_readFromUrl(queries.wl, function(c) {
    //words = _readWordList(c);
    var ss = Base64.decode(c);
    var w0 = JSON.parse(ss);
    words = {};
    let i = 0;
    for (x in w0) {
        i = i + w0[x];
        words[x] = i;
    }
    maxNum0 = i;

    document.getElementById('main0').innerHTML = _doc;
}, _err);

function roll() {
    //TODO RANDOM
    //document.getElementById('wordLen').innerHTML = '';
    rollOne(TIMES, function(f) {
        if (!f) {
            var l = _randint(10000000, 99999999);
            document.getElementById('mainNumber').innerHTML = String(l);
        } else {
            var l = _randint(0, maxNum0 - 1);
            var cc = '???';
            var dd = -1;
            for (x in words) {
                let ee = words[x]; // int
                if (ee > dd && ee <= l) {
                    dd = ee;
                    cc = x;
                }
            }
            //var l = _randint(0, words.keys.length)
            //var r = words[words.keys[l]];
            //if (r == null) window.location.href = 'https://shattereddisk.github.io/rickroll/rickroll.mp4';
            document.getElementById('mainNumber').innerHTML = String(x);
        }
    });
}