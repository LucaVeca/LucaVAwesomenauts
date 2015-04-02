<?php
	require_once(__DIR__."/database.php");
	session_start();
	//continuously regenerates id
	session_regenerate_id(true);

	$path = "/Awesomenauts/php/";

	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";

	
	//gets rid of "Database already exists"
	if(!isset($_SESSION["connection"])){
		$connection = new Database($host, $username, $password, $database);
		$_SESSION["connection"] = $connection;
	}