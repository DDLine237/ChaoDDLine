$(".nav-item").ready(Ready);
$(document).on("DOMContentLoaded", DOMLoaded);
$(document).on("submit", "#frm-login", Login);
$(document).on("submit", "#frm-register", Register);


function DOMLoaded() {
    $("#navbar").load("../html/menu.html");
}

function Ready() {
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

    $(".nav-item a").each(function () {
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

$("#showAllProduct").ready(showProduct);

function showProduct(){
    $("#showAllProduct").empty();
    var products=
    [
        {id:1, name:"helo", price:"$20", img:"../Pic/heo.jpg"},
        {id:2, name:"helo", price:"$20", img:"../Pic/heo.jpg"},
        {id:3, name:"helo", price:"$20", img:"../Pic/heo.jpg"},
        {id:3, name:"helo", price:"$20", img:"../Pic/heo.jpg"},
        {id:4, name:"helo", price:"$20", img:"../Pic/heo.jpg"}
    ];

    
    for(item of products){   
        var text = `<div class="col-4 sm">
                        <div class="card" id="heo">
                            <div class="img-manual setBorder">
                                <img src="${item.img}" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${item.name}</h5>
                                <p class="card-text"></p>
                            </div>
                             <div class="card-footer">
                                <small>${item.price}</small>
                            </div>
                        </div>
                    </div>`;
        
        $("#showAllProduct").append(text);
    }
}

function showProduct_php(){
    $.ajax({
        type: "POST", url: "../php/product.php",
        success: function(result){
            result = $.parseJSON(result);
            if(result){
                showProduct(result);
            }
            else{
                return;
            }
        }
    });


/*<a data-product-id='${item.id}' 
href*/


/*$(document).on("click","#btn-view-details", Viewdetails);
functions ViewDetails(product){
    var id=$(this).data("product-id");
    alert(id);
}*/

}
