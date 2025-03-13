SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

CREATE TABLE accidents (
   id int(11) NOT NULL,
   timestamp datetime DEFAULT NULL,
   location varchar(255) DEFAULT NULL,
   severity_level varchar(50) DEFAULT NULL,
   severity_score float DEFAULT NULL,
   video_path varchar(255) DEFAULT NULL,
   accuracy float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    session_token varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

DB_HOST = "localhost"
DB_USER = "root"
DB_PASSWORD = ""
DB_DATABASE = "accident_detection"
DB_PORT = 3306