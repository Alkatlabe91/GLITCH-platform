import sqlite3

# Establish connection to the database
connection = sqlite3.connect('database.db')


with open('./newglitch.sql', 'r') as script_file:
    script = script_file.read()

    connection.executescript(script)

connection.commit()



connection.executescript("""
--INSERT INTO domains (domain_name) VALUES 
--('Software Engineering'),
--('Data Science');

--INSERT INTO courses (domain_id, course_name, description) VALUES 
--(1, 'Introduction to Software Engineering', 'An introductory course to software engineering principles.'),
--(1, 'Software Design Patterns', 'Learn about common software design patterns.'),
--(1, 'Agile Software Development', 'An overview of agile methodologies in software development.'),
--(1, 'Software Testing and Quality Assurance', 'Explore testing techniques and quality assurance processes in software engineering.'),
--(2, 'Introduction to Data Science', 'An introductory course to data science principles.'),
--(2, 'Machine Learning', 'Learn about various machine learning algorithms and techniques.'),
--(2, 'Data Visualization', 'An overview of data visualization techniques.'),
--(2, 'Big Data Technologies', 'Explore big data technologies and their applications.');

INSERT INTO users (username, password, email, first_name, last_name, isTeacher) VALUES 
('user1', 'password1', 'user1@example.com', 'John', 'Doe', 0),
('user2', 'password2', 'user2@example.com', 'Jane', 'Smith', 0),
('user3', 'password3', 'user3@example.com', 'Michael', 'Johnson', 0),
('teacher1', 'teacherpass', 'teacher@example.com', 'Alice', 'Anderson', 1);

-- Inserting instances
--INSERT INTO instances (course_id, instance_name, start_date, end_date) VALUES 
-- Instances for Software Engineering Courses
--(1, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(1, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(1, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(1, 'Winter 2024', '2025-01-01', '2025-03-31'),
--(2, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(2, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(2, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(2, 'Winter 2024', '2025-01-01', '2025-03-31'),
--(3, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(3, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(3, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(3, 'Winter 2024', '2025-01-01', '2025-03-31'),
--(4, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(4, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(4, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(4, 'Winter 2024', '2025-01-01', '2025-03-31'),
-- Instances for Data Science Courses
--(5, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(5, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(5, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(5, 'Winter 2024', '2025-01-01', '2025-03-31'),
--(6, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(6, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(6, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(6, 'Winter 2024', '2025-01-01', '2025-03-31'),
--(7, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(7, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(7, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(7, 'Winter 2024', '2025-01-01', '2025-03-31'),
--(8, 'Spring 2024', '2024-03-01', '2024-06-30'),
--(8, 'Summer 2024', '2024-07-01', '2024-09-30'),
--(8, 'Fall 2024', '2024-10-01', '2024-12-31'),
--(8, 'Winter 2024', '2025-01-01', '2025-03-31');

--INSERT INTO modules (instance_id, module_name, description, required_point) VALUES 
-- Modules for Introduction to Software Engineering Instances
--(1, 'Module 1', 'Software Engineering Basics', 0),
--(1, 'Module 2', 'Software Engineering Practices', 50),
--(2, 'Module 3', 'Software Engineering Basics', 0),
--(2, 'Module 4', 'Software Engineering Practices', 50),
--(3, 'Module 5', 'Software Engineering Basics', 0),
--(3, 'Module 6', 'Software Engineering Practices', 50),
--(4, 'Module 7', 'Software Engineering Basics', 0),
--(4, 'Module 8', 'Software Engineering Practices', 50),
-- Modules for Software Design Patterns Instances
--(5, 'Module 1', 'Creational Patterns', 0),
--(5, 'Module 2', 'Structural Patterns', 60),
--(6, 'Module 3', 'Creational Patterns', 0),
--(6, 'Module 4', 'Structural Patterns', 60),
--(7, 'Module 5', 'Creational Patterns', 0),
--(7, 'Module 6', 'Structural Patterns', 60),
--(8, 'Module 7', 'Creational Patterns', 0),
--(8, 'Module 8', 'Structural Patterns', 60),
-- Modules for Agile Software Development Instances
--(9, 'Module 1', 'Agile Principles', 0),
--(9, 'Module 2', 'Agile Practices', 60),
--(10, 'Module 3', 'Agile Principles', 0),
--(10, 'Module 4', 'Agile Practices', 60),
--(11, 'Module 5', 'Agile Principles', 0),
--(11, 'Module 6', 'Agile Practices', 60),
--(12, 'Module 7', 'Agile Principles', 0),
--(12, 'Module 8', 'Agile Practices', 60),
-- Modules for Software Testing and Quality Assurance Instances
--(13, 'Module 1', 'Testing Basics', 0),
--(13, 'Module 2', 'Quality Assurance Techniques', 60),
--(14, 'Module 3', 'Testing Basics', 0),
--(14, 'Module 4', 'Quality Assurance Techniques', 60),
--(15, 'Module 5', 'Testing Basics', 0),
--(15, 'Module 6', 'Quality Assurance Techniques', 60),
--(16, 'Module 7', 'Testing Basics', 0),
--(16, 'Module 8', 'Quality Assurance Techniques', 60),
-- Modules for Introduction to Data Science Instances
--(17, 'Module 1', 'Data Science Basics', 0),
--(17, 'Module 2', 'Data Science Tools', 50),
--(18, 'Module 3', 'Data Science Basics', 0),
--(18, 'Module 4', 'Data Science Tools', 50),
--(19, 'Module 5', 'Data Science Basics', 0),
--(19, 'Module 6', 'Data Science Tools', 50),
--(20, 'Module 7', 'Data Science Basics', 0),
--(20, 'Module 8', 'Data Science Tools', 50),
-- Modules for Machine Learning Instances
--(21, 'Module 1', 'Supervised Learning', 0),
--(21, 'Module 2', 'Unsupervised Learning', 70),
--(22, 'Module 3', 'Supervised Learning', 0),
--(22, 'Module 4', 'Unsupervised Learning', 70),
--(23, 'Module 5', 'Supervised Learning', 0),
--(23, 'Module 6', 'Unsupervised Learning', 70),
--(24, 'Module 7', 'Supervised Learning', 0),
--(24, 'Module 8', 'Unsupervised Learning', 70),
-- Modules for Data Visualization Instances
--(25, 'Module 1', 'Visualization Principles', 0),
--(25, 'Module 2', 'Visualization Tools', 60),
--(26, 'Module 3', 'Visualization Principles', 0),
--(26, 'Module 4', 'Visualization Tools', 60),
--(27, 'Module 5', 'Visualization Principles', 0),
--(27, 'Module 6', 'Visualization Tools', 60),
--(28, 'Module 7', 'Visualization Principles', 0),
--(28, 'Module 8', 'Visualization Tools', 60),
-- Modules for Big Data Technologies Instances
--(29, 'Module 1', 'Big Data Fundamentals', 0),
--(29, 'Module 2', 'Big Data Applications', 80),
--(30, 'Module 3', 'Big Data Fundamentals', 0),
--(30, 'Module 4', 'Big Data Applications', 80),
--(31, 'Module 5', 'Big Data Fundamentals', 0),
--(31, 'Module 6', 'Big Data Applications', 80),
--(32, 'Module 7', 'Big Data Fundamentals', 0),
--(32, 'Module 8', 'Big Data Applications', 80);

--INSERT INTO activities (module_id, activity_name, description, level, type, point) VALUES 
-- Activities for Introduction to Software Engineering Modules
--(1, 'Assignment 1', 'Software Engineering Basics Assignment', 1, 'Task', 40),
--(1, 'Quiz 1', 'Software Engineering Basics Quiz', 1, 'Challenge', 60),
--(1, 'Project 1', 'Software Engineering Basics Project', 1, 'Project', 100),
--(2, 'Assignment 2', 'Software Engineering Practices Assignment', 2, 'Task', 50),
--(2, 'Quiz 2', 'Software Engineering Practices Quiz', 2, 'Challenge', 70),
--(2, 'Project 2', 'Software Engineering Practices Project', 2, 'Project', 120),
-- Add similar sets of activities for each module, making sure they are specific to the course and specialization.
-- Activities for Software Design Patterns Modules
--(5, 'Assignment 1', 'Creational Patterns Assignment', 1, 'Task', 40),
--(5, 'Quiz 1', 'Creational Patterns Quiz', 1, 'Challenge', 60),
--(5, 'Project 1', 'Creational Patterns Project', 1, 'Project', 100),
--(6, 'Assignment 2', 'Structural Patterns Assignment', 2, 'Task', 60),
--(6, 'Quiz 2', 'Structural Patterns Quiz', 2, 'Challenge', 80),
--(6, 'Project 2', 'Structural Patterns Project', 2, 'Project', 140),
-- Activities for Agile Software Development Modules
--(9, 'Assignment 1', 'Agile Principles Assignment', 1, 'Task', 40),
--(9, 'Quiz 1', 'Agile Principles Quiz', 1, 'Challenge', 60),
--(9, 'Project 1', 'Agile Principles Project', 1, 'Project', 100),
--(10, 'Assignment 2', 'Agile Practices Assignment', 2, 'Task', 60),
--(10, 'Quiz 2', 'Agile Practices Quiz', 2, 'Challenge', 80),
--(10, 'Project 2', 'Agile Practices Project', 2, 'Project', 140),
-- Activities for Software Testing and Quality Assurance Modules
--(13, 'Assignment 1', 'Testing Basics Assignment', 1, 'Task', 40),
--(13, 'Quiz 1', 'Testing Basics Quiz', 1, 'Challenge', 60),
--(13, 'Project 1', 'Testing Basics Project', 1, 'Project', 100),
--(14, 'Assignment 2', 'Quality Assurance Techniques Assignment', 2, 'Task', 60),
--(14, 'Quiz 2', 'Quality Assurance Techniques Quiz', 2, 'Challenge', 80),
--(14, 'Project 2', 'Quality Assurance Techniques Project', 2, 'Project', 140),
-- Activities for Introduction to Data Science Modules
--(17, 'Assignment 1', 'Data Science Basics Assignment', 1, 'Task', 40),
--(17, 'Quiz 1', 'Data Science Basics Quiz', 1, 'Challenge', 60),
--(17, 'Project 1', 'Data Science Basics Project', 1, 'Project', 100),
--(18, 'Assignment 2', 'Data Science Tools Assignment', 2, 'Task', 50),
--(18, 'Quiz 2', 'Data Science Tools Quiz', 2, 'Challenge', 70),
--(18, 'Project 2', 'Data Science Tools Project', 2, 'Project', 120),
-- Activities for Machine Learning Modules
--(21, 'Assignment 1', 'Supervised Learning Assignment', 1, 'Task', 50),
--(21, 'Quiz 1', 'Supervised Learning Quiz', 1, 'Challenge', 70),
--(21, 'Project 1', 'Supervised Learning Project', 1, 'Project', 120),
--(22, 'Assignment 2', 'Unsupervised Learning Assignment', 2, 'Task', 70),
--(22, 'Quiz 2', 'Unsupervised Learning Quiz', 2, 'Challenge', 90),
--(22, 'Project 2', 'Unsupervised Learning Project', 2, 'Project', 140),
---- Activities for Data Visualization Modules
--(25, 'Assignment 1', 'Visualization Principles Assignment', 1, 'Task', 40),
--(25, 'Quiz 1', 'Visualization Principles Quiz', 1, 'Challenge', 60),
--(25, 'Project 1', 'Visualization Principles Project', 1, 'Project', 100),
--(26, 'Assignment 2', 'Visualization Tools Assignment', 2, 'Task', 60),
--(26, 'Quiz 2', 'Visualization Tools Quiz', 2, 'Challenge', 80),
--(26, 'Project 2', 'Visualization Tools Project', 2, 'Project', 140),
-- Activities for Big Data Technologies Modules
--(29, 'Assignment 1', 'Big Data Fundamentals Assignment', 1, 'Task', 50),
--(29, 'Quiz 1', 'Big Data Fundamentals Quiz', 1, 'Challenge', 70),
--(29, 'Project 1', 'Big Data Fundamentals Project', 1, 'Project', 120),
--(30, 'Assignment 2', 'Big Data Applications Assignment', 2, 'Task', 70),
--(30, 'Quiz 2', 'Big Data Applications Quiz', 2, 'Challenge', 90),
--(30, 'Project 2', 'Big Data Applications Project', 2, 'Project', 140);

--INSERT INTO usermodules (user_id, module_id) VALUES 
--(1, 1),
--(2, 2),
--(3, 3),
--(4, 4);

-- Inserting userprogressmodules
--INSERT INTO userprogressmodules (user_activity_id, reviwed_by, submited, finished, passed) VALUES 
--(1, 4, 1, 1, 1),
--(2, 4, 1, 1, 1),
--(3, 4, 1, 1, 1),
--(4, 4, 1, 1, 1),
--(5, 4, 1, 1, 1),
--(6, 4, 1, 1, 1),
--(7, 4, 1, 1, 1),
--(8, 4, 1, 1, 1);

--INSERT INTO userposts (user_progress_module_id, content) VALUES 
--(1, 'Completed Assignment 1. It was challenging but insightful.'),
--(2, 'Completed Quiz 1. Found some questions tricky.'),
--(3, 'Assignment 2 submitted. Ready for the next challenge.'),
--(4, 'Quiz 2 completed. Feeling confident with design patterns.');

--INSERT INTO userpostcomments (user_id, user_post_id, comment) VALUES 
--(2, 1, '👍'),
--(3, 2, '👍'),
--(4, 3, '🎉'),
--(1, 4, '❤️');
--""")

# Commit changes
connection.commit()

# Close the connection
connection.close()
