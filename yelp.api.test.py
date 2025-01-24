import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the API key
API_KEY = os.getenv('YELP_API_KEY')

url = 'https://api.yelp.com/v3/businesses/search'
headers = {'Authorization': f'Bearer {API_KEY}'}
params = {'term': 'pizza', 'location': 'Nashville', 'limit': 1}

response = requests.get(url, headers=headers, params=params)

print(response.json())
