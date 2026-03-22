from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
from .models import Course
import json
import logging

from .models import Post, User

logger = logging.getLogger('django')

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '').strip() 
    content = request.GET.get('content', '')

    if title:
        new_post = Post(
            title=title, 
            content=content,
            photo=request.GET.get('photo', ''),
            location=request.GET.get('location', '')
        )
        new_post.save()
        logger.debug(f" ************** myhello_api success: {title}")
        return Response({"data": f"{title} insert!"}, status=status.HTTP_200_OK)
    else:
        return Response({"res": "parameter: title is None or empty"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return Response({
        "data": json.loads(json.dumps(list(posts), cls=DjangoJSONEncoder))
    }, status=status.HTTP_200_OK)
    # return Response({"data":
    #                json.dumps(
    #                    list(posts),
    #                    sort_keys = True,
    #                    indent = 1,
    #                    cls = DjangoJSONEncoder)},
    #                status=status.HTTP_200_OK)

from .models import User

@api_view(['GET'])
def list_users(request):
    users = User.objects.all().values() 
    return Response(list(users), status=status.HTTP_200_OK)


@api_view(['GET'])
def courselist(request):
    # 取得所有課程資料並轉為 values 列表
    courses = Course.objects.all().values()
    return Response(list(courses), status=status.HTTP_200_OK)

@api_view(['GET'])
def addcourse(request):
    # 從 GET 參數取得課程資訊
    dept = request.GET.get('Department', '')
    title = request.GET.get('CourseTitle', '')
    teacher = request.GET.get('Instructor', '')

    if dept and title and teacher:
        # 建立新課程並存檔
        new_course = Course(Department=dept, CourseTitle=title, Instructor=teacher)
        new_course.save()
        return Response({"message": f"Course '{title}' added successfully!"}, status=status.HTTP_200_OK)
    
    return Response({"error": "Missing parameters"}, status=status.HTTP_400_BAD_REQUEST)




