function test() {
    var message = "hi"
}
test();
alert(message);
// 2.
function test1() {
    console.log(
        typeof (1),
        typeof (""),
        typeof (null),
        typeof (undefined),
        typeof ([]),
        typeof ([1]),
        typeof ({}),
        typeof (function t() { }),
        typeof (!!"1"),
        typeof (![])
    )
}
test1();