from django.test import TestCase
from django.contrib.auth.hashers import make_password, check_password

# Hashing a password
hashed_password = make_password("mypassword")
print(hashed_password)
# Output: pbkdf2_sha256$260000$...

# Checking if a password matches the hash
print(check_password("mypassword", hashed_password))  # True
print(check_password("wrongpassword", hashed_password))  # False
