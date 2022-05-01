<?php
    require 'vendor/autoload.php';
    use PHPMailer\PHPMailer\PHPMailer;

    $captcha = $_POST['g-recaptcha-response'];
    $secretKey = 'KEY';

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => [
            'secret' => $secretKey,
            'response' => $captcha,
            'remoteip' => $_SERVER['REMOTE_ADDR']
            ],
        CURLOPT_RETURNTRANSFER => true
    ]);

    $response = curl_exec($ch);
    
    curl_close($ch);

    $data = json_decode($response);

    if ($data->success == true) {
        $err = '';
        $to = 'kontakt@krzys-pobierowo.pl';
        
        if (array_key_exists('Imię', $_POST)) {
            $name = substr(htmlspecialchars($_POST['Imię']), 0, 255);
        } else {
            $name = '';
            $err = 'Bad name field ';
        }

        if (array_key_exists('Email', $_POST) && PHPMailer::validateAddress($_POST['Email'])) {
            $email = substr(htmlspecialchars($_POST['Email']), 0, 255);
        } else {
            $email = '';
            $err = 'Bad email field ';
        }
        
        if (array_key_exists('Telefon', $_POST)) {
            $phone = substr(htmlspecialchars($_POST['Telefon']), 0, 255);
        } else {
            $phone = '';
        }
        
        if (array_key_exists('Wiadomość', $_POST)) {
            $msg = substr(htmlspecialchars($_POST['Wiadomość']), 0, 500);
        } else {
            $msg = '';
            $err = 'Bad msg field ';
        }
        
        if (strcmp($err, '') === 0) {
            $mail = new PHPMailer();
            $mail->CharSet = PHPMailer::CHARSET_UTF8;
            $mail->setFrom($to);
            $mail->addAddress('edyta.1972@o2.pl');
            $mail->addReplyTo($email, $name);
            $mail->Subject = 'Zapytanie od: ' . $name;
            $mail->Body = $msg . "\nTelefon: " . $phone;
            
            if (!$mail->send()) {
                //echo 'Mailer Error: ' . $mail->ErrorInfo;
                http_response_code(418);
            } else {
                http_response_code(200);
            }
        } else {
            //echo 'err: ' . $err . ' detected';
            http_response_code(422);
        }
    } else {
       // echo 'Błąd Captcha';
       http_response_code(400);
    }
?>