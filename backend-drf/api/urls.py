from django.urls import path
from accounts_app import views as UserViews

urlpatterns =[
    path('register/',UserViews.RegisterView.as_view()),

]