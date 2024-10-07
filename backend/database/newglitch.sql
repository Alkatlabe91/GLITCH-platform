CREATE TABLE users (
  "user_id" integer PRIMARY KEY AUTOINCREMENT,
  "username" TEXT ,
  "password" TEXT ,
  "email" text ,
  "first_name" TEXT ,
  "last_name" TEXT ,
  "profile_picture" TEXT ,
  "isTeacher" integer ,
  "registration_date" timestamp  DEFAULT CURRENT_TIMESTAMP
) ;



CREATE TABLE domains (
  "domain_id" integer PRIMARY KEY AUTOINCREMENT,
  "domain_name" text 
) ;


CREATE TABLE courses (
  "course_id" integer PRIMARY KEY AUTOINCREMENT,
  "domain_id" integer ,
  "course_name" text ,
  "description" text ,
  FOREIGN KEY("domain_id") REFERENCES domains("domain_id")
) ;


CREATE TABLE instances (
  "instance_id" integer PRIMARY KEY AUTOINCREMENT,
  "course_id" integer ,
  "instance_name" text ,
  "start_date" DATETIME ,
  "end_date" DATETIME ,
  FOREIGN KEY("course_id") REFERENCES courses("course_id")

) ;



CREATE TABLE modules (
  "module_id" integer PRIMARY KEY AUTOINCREMENT,
  "instance_id" integer ,
  "module_name" text ,
  "description" text ,
  "required_point" integer ,
  FOREIGN KEY("instance_id") REFERENCES instances("instance_id")
) ;



CREATE TABLE activities (
  "activity_id" integer PRIMARY KEY AUTOINCREMENT,
  "module_id" integer ,
  "activity_name" text ,
  "description" text ,
  "level" integer ,
  "type" text ,
  "point" integer ,
  FOREIGN KEY("module_id") REFERENCES modules("module_id")
) ;



CREATE TABLE usermodules (
  "user_module_id" integer PRIMARY KEY AUTOINCREMENT,
  "user_id" integer ,
  "module_id" integer ,
  FOREIGN KEY("user_id") REFERENCES users("user_id"),
  FOREIGN KEY("module_id") REFERENCES modules("module_id")
) ;

CREATE TABLE userprogressmodules (
  "user_progress_module_id" integer PRIMARY KEY AUTOINCREMENT,
  "user_activity_id" integer ,
  "reviwed_by" integer ,
  "submited" integer ,
  "finished" integer ,
  "passed" integer ,
  FOREIGN KEY("reviwed_by") REFERENCES users("user_id"),
  FOREIGN KEY("user_activity_id") REFERENCES activities("activity_id")
) ;


CREATE TABLE userposts (
  "user_post_id" integer PRIMARY KEY AUTOINCREMENT,
  "user_progress_module_id" integer ,
  "content" text ,
  FOREIGN KEY("user_progress_module_id") REFERENCES userprogressmodules("user_progress_module_id")

) ;


CREATE TABLE userpostcomments (
  "user_post_comment_id" integer PRIMARY KEY AUTOINCREMENT,
  "user_id" integer ,
  "user_post_id" integer ,
  "comment" text ,
  FOREIGN KEY("user_id") REFERENCES users("user_id"),
  FOREIGN KEY("user_post_id") REFERENCES userposts("user_post_id")
) ;


