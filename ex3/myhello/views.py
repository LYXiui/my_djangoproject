from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from .models import Course
import openpyxl
from django.http import HttpResponse

@api_view(['GET'])
def courselist(request):
    # 取得原始 QuerySet，不要在這裡加 .values()
    courses = Course.objects.all()
    
    paginator = PageNumberPagination()
    # 傳入 DRF 的 request 物件
    result_page = paginator.paginate_queryset(courses, request)
    
    # 手動將分頁後的結果轉為字典列表，確保 JSON 格式正確
    data = []
    for c in result_page:
        data.append({
            "Department": c.Department,
            "CourseTitle": c.CourseTitle,
            "Instructor": c.Instructor
        })
        
    return paginator.get_paginated_response(data)

# Ex#3: 匯出 Excel 功能 (保持不變)
def export_course_excel(request):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "CourseList"
    ws.append(['Department', 'CourseTitle', 'Instructor'])
    for c in Course.objects.all():
        ws.append([c.Department, c.CourseTitle, c.Instructor])
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="courses.xlsx"'
    wb.save(response)
    return response