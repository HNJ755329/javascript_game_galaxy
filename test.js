document.getElementById("a").innerHTML = "aaaa"

// $(function () {
//     $(window).mousemove(function () {
//         $('#txt1').val(event.clientX);
//         $('#txt2').val(event.clientY);
//     });
// });
let H = screen.width / 10
let W = screen.height / 10
let wall = new Array(H);
for (let x = 0; x < H; x++) {
    wall[x] = new Array(W).fill(".");
}

console.log(H, W, wall)

window.onload = function () {
    //マウス移動時のイベントをBODYタグに登録する
    document.body.addEventListener("mousemove", function (e) {

        //座標を取得する
        let mX = e.pageX;  //X座標
        let mY = e.pageY;  //Y座標

        document.getElementById("txtX").value = mX;
        document.getElementById("txtY").value = mY;
    });
    document.body.addEventListener("click", function (e) {
        //座標を取得する
        let mX = e.pageX;  //X座標
        let mY = e.pageY;  //Y座標

        let element = ""
        
        console.log(doc.offsetX, doc.offsetY)
        const size_of_height = 10
        const size_of_width = 10

        for (let _ = 0; _ < mY / size_of_height; _++) {
            element += " |<br>"
        }
        for (let _ = 0; _ < mX / size_of_width; _++) {
            element += "-"
        }
        element += "#"

        document.getElementById("a").innerHTML = element
    });
}