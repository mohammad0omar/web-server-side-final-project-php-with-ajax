<?php
require('library/php-excel-reader/excel_reader2.php');
require('library/SpreadsheetReader.php');

include('database.php');
    $mimes = array('application/vnd.ms-excel','text/xls','text/xlsx','application/vnd.oasis.opendocument.spreadsheet','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    if (in_array($_FILES["excel"]["type"], $mimes)) {
        $uploadFilePath = 'uploads/'.basename($_FILES['excel']['name']);

        move_uploaded_file($_FILES['excel']['tmp_name'], $uploadFilePath);
        
        $Reader = new SpreadsheetReader($uploadFilePath);
        $Reader->ChangeSheet(0);
        foreach ($Reader as $k=>$Row)
            {
                if($k>0){
                    $name = $Row[0]; 
                    $description = $Row[1]; 
                    $query = "INSERT INTO task (id , name, description) VALUES (NULL, '".$name."', '".$description."');";
                    $result = mysqli_query($connection, $query);
                    if (!$result) {
                         die('Query Failed.');
                    }
                }
               
            }
        var_dump("uploaded succefuly");
    }
    else {
        var_dump("invalid");
    }