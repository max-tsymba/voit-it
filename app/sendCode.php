<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require './PHPMailer/src/PHPMailer.php';
    require './PHPMailer/src/Exception.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->isHTML(true);

    $mail->setFrom('macesbeats@gmail.com');
    $mail->addAddress($_POST['register-mail']);
    $mail->Subject = 'VOIT';

    $body = '<h1 style="font-size: 18px">Код подтверждения</h1>';

    $body.= '<p><strong>4324234YT</strong></p>';

    $mail->Body = $body;

    if($mail->send()) {
        $message = 'Okay';
    } else {
        $message = 'Error';
    }

    $response = ['message' => $message];

    header('Content-Type: application/json');
    echo json_encode($response);

?>