$(document).on("submit", "#frm-login", Login);
$(document).on("submit", "#frm-register", Register);


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