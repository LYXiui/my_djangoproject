from django.urls import path
from . import views


urlpatterns = [
    path('courselist/', views.courselist, name='courselist'), 
    path('export_excel/', views.export_course_excel, name='export_excel'), 
]