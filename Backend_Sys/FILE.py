import mysql.connector

# Define the database connection parameters
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASSWORD = ''
DB_DATABASE = 'accident_detection'
DB_PORT = 3306

def get_db_connection():
    """Establish a connection to the MySQL database."""
    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_DATABASE,
            port=DB_PORT
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
        return None

def check_db_connection():
    """Check if we are connected to the database."""
    conn = get_db_connection()
    if conn is not None:
        print("Connected to the database!")
        conn.close()
    else:
        print("Not connected to the database.")

if __name__ == "__main__":
    check_db_connection()