// imported base64.min.js

const _squeries = function(str) {
    var s = new URL(str).search;
    if (/^\s*$/.test(s)) return {};
    s = s.substring(1);
    var o = {};
    s.split('&').filter(function(v,i,a){return !/^\s*$/.test(v)}).forEach(function(v,i,a) {
        if (v.indexOf('=') >= 0) {
            var spl = v.split('=');
            o[spl[0]] = spl[1];
        } else {
            o[v] = '';
        }
    });
    return o;
};

const _readWordList = function(p /*string*/) {
    var d /*string*/ = Base64.decode(p);
    var l = [];
    d.split(/[\r\n]+/).filter(function(v,i,a){return !/^\s*$/.test(v)}).forEach(function(v,i,a) {
        if (!/^[a-z]+$/.test(v)) {
            window.alert("invalid word #" + i + ": " + v + " should be alphabetic");
        }
        l.push(v.trim());
    });
    return l;
};

function _readFromUrl(url, callback /*String -> Unit*/, fail /*function | undefined*/) {
    var req = new XMLHttpRequest();
    req.responseType = 'text'
    req.open('POST', url);
    req.onload = function() {
        let resp = req.response;
        callback(String(resp));
    };
    if (fail) {
        req.onerror(fail());
        req.onabort(fail());
    }
}

function rollOne(timesLeft, finalTask) {
    /*if (timesLeft == 0) finalTask(true);
    _sleep(SLEEP, function() {
        finalTask(false);
        rollOne(timesLeft - 1, finalTask);
    })*/
    var time0 = timesLeft;
    var interval0 = setInterval(function() {
        if (time0 == 0) {
            finalTask(true);
            clearInterval(interval0);
        } else {
            finalTask(false);
            time0--;
        }
    }, SLEEP);
}
