$(".menu_item").ready(Ready);
$(document).on("DOMContentLoaded", DOMLoaded);
$(document).on("submit", "#frm-login", Login);
$(document).on("submit", "#frm-register", Register);

function DOMLoaded() {
    $("#menubar").load("../html/menu.html");
}

function Ready() {
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

    $(".menu_item a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '') {
            $(this).addClass("active");
        }
    });
}
function Login(e) 
{
    e.preventDefault();

        $.ajax ({
            type: "POST",
            url: "../php/login.php",
            data: $("#frm-login").serialize(),
            success: function( result ) {
                result = $.parseJSON(result);
                if (result.success)
                {
                    alert("Fullname" + result.fullname + "\n" +
                        "Phone" + result.phone + "\n" +
                        "Birthday" + result.birthday + "\n" +
                        "Age" + result.age);
                }
                else
                {
                    alert("Login unsuccessfully!");
                }
            
            }
        });
    
}


function Register(e) 
{
    e.preventDefault();

    if($("#password").val() === $("#confirm-password").val()) {
        $.ajax ({
            type: "POST",
            url: "../php/register.php",
            data: $("#frm-register").serialize(),
            success: function( result ) {
                result = $.parseJSON(result);
                
                if(result.success) {
                    alert("Registered successfully!");
                    location.href="login.html";
                }
                else {
                    alert("Registered unsuccessfully!");
                }
            }
        });
    }
    else {
        $("#error").text("* Password mismatched.\n");
    }
}

/*$("#product-all").ready(showAllProduct);

function showAllProduct(){
    $.ajax ({
            type: "POST",
            url: "../php/product_all.php",
            success: function( result ) {
                result = $.parseJSON(result);
                displayProduct(result);
                }
            };)
}

function displayProduct(products){
$("#product-list").empty();

    var product=[{

    }];
for(item of products){
    var text='<div class="col-sm">
              <div class="card" style="width:18rem;"
                <img src="$(product[i].img}" class'
}*/
