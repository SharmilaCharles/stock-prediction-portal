from urllib import response
from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
'''
CreateAPIView is a generic view provided by DRF 
that simplifies the creation of objects in the 
database via POST requests. It automatically 
provides functionality for creating a new 
instance of a model.
'''

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes=[AllowAny]


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        response = {
            'status' : 'Request was permitted'
        }
        return Response(response)