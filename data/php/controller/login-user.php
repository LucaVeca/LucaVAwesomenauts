<?php
	
	require_once(__DIR__ . "/../model/config.php");

	$array = array{
		'exp'=> '',
		'exp1'=> '',
		'exp2'=> '',
		'exp3'=> '',
		'exp4'=> '',
	};

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
	//helps store data
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");

	//tels how many rows were retrieved from the database 
	if($query->num_rows == 1){
		//fetches array stored in query
		$row = $query->fetch_array();

		if($row["password"] === crypt($password, $row["salt"])){
			$_SESSION["authenticated"] = true;
			$array["exp"] = $row["exp"];
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];
			
			echo json_encode;($array);
			echo "<p>Login was successfull</p>";
		}
		else{
			echo "<p>Invalid username or password</p>";
		}
	}
	else{
		echo "<p>Invalid username or password</p>";
	}