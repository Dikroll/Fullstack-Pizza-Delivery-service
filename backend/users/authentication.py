from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
import requests
from django.conf import settings


class CookiesJWTAuthentication(JWTAuthentication):

    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        
        if not access_token:

            refresh_token = request.COOKIES.get('refresh_token')
            if refresh_token:
                refresh_url = settings.SITE_URL + "/token/refresh/"
                response = requests.post(refresh_url, cookies={'refresh_token': refresh_token})
                
                if response.status_code == 200 and 'access' in response.json():
                    access_token = response.json()['access']

        if not access_token:
            return None  
        
        validated_token = self.get_validated_token(access_token)

        try:
            user = self.get_user(validated_token)
        except AuthenticationFailed:
            return None  
        return (user, validated_token)