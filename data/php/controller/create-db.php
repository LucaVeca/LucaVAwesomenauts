<?php
	//links to database.php
	require_once(__DIR__ . "/../model/config.php");

	$query = $_SESSION["connection"]->query("CREATE TABLE users ("
		//columns in table
		//id
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		//characters, for username, email, password	
		. "username varchar(30) NOT NULL,"
		. "email varchar(50) NOT NULL,"
		. "password varchar(128) NOT NULL,"
		. "salt char(128) NOT NULL,"
		. "exp int(4),"
		. "exp1 int(4),"
		. "exp2 int(4),"
		. "exp3 int(4),"
		. "exp4 int(4),"
		. "DateTime datetime NOT NULL,"
		//way tables are connected to each other
		. "PRIMARY KEY(id))");

if($query){
			
	}
	else {
		// echo "<p>" . $_SESSION["connection"]->error ."</p>";
	}
