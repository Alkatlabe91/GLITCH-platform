import sqlite3

class UserTable:
    def __init__(self, db_path='database/database.db'):
        self.db_path = db_path
    def _connect(self):
        return sqlite3.connect(self.db_path)
    
    def create_user (self,username, password, email, first_name, last_name, profile_picture = None, IsTeacher = 0):
      conn = self._connect()
      conn.row_factory = sqlite3.Row
      cursor = conn.cursor()
      cursor.execute("""
            INSERT INTO users (username, password, email, first_name, last_name, profile_picture, IsTeacher)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (username, password, email, first_name, last_name, profile_picture, IsTeacher))
      conn.commit()
      user_id = cursor.lastrowid
      cursor.execute("SELECT * FROM users WHERE user_id = ?", (user_id,))
      user = cursor.fetchone()
      conn.close()  
      return dict(user)

    # remove unnecessary functions

    # def get_teacher_by_username_password(self, username, password):
    #   conn = self._connect()
    #   conn.row_factory = sqlite3.Row
    #   cursor = conn.cursor()
    #   cursor.execute("""SELECT * FROM users WHERE username = ? AND password = ?""", (username, password))
    #   user = cursor.fetchone()
    #   conn.close()
    #   dicUser = dict(user) if user else None
    #   return dicUser
    
    def get_teacher_by_username(self, username):
      conn = self._connect()
      conn.row_factory = sqlite3.Row
      cursor = conn.cursor()
      cursor.execute("""SELECT * FROM users WHERE username = ?""", (username,))
      user = cursor.fetchone()
      conn.close()
      dicUser = dict(user) if user else None
      return dicUser
     
    def get_teacher_by_email_password(self, email, password):
      conn = self._connect()
      conn.row_factory = sqlite3.Row
      cursor = conn.cursor()
      cursor.execute("""SELECT * FROM users WHERE email = ? AND password = ?""", (email, password))
      user = cursor.fetchone()
      conn.close()
      dicUser = dict(user) if user else None
      return dicUser
  
    def get_user_by_id(self, user_id):
      conn = self._connect()
      conn.row_factory = sqlite3.Row
      cursor = conn.cursor()
      cursor.execute("""SELECT * FROM users WHERE user_id = ?""", (user_id,))
      user = cursor.fetchone()
      conn.close()
      return dict(user) if user else None
    
    def get_user_by_username_sql_injection(self, username):
       conn = self._connect()
       conn.row_factory = sqlite3.Row
       cursor = conn.cursor()
       cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
       users = cursor.fetchall()
       all_users = [dict(user) for user in users]
       conn.close()
       return all_users
  
  
    def update_user_by_id(self, user_id, username, password, email, first_name, last_name, profile_picture, IsTeacher):
      conn = self._connect()
      conn.row_factory = sqlite3.Row
      cursor = conn.cursor()
      cursor.execute("""
                UPDATE users 
                SET username = ?, password = ?, email = ?, first_name = ?, last_name = ?, profile_picture = ?, IsTeacher = ? 
                WHERE user_id = ?
            """, (username, password, email, first_name, last_name, profile_picture, IsTeacher, user_id))     
      conn.commit()
      conn.close()

      
      
    def get_all_users(self):
      conn = self._connect()
      conn.row_factory = sqlite3.Row
      cursor = conn.cursor()
      cursor.execute("""SELECT * FROM users""")
      users = cursor.fetchall()
      conn.close()
      all_users = [dict(user) for user in users]
      return all_users