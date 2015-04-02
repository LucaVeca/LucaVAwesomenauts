<?php
	//links to database.php
	require_once(__DIR__ . "/../model/config.php");
	
	

	//Table within the database
	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
		//columns in table
		//id
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		//title		
		. "title varchar(255) NOT NULL,"
		//post
		. "post text NOT NULL,"
		//way tables are connected to each other
		. "PRIMARY KEY(id))");

	if($query){
			
	}
	else {
		// echo "<p>" . $_SESSION["connection"]->error ."</p>";
	}

	$query = $_SESSION["connection"]->query("CREATE TABLE users ("
		//columns in table
		//id
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		//characters, for username, email, password	
		. "username varchar(30) NOT NULL,"
		. "email varchar(50) NOT NULL,"
		. "password varchar(128) NOT NULL,"
		. "salt char(128) NOT NULL,"
		. "DateTime datetime NOT NULL,"
		//way tables are connected to each other
		. "PRIMARY KEY(id))");

if($query){
			
	}
	else {
		// echo "<p>" . $_SESSION["connection"]->error ."</p>";
	}
