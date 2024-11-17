var idd = "noble@gmail.com";
var pswd = "123456";

function validate() {
    var iddd = document.getElementById("email").value;
    var pswdd = document.getElementById("pswd").value;

    if (iddd === idd && pswdd === pswd) {
        window.location.assign("moops.html");
    } else {
        alert("Invalid Email or Password!");
    }
}
