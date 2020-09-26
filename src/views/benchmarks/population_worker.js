onmessage = function(e) {
    var count = e.data;
    var array = [];
    for(var i = 0; i < count; i++) {
        array[i] = Math.floor(Math.random() * 100);
    }
    postMessage(array);
}