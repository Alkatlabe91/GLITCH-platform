import sqlite3
from collections import defaultdict
from datetime import datetime

class DomainTable:
    def __init__(self, db_path='database/database.db'):
        self.db_path = db_path
    def _connect(self):
        return sqlite3.connect(self.db_path)
    
    def create_domain(self,domain_name ):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO domains (domain_name) VALUES (?)""", (domain_name,))
        conn.commit()
        domain_id = cursor.lastrowid
        conn.close()
        return dict({"domain_id": domain_id ,"domain_name":domain_name})

    def create_course(self,domain_id,course_name,description ):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO courses (domain_id,course_name,description) VALUES (?,?,?)""", (domain_id,course_name,description,))
        conn.commit()
        course_id = cursor.lastrowid
        cursor.execute("""SELECT * FROM courses WHERE course_id = ?""", (course_id,))
        course = cursor.fetchone()
        conn.close()
        return dict(course)
    
    def get_analytics_data(self):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        users = conn.execute('SELECT * FROM users').fetchall()
        courses = conn.execute('SELECT * FROM courses').fetchall()
        instances = conn.execute('SELECT * FROM instances').fetchall()
        modules = conn.execute('SELECT * FROM modules').fetchall()
        activities = conn.execute('SELECT * FROM activities').fetchall()
        user_modules = conn.execute('SELECT * FROM usermodules').fetchall()
        user_progress_modules = conn.execute('SELECT * FROM userprogressmodules').fetchall()
        conn.close()
        return {
        'users': [dict(user) for user in users],
        'courses': [dict(course) for course in courses],
        'instances': [dict(instance) for instance in instances],
        'modules': [dict(module) for module in modules],
        'activities': [dict(activity) for activity in activities],
        'user_modules': [dict(user_module) for user_module in user_modules],
        'user_progress_modules': [dict(user_progress_module) for user_progress_module in user_progress_modules],
    }
          

    def get_modules_by_instance_id(self, instance_id):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
    SELECT 
        m.module_id, 
        m.module_name, 
        m.description AS module_description, 
        m.required_point, 
        i.instance_id, 
        i.instance_name, 
        i.start_date, 
        i.end_date,
        i.course_id,
        c.course_name, 
        c.description AS course_description
    FROM 
        modules m
    LEFT JOIN 
        instances i ON m.instance_id = i.instance_id
    LEFT JOIN 
        courses c ON i.course_id = c.course_id
    WHERE 
        i.instance_id = ?
