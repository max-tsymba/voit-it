<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require './PHPMailer/src/PHPMailer.php';
    require './PHPMailer/src/Exception.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->isHTML(true);

    $mail->setFrom($_POST['email'], $_POST['name']);
    $mail->addAddress('young.bezero@gmail.com');
    $mail->Subject = 'Форма VOIT';

    $body = '<h1>Форма отзыва</h1>';

    if(trim(!empty($_POST['name']))) {
        $body.= '<p><strong>Имя: </strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['surname']))) {
        $body.= '<p><strong>Фамилия: </strong> '.$_POST['surname'].'</p>';
    }

    if(trim(!empty($_POST['email']))) {
        $body.= '<p><strong>Почта: </strong> '.$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['mess']))) {
        $body.= '<p><strong>Сообщение: </strong> '.$_POST['mess'].'</p>';
    }

  
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