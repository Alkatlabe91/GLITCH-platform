import bleach
import re

def sanitize_input(input_string):
    return bleach.clean(input_string)

def is_valid_email(email):
    email_regex = re.compile(r"[^@]+@[^@]+\.[^@]+")
    return email_regex.match(email) is not None