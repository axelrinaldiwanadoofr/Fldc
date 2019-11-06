<?php
    // Ajout de la directive CORS
    header( "Access-Control-Allow-Origin:*") ;

    include 'config.php';

    //session_start() ;

    $fileName = $_FILES["file"]["name"] ;
    $fileTmpName = $_FILES["file"]["tmp_name"] ;
    $fileType = $_FILES["file"]["type"] ;
    $fileSize = $_FILES["file"]["size"] ;
    $fileError = $_FILES["file"]["error"] ;
    
    $articleid = $_POST["articleid"] ;
    
    if( !$fileError )
    {
        $t = explode( ".", $fileName ) ;
        //$newFileType = $t[1] ;
        $newFileName = "I_" . $articleid . "_" . date('Ymd-his', time()) . ".jpg" ;
        $newFilePath = "images/" . $newFileName ;
        if( move_uploaded_file($fileTmpName, $newFilePath ) ) 
        {
            
            echo "{\"status\":\"ok\", \"fileURL\":\"" . $newFilePath . "\", \"fileName\":\"" . $newFileName . "\", \"articlid\":\"" . $articleid . "\"}" ;
        }
        else
        {
            echo "{\"status\":\"error\", \"message\":\"Ne trouve pas le fichie\"}" ;            
        }
    }
?>
