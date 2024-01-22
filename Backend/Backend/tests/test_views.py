from django.test import TestCase, Client
from django.urls import reverse
from Backend.models import Users
import json
from django.contrib.auth.hashers import make_password

class SignupViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.signup_url = reverse('signup')

    def test_signup_post(self):
        user_data = {
            'email': 'testuser@gmail.com',
            'password': 'testpassword',
            'name': 'Test User',
            'birth_date': '01/01/2000',
            'gender': 'M'
        }
        response = self.client.post(self.signup_url, data=json.dumps(user_data), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_signup_existing_user(self):
        Users.objects.create(email='testuser@gmail.com', password='testpassword', name='Test User', birth_date='2000-01-01', gender='M')
        user_data = {
            'email': 'testuser@gmail.com',
            'password': 'testpassword',
            'name': 'Test User',
            'birth_date': '01/01/2000',
            'gender': 'M'
        }
        response = self.client.post(self.signup_url, data=json.dumps(user_data), content_type='application/json')
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.json(), {"status": "Email already registered"})

    def test_signup_existing_email(self):
        Users.objects.create(email='testuser@gmail.com', password='testpassword', name='Test User', birth_date='2000-01-01', gender='M')
        user_data = {
            'email': 'testuser@gmail.com',
            'password': 'differentpassword',
            'name': 'Test User',
            'birth_date': '01/01/2000',
            'gender': 'M'
        }
        response = self.client.post(self.signup_url, data=json.dumps(user_data), content_type='application/json')
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.json(), {"status": "Email already registered"})

    def test_signup_invalid_method(self):
        response = self.client.get(self.signup_url)
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json(), {"status": "Invalid method"})

class SigninViewTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.signin_url = reverse('signin')

    def test_signin_post_valid_credentials(self):
        pswd = make_password("testpassword")
        Users.objects.create(email='testuser@gmail.com', password=pswd, name='Test User', birth_date='2000-01-01', gender='M')
        user_data = {
            'email': 'testuser@gmail.com',
            'password': 'testpassword'
        }

        response = self.client.post(self.signin_url, data=json.dumps(user_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_signin_post_invalid_credentials(self):
        Users.objects.create(email='testuser@gmail.com', password='testpassword', name='Test User', birth_date='2000-01-01', gender='M')
        user_data = {
            'email': 'testuser@gmail.com',
            'password': 'wrongpassword'
        }
        response = self.client.post(self.signin_url, data=json.dumps(user_data), content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"status": "Invalid credentials"})

    def test_signin_post_missing_data(self):
        user_data = {
            'email': 'testuser@gmail.com',
        }
        response = self.client.post(self.signin_url, data=json.dumps(user_data), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"status": "Invalid request"})

    def test_signin_invalid_method(self):
        response = self.client.get(self.signin_url)
        self.assertEqual(response.status_code, 405)
        self.assertEqual(response.json(), {"status": "Invalid method"})