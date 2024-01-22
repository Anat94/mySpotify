from django.test import TestCase, Client
from django.urls import reverse
from Backend.models import Users
import json

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