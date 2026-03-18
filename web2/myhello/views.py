from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Post, User

logger = logging.getLogger('django')

@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '').strip() # 去除空白
    content = request.GET.get('content', '')
    
    # 修正邏輯：先檢查 title，有值才建立物件並存檔
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
        # 如果 title 為空，直接回報錯誤，不執行 save()
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




