<?php
require "login2.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - IMS566 Internship Tracker</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="login.css">

</head>
<body>

    <?php
    if (isset($failed)): 
    ?>
    <div class="alert alert-danger text-center">Invalid Username or Password</div>
    <?php 
    endif; 
    ?>

    

    <div class="bubbles">
        <img src="image/bubble.png">
        <img src="image/bubble.png">
        <img src="image/bubble.png">
        <img src="image/bubble.png">
        <img src="image/bubble.png">
        <img src="image/bubble.png">
        <img src="image/bubble.png">
    </div>

    <div class="title">
        <img class="my_title" src="image/win.avif">
        <h3>Universiti Teknologi Mara</h3>
    </div>

    <div class="login mt-1">
    <div class="login-card">
        <div class="logo-container">
            <img src="uitm logo.png" alt="UiTM Logo">
            <h5 class="mt-3 text-white">Internship Tracker</h5>
        </div>
        
        <form method="POST">
            <div class="mb-3">
                <label class="form-label text-white small fw-bold">USERNAME</label>
                <input type="text" class="form-control" name="username" placeholder="aiman" required>
            </div>
            <div class="mb-3">
                <label class="form-label text-white small fw-bold">PASSWORD</label>
                <input type="password" class="form-control" name="password" placeholder="1234" required>
            </div>
            
            <button type="submit" class="btn btn-primary w-100 mt-2">Sign In</button>
        </form>
        
        <div class="text-center mt-4 text-white small">
            &copy; 2025 IMS566 Project
        </div>
    </div>
</div>

    <footer class="mt-2 text-center small pb-4">
                <hr>
                <p>&copy; 2025 IMS566 Internship Tracker.</p>
                <div class="icon">
                    <a href="https://www.instagram.com/uitm.official/?hl=en"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.tiktok.com/@uitm_channel"><i class="fa-brands fa-tiktok"></i></a> 
                    <a href="https://www.facebook.com/uitmrasmi/"><i class="fa-brands fa-facebook"></i></a>
                    <a href="mailto:muhammadhafizzie04@gmail.com"><i class="fa-regular fa-message"></i></a>
                </div>
            </footer>

    

</body>
</html>