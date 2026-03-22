from django.urls import path
from . import views

# urlpatterns = [
#   path('add_post/', views.add_post, name='add_post'), 
#   path('list_post/', views.list_post, name='list_post'),
#   path('users/', views.list_users, name='list_users'),
# ]

urlpatterns = [
    path('courselist/', views.courselist, name='courselist'), # 回傳課程列表 
    path('addcourse/', views.addcourse, name='addcourse'),   # 加入課程 
]