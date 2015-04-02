<?php
//helps organize code 
//moved classes here to help organize code and avoid repeating things
//classes are used to store variables known as properties, atributes or fields 
//defined by using one of the keywords public, protected, or private, followed by a normal variable declaration
//A class is useful for containing the code and the relevant data together, isolated from everything else
//classes are created because they can be used or called anywhere in your webpage and create an object
class Database{
	private $connection;
	private $host;
	private $username;
	private $password;
	private $database;
	public $error;

	//establishes connection to global variables
	public function __construct($host, $username, $password, $database){
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

		//conects with the classes in database.php
		$this->connection = new mysqli($host, $username, $password);

		//checks whether or not there was an error connecting to the database
		if($this->connection->connect_error){
			die("Error: "  . $this->connection->connect_error);

		}

		$exists = $this->connection->select_db($database);
	
		//checking if we could connect to database
		//! checks if database doesn't exist
		//creates database with sql
		if(!$exists){
			$query = $this->connection->query("CREATE DATABASE $database");

			if($query){
				echo "<p>Successfully created database; " . $database . "</p>";
			}
		}

		else{
			echo "Database has already been created";
		}

	}

	//A function is a block of statements that can be used repeatedly in a program.
	public function openConnection(){
		//establishes new connection
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

		//checks whether or not there was an error connecting to the database
		if($this->connection->connect_error){
			die("Error: "  . $this->connection->connect_error);

		}
	}

	public function closeConnection(){
		if(isset($this->connection)){
			$this->connection->close();
		}
		
	}

	public function query($string){
		$this->openConnection();

		//executes query on database
		$query = $this->connection->query($string);

		if(!$query){
			$this->error = $this->connection->error;
		}

		$this->closeConnection();

		return $query;
	}
}