""", (instance_id,))
        modules = cursor.fetchall()
        return [dict(module) for module in modules]
    
    def get_activities_by_module_id(self, module_id):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""SELECT * FROM activities WHERE module_id = ? """, (module_id,))
        activities = cursor.fetchall()
        return [dict(activity) for activity in activities]
    
    def get_instances_by_course_id(self, course_id):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""SELECT 
                i.instance_id, 
                i.instance_name, 
                i.start_date, 
                i.end_date, 
                c.course_id, 
                c.course_name, 
                c.description AS course_description
            FROM 
                instances i
            LEFT JOIN 
                courses c ON i.course_id = c.course_id
            WHERE 
                c.course_id = ? """, (course_id,))
        instances = cursor.fetchall()
        return [dict(instance) for instance in instances]
    

    def create_usermodules(self,user_id,module_id):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO usermodules (user_id,module_id) VALUES (?,?)""", (user_id,module_id,))
        conn.commit()
        conn.close()

    def create_userprogressmodule(self, user_activity_id, reviwed_by=None, submitted=0, finished=0, passed=0):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO userprogressmodules (user_activity_id, reviwed_by, submited, finished, passed)
            VALUES (?, ?, ?, ?, ?)
            """,
            (user_activity_id, reviwed_by, submitted, finished, passed)
        )
        conn.commit()   
        conn.close()


    def register_usermodules(self,user_id,module_id):
        self.create_usermodules(user_id,module_id)
        activities = self.get_activities_by_module_id(module_id)
        for activity in activities:
            activity_id = activity["activity_id"]
            self.create_userprogressmodule(user_activity_id=activity_id)
    
    def get_userprogressmodules_by_module_id(self,module_id):
     conn = self._connect()
     conn.row_factory = sqlite3.Row
     cursor = conn.cursor()
     query = '''
  SELECT 
    upm.user_progress_module_id,
    upm.user_activity_id,
    upm.reviwed_by,
    upm.submited,
    upm.finished,
    upm.passed,
    a.activity_name,
    a.description AS activity_description,
    a.level,
    a.type,
    a.point,
    m.module_name,
    m.module_id,
    m.description AS module_description,
    i.instance_id, 
    i.instance_name,
    c.course_id,
    c.course_name,
    c.description AS course_description,
    d.domain_id,
    d.domain_name,
    u.first_name,
    u.last_name,
    up.user_post_id,
    up.content AS post_content
FROM 
    userprogressmodules upm
JOIN 
    activities a ON upm.user_activity_id = a.activity_id
JOIN 
    modules m ON a.module_id = m.module_id
JOIN 
    instances i ON i.instance_id = m.instance_id
JOIN 
    courses c ON c.course_id = i.course_id
JOIN 
    domains d ON d.domain_id = c.domain_id
LEFT JOIN 
    users u ON upm.reviwed_by = u.user_id
LEFT JOIN 
    userposts up ON upm.user_progress_module_id = up.user_progress_module_id
WHERE 
    m.module_id = ?


    '''
     cursor.execute(query,(module_id,))
     modules = cursor.fetchall()
     return [dict(module) for module in modules]


    def create_instance(self,course_id,instance_name,start_date,end_date):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO instances (course_id,instance_name,start_date,end_date) VALUES (?,?,?,?)""", (course_id,instance_name,start_date,end_date,))
        conn.commit()
        instance_id = cursor.lastrowid
        cursor.execute("""SELECT * FROM instances WHERE instance_id = ?""", (instance_id,))
        instance = cursor.fetchone()
        conn.close()
        return dict(instance)

    def create_modules(self,instance_id,module_name,description,required_point):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO modules (instance_id,module_name,description,required_point) VALUES (?,?,?,?)""", (instance_id,module_name,description,required_point,))
        conn.commit()
        module_id = cursor.lastrowid
        cursor.execute("""SELECT * FROM modules WHERE module_id = ?""", (module_id,))
        module = cursor.fetchone()
        conn.close()
        return dict(module)
    

    def create_activities(self, module_id, activity_name, description, level, activity_type, point):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        try:
            cursor.execute("""
                INSERT INTO activities (module_id, activity_name, description, level, type, point)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (module_id, activity_name, description, level, activity_type, point))
            conn.commit()
            activity_id = cursor.lastrowid
            cursor.execute("""
                SELECT user_id FROM usermodules WHERE module_id = ?
            """, (module_id,))
            user_ids = cursor.fetchall()
            for user_id_tuple in user_ids:
                user_id = user_id_tuple['user_id']
                cursor.execute("""
                    INSERT INTO userprogressmodules (user_activity_id, reviwed_by, submited, finished, passed)
                    VALUES (?, NULL, 0, 0, 0)
                """, (activity_id,))
            
            conn.commit()
            cursor.execute("""
                SELECT * FROM activities WHERE activity_id = ?
            """, (activity_id,))
            activity = cursor.fetchone()
        except sqlite3.Error as e:
            conn.rollback()
            return None
        finally:
            conn.close()
        return dict(activity)
    


    def get_all_domains_joined_with_courses(self):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        query = """
            SELECT
              d.domain_id,
              d.domain_name,
              c.course_id,
              c.course_name,
              c.description AS course_description,
              i.instance_id,
              i.instance_name,
              i.start_date AS instance_start_date,
              i.end_date AS instance_end_date,
              m.module_id,
              m.module_name,
              m.description AS module_description,
              m.required_point,
              a.activity_id,
              a.activity_name,
              a.description AS activity_description,
              a.level,
              a.type,
              a.point
            FROM
              domains d
            LEFT JOIN
              courses c ON d.domain_id = c.domain_id
            LEFT JOIN
              instances i ON c.course_id = i.course_id
            LEFT JOIN
              modules m ON i.instance_id = m.instance_id
            LEFT JOIN
              activities a ON m.module_id = a.module_id
            ORDER BY
              d.domain_id, c.course_id, i.instance_id, m.module_id, a.activity_id;
            """
            
        cursor.execute(query)
        rows = cursor.fetchall()

        domains_dict = defaultdict(lambda: {"domain_id": None, "domain_name": None, "courses": []})
        
        for row in rows:
            domain_id = row["domain_id"]
            course_id = row["course_id"]
            instance_id = row["instance_id"]
            module_id = row["module_id"]
            activity_id = row["activity_id"]
            
            if domains_dict[domain_id]["domain_id"] is None:
                domains_dict[domain_id]["domain_id"] = domain_id
                domains_dict[domain_id]["domain_name"] = row["domain_name"]
            
            courses = domains_dict[domain_id]["courses"]
            course = next((c for c in courses if c["course_id"] == course_id), None)
            if not course:
                course = {
                    "course_id": course_id,
                    "course_name": row["course_name"],
                    "course_description": row["course_description"],
                    "instances": []
                }
                courses.append(course)
            
            instances = course["instances"]
            instance = next((i for i in instances if i["instance_id"] == instance_id), None)
            if not instance:
                instance = {
                    "instance_id": instance_id,
                    "instance_name": row["instance_name"],
                    "instance_start_date": row["instance_start_date"],
                    "instance_end_date": row["instance_end_date"],
                    "modules": []
                }
                instances.append(instance)
            
            modules = instance["modules"]
            module = next((m for m in modules if m["module_id"] == module_id), None)
            if not module:
                module = {
                    "module_id": module_id,
                    "module_name": row["module_name"],
                    "module_description": row["module_description"],
                    "required_point": row["required_point"],
                    "activities": []
                }
                modules.append(module)
            
            activities = module["activities"]
            activity = next((a for a in activities if a["activity_id"] == activity_id), None)
            if not activity:
                activity = {
                    "activity_id": activity_id,
                    "activity_name": row["activity_name"],
                    "activity_description": row["activity_description"],
                    "level": row["level"],
                    "type": row["type"],
                    "point": row["point"]
                }
                activities.append(activity)
        
        all_domains = list(domains_dict.values())
        
        return all_domains
    
    
    def get_registered_domain_by_usermodules(self, user_id):
     conn = self._connect()
     conn.row_factory = sqlite3.Row
     cursor = conn.cursor()
     cursor.execute("""
        SELECT domains.*, courses.*, modules.*, activities.*
        FROM usermodules
        JOIN modules ON usermodules.module_id = modules.module_id
        JOIN instances ON modules.instance_id = instances.instance_id
        JOIN courses ON instances.course_id = courses.course_id
        JOIN domains ON courses.domain_id = domains.domain_id
        JOIN activities ON modules.module_id = activities.module_id
        WHERE usermodules.user_id = ?
    """, (user_id,))
     result = cursor.fetchone()
     conn.close()
     return result


    def get_all_courses(self):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""SELECT * FROM courses""")
        courses = cursor.fetchall()
        conn.close()
        all_courses = [dict(course) for course in courses]
        return all_courses
    
    
    def register_user_in_module(self, user_id, module_id):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO usermodules (user_id, module_id) VALUES (?, ?)""", (user_id, module_id))
        
        cursor.execute("""
            SELECT activity_id
            FROM activities
            WHERE module_id = ?
        """, (module_id,))
        activities = cursor.fetchall()
        
        for activity in activities:
            activity_id = activity['activity_id']
            cursor.execute("""
                INSERT INTO userprogressmodules (user_activity_id, reviwed_by, submited, finished, passed)
                VALUES (?, NULL, 0, 0, 0)
            """, (activity_id,))

        conn.commit()
        conn.close()
    
    def submit_user_progress_module_id(self,user_progress_module_id):
     conn =  self._connect()
     conn.row_factory = sqlite3.Row
     cursor = conn.cursor()
     query = """
      UPDATE userprogressmodules
      SET submited = 1, finished = 1
      WHERE user_progress_module_id = ?
    """
     cursor.execute(query, (user_progress_module_id,))
     conn.commit()
     conn.close()

    def mark_user_progress_module_as_failed(self,reviwed_by,user_progress_module_id):
     conn =  self._connect()
     conn.row_factory = sqlite3.Row
     cursor = conn.cursor()
     query = """
      UPDATE userprogressmodules
      SET passed = 0, reviwed_by = ? 
      WHERE user_progress_module_id = ?
    """
     cursor.execute(query, (reviwed_by,user_progress_module_id,))
     conn.commit()
     conn.close()

    def mark_user_progress_module_as_passed(self,reviwed_by,user_progress_module_id):
     conn =  self._connect()
     conn.row_factory = sqlite3.Row
     cursor = conn.cursor()
     query = """
      UPDATE userprogressmodules
      SET passed = 1, reviwed_by = ? 
      WHERE user_progress_module_id = ?
    """
     cursor.execute(query, (reviwed_by,user_progress_module_id,))
     conn.commit()
     conn.close()


    def get_requested_tasks(self):
      conn =  self._connect()
      conn.row_factory = sqlite3.Row
      cursor = conn.cursor()
      query= """SELECT upm.user_progress_module_id, upm.user_activity_id, upm.reviwed_by, upm.submited, upm.finished, upm.passed,
       a.activity_name, a.description AS activity_description, a.level AS activity_level, a.type AS activity_type, a.point AS activity_point,
       m.module_id, m.module_name, m.description AS module_description, m.required_point,
       i.instance_id, i.instance_name, i.start_date, i.end_date,
       c.course_id, c.course_name, c.description AS course_description,
       u.user_id, u.username, u.password, u.email, u.first_name, u.last_name, u.profile_picture, u.IsTeacher, u.registration_date
       FROM userprogressmodules upm
       JOIN activities a ON upm.user_activity_id = a.activity_id
       JOIN modules m ON a.module_id = m.module_id
       JOIN instances i ON m.instance_id = i.instance_id
       JOIN courses c ON i.course_id = c.course_id
       JOIN usermodules um ON m.module_id = um.module_id
       JOIN users u ON um.user_id = u.user_id
       WHERE upm.submited = 1;
       """
      cursor.execute(query)
      requests = cursor.fetchall()
      conn.close()
      return  [dict(req) for req in requests]
    
    def get_registered_modules(self,user_id):
     conn = self._connect()
     conn.row_factory = sqlite3.Row
     cursor = conn.cursor()
     query = '''
     SELECT 
        domains.domain_name,
        courses.course_name,
        modules.module_name,
        modules.module_id,
        activities.activity_name,
        activities.point,
        userprogressmodules.passed,
        userprogressmodules.reviwed_by


     FROM 
        userprogressmodules
     JOIN 
        activities ON userprogressmodules.user_activity_id = activities.activity_id
     JOIN 
        modules ON activities.module_id = modules.module_id
     JOIN 
        instances ON modules.instance_id = instances.instance_id
     JOIN 
        courses ON instances.course_id = courses.course_id
     JOIN 
        domains ON courses.domain_id = domains.domain_id
     JOIN 
        usermodules ON modules.module_id = usermodules.module_id
     JOIN 
        users ON usermodules.user_id = users.user_id
     WHERE 
        users.user_id = ?
    '''

     cursor.execute(query, (user_id,))
     results = cursor.fetchall()
     conn.close()
     return  [dict(req) for req in results]
    

    def create_user_progress_post(self,user_progress_module_id,content):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO userposts (user_progress_module_id, content) VALUES (?, ?)""", (user_progress_module_id,content))
        conn.commit()
        conn.close()    

    def create_userpostcomments(self,user_id,user_post_id,comment):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""INSERT INTO userpostcomments (user_id,user_post_id,comment) VALUES (?, ?, ?)""", (user_id,user_post_id,comment))
        conn.commit()
        conn.close()
    


    def get_all_user_posts(self):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        query = """SELECT 
           userposts.user_post_id ,
            userposts.content,
               users.user_id,
               users.first_name,
               users.last_name
           FROM 
               userposts
           JOIN 
               userprogressmodules ON userposts.user_progress_module_id = userprogressmodules.user_progress_module_id
           JOIN 
               users ON userprogressmodules.reviwed_by = users.user_id
           """
        cursor.execute(query)
        results = cursor.fetchall()
        conn.close()
        return  [dict(post) for post in results]


    def get_all_user_postscomments(self):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        query = """SELECT 
           userpostcomments.user_post_comment_id ,
           userpostcomments.user_id,
           userpostcomments.user_post_id ,
           userpostcomments.comment,
               users.user_id,
               users.first_name,
               users.last_name
           FROM 
               userpostcomments
           JOIN 
               users ON userpostcomments.user_id = users.user_id
           """
        cursor.execute(query)
        results = cursor.fetchall()
        conn.close()
        return  [dict(post) for post in results]       
       
    def get_userpost_with_comments(self):
        all_posts = self.get_all_user_posts()
        all_comments = self.get_all_user_postscomments()
        
        post_comments_dict = {}

        for post in all_posts:
            post_id = post['user_post_id']
            post_comments_dict[post_id] = {
                'post': post,
                'comments': {}
            }
        
        for comment in all_comments:
            post_id = comment['user_post_id']
            emoji = comment['comment']
            user_name = f"{comment['first_name']} {comment['last_name']}"
            if post_id in post_comments_dict:
                if emoji not in post_comments_dict[post_id]['comments']:
                    post_comments_dict[post_id]['comments'][emoji] = {'count': 0, 'users': []}
                post_comments_dict[post_id]['comments'][emoji]['count'] += 1
                post_comments_dict[post_id]['comments'][emoji]['users'].append(user_name)
        
        grouped_posts = list(post_comments_dict.values())

        return grouped_posts

    def get_unfinished_progress_modules(self):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        query = """ 
    SELECT u.user_id, c.course_name, i.end_date, i.instance_name , m.module_id, upm.finished
    FROM users u
    JOIN usermodules um ON u.user_id = um.user_id
    JOIN modules m ON um.module_id = m.module_id
    JOIN instances i ON m.instance_id = i.instance_id
    JOIN courses c ON c.course_id = i.course_id
    LEFT JOIN activities a ON m.module_id = a.module_id
    LEFT JOIN userprogressmodules upm ON a.activity_id = upm.user_activity_id
           """
        cursor.execute(query)
        rows = cursor.fetchall()
        user_progress = {}
        messeges = []
        current_date = datetime.now()
        for row in rows:
            user_id,course_name, end_date, instance_name, module_id, finished = row
            if user_id not in user_progress:
                user_progress[user_id] = {
                'end_date': datetime.strptime(end_date, '%Y-%m-%d'),
                 'instance_name': instance_name,
                  'course_name': course_name,
                'modules': {}
                }
            if module_id not in user_progress[user_id]['modules']:
                user_progress[user_id]['modules'][module_id] = True

            if not finished:
                user_progress[user_id]['modules'][module_id] = False

        for user_id, progress  in user_progress.items():
            instance_name = progress['instance_name']
            course_name = progress['course_name']
            difference = progress['end_date'] - current_date
            difference_in_days = difference.days
            if difference_in_days < 15 :
                    messeges.append({"instance_name": instance_name,"course_name" : course_name ,"difference_in_days" :difference_in_days, "end_date":progress['end_date'], "user_id": user_id  })
        conn.close()
        return messeges
    

    def get_all_domaines_with_realted_data(self):
        conn = self._connect()
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        query = """ 
            SELECT
            d.domain_id,
            d.domain_name,
            c.course_id,
            c.course_name,
            c.description AS course_description,
            i.instance_id,
            i.instance_name,
            i.start_date,
            i.end_date,
            m.module_id,
            m.module_name,
            m.description AS module_description,
            m.required_point,
            a.activity_id,
            a.activity_name,
            a.description AS activity_description,
            a.level,
            a.type,
            a.point
            FROM
            domains d
            LEFT JOIN
            courses c ON d.domain_id = c.domain_id
            LEFT JOIN
            instances i ON c.course_id = i.course_id
            LEFT JOIN
            modules m ON i.instance_id = m.instance_id
            LEFT JOIN
            activities a ON m.module_id = a.module_id
            ORDER BY
            d.domain_id, c.course_id, i.instance_id, m.module_id, a.activity_id;
                    """
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.close()
        domains_dict = defaultdict(lambda: {"domain_id": None, "domain_name": None, "courses": []})
        
        for row in rows:
            domain_id = row["domain_id"]
            course_id = row["course_id"]
            instance_id = row["instance_id"]
            module_id = row["module_id"]
            activity_id = row["activity_id"]
            
            if domains_dict[domain_id]["domain_id"] is None:
                domains_dict[domain_id]["domain_id"] = domain_id
                domains_dict[domain_id]["domain_name"] = row["domain_name"]
            
            courses = domains_dict[domain_id]["courses"]
            course = next((c for c in courses if c["course_id"] == course_id), None)
            if not course:
                course = {
                    "course_id": course_id,
                    "course_name": row["course_name"],
                    "course_description": row["course_description"],
                    "instances": []
                }
                courses.append(course)
            
            instances = course["instances"]
            instance = next((i for i in instances if i["instance_id"] == instance_id), None)
            if not instance:
                instance = {
                    "instance_id": instance_id,
                    "instance_name": row["instance_name"],
                    "instance_start_date": row["start_date"],
                    "instance_end_date": row["end_date"],
                    "modules": []
                }
                instances.append(instance)
            
            modules = instance["modules"]
            module = next((m for m in modules if m["module_id"] == module_id), None)
            if not module:
                module = {
                    "module_id": module_id,
                    "module_name": row["module_name"],
                    "module_description": row["module_description"],
                    "required_point": row["required_point"],
                    "activities": []
                }
                modules.append(module)
            
            activities = module["activities"]
            activity = next((a for a in activities if a["activity_id"] == activity_id), None)
            if not activity:
                activity = {
                    "activity_id": activity_id,
                    "activity_name": row["activity_name"],
                    "activity_description": row["activity_description"],
                    "level": row["level"],
                    "type": row["type"],
                    "point": row["point"]
                }
                activities.append(activity)
        
        all_domains = list(domains_dict.values())
        return all_domains
