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

function LoadProduct(e) {
    $('#main').load('product.html', function (response, status, xhr) {
        if (status == 'success') {
            var category, subcategory = e.target.id.substring(4, e.target.id.length).trim();

            switch (subcategory) {
                case 'product':
                    category = ''; subcategory = '';
                    MenuActive($('nav #nav-product'), 'All Products');
                    break;

                case 'category': case 'sex': case 'age':
                    category = subcategory;
                    subcategory = '';
                    break;

                default:
                    category = GetCategory(subcategory);
            }

            $('#breadcrumb-product-detail').empty();
            $('#breadcrumb-product-detail').append('<li class="breadcrumb-item"><a href="#" id="nav-product">All Products</a></li>');

            if (category) {
                var category_title = category.charAt(0).toUpperCase() + category.slice(1);
                $('#breadcrumb-product-detail').append(`<li class="breadcrumb-item"><a href="#" id="nav-${category}">${category_title}</a></li>`);

                MenuActive($(`nav #nav-${category}`), category_title);
            }

            if (subcategory) {
                var subcategory_title = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
                $('#breadcrumb-product-detail').append(`<li class="breadcrumb-item"><a href="#" id="nav-${subcategory}">${subcategory_title}</a></li>`);

                MenuActive($(`nav #nav-${subcategory}`), subcategory_title);
            }

            $.ajax({
                type: 'POST',
                url: '../php/product.php',
                data: {
                    category: category,
                    subcategory: subcategory
                },
                success: function (result) {
                    result = $.parseJSON(result);

                    ShowProduct(result);
                }
            });
        }
    });
}

$("#showAllProduct").ready(showProduct);

function showProduct() {
    $("#showAllProduct").empty();
    var products =
        [
            { id: 1, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 2, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 3, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 5, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 4, name: "helo", price: "$20", img: "../Pic/heo.jpg" }
        ];


    for (item of products) {
        var text = `<div class="col-4 sm">
        
                        <div class="card" id="heo">
                        
                            <div class="img-manual setBorder">
                            <div data-product-id='${item.id}'
                            id="view-details" style="text-decoration:none; color:black"><img src="${item.img}" 
                            class="img-fluid" alt="Responsive image"></div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title" id="product-id">${item.name}</h5>
                                <p class="card-text"></p>
                            </div>
                             <div class="card-footer">
                                <medium>${item.price}</medium>
                            </div>
                        </div>
                    </div>`;

        $("#showAllProduct").append(text);
    }
}

function showProduct_php() {
    $.ajax({
        type: "POST", url: "../php/product.php",
        success: function (result) {
            result = $.parseJSON(result);
            if (result) {
                showProduct(result);
            }
            else {
                return;
            }
        }
    });
}

$(document).on("click", "#view-details", ViewDetails);
function ViewDetails() {
    var id = parseInt($(this).data("product-id"));
    alert(id);
    
    var result =
        [
            { id: 1, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 2, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 3, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 5, name: "helo", price: "$20", img: "../Pic/heo.jpg" },
            { id: 4, name: "helo", price: "$20", img: "../Pic/heo.jpg" }
        ];
        
        var i = 0;
        for(i; i < result.length; i++) {
            alert(result[i].id);
            if(result[i].id == id) {
                break;
            }
        }
    
    $("#showAllProduct").empty();
    $("#product-details").empty();
    
    $("#product-details").load('product_detail.html', function(response, status, xhr) {
        if(status === 'success') {
            $('#product-details #img_01').attr('src', result[i].img);
            $('#product-details #product_name').text(result[i].name);
            $("#product_price").text((result[i].price));
        }
    });
    //location.href ='product_detail.html';

    /* 
    $.ajax ({
             type: "POST",
             url: "../php/product_detail.php",
             data: {id: id},
             success: function( result ) {
                 result = $.parseJSON(result);
                 
                            /*var text=
                        `<img src="../Pic/heo.jpg" alt="${result[0].name}">
                        <h5>dddd </h5>
                        <p>$111</p>
                        <a href="#" class="btn btn-success">Add to cart</a>`;  */                
                /* $("#product-details").append(text);*/
          //   }
         //});
         
}


function Login(e) {
    e.preventDefault();

    $.ajax({
        type: "POST",
        url: "../php/login.php",
        data: $("#frm-login").serialize(),
        success: function (result) {
            result = $.parseJSON(result);
            if (result.success) {
                alert("Fullname" + result.fullname + "\n" +
                    "Phone" + result.phone + "\n" +
                    "Birthday" + result.birthday + "\n" +
                    "Age" + result.age);
            }
            else {
                alert("Login unsuccessfully!");
            }
        }
    });
}


function Register(e) {
    e.preventDefault();

    if ($("#password").val() === $("#confirm-password").val()) {
        $.ajax({
            type: "POST",
            url: "../php/register.php",
            data: $("#frm-register").serialize(),
            success: function (result) {
                result = $.parseJSON(result);

                if (result.success) {
                    alert("Registered successfully!");
                    location.href = "login.html";
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

