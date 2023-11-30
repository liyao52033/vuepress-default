function test() {
    if (typeof(window.console) == "undefined") {
        window.console = {
            log: function(msg) {
                alert(msg);
            }
        };
    }
}