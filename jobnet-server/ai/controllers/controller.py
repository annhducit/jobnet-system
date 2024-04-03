from rest_framework.response import Response
from rest_framework.decorators import api_view
from services.postService import PostService
from django.http import JsonResponse


@api_view(['POST'])
def askGPT(request):
    question = request.data.get('question')
    return Response(PostService.askGPT(question))


@api_view(['POST'])
def generatePost(request):
    title = request.data.get("title", 'not mentioned')
    levels = request.data.get('levels', 'not mentioned'),
    language = request.data.get("language", 'Tiếng Việt')
    degrees = request.data.get('degrees', 'not mentioned'),
    benefits = request.data.get('benefits', 'not mentioned'),
    locations = request.data.get('locations', 'not mentioned'),
    maxSalary = request.data.get('maxSalary', 'not mentioned'),
    minSalary = request.data.get('minSalary', 'not mentioned'),
    profession = request.data.get('profession', 'not mentioned')
    workType = request.data.get('workType', 'not mentioned'),
    yearExp = request.data.get('yearExp', 'not mentioned'),
    requireNumber = request.data.get('requireNumber', 'not mentioned'),
    otherRequirements = request.data.get('otherRequirements', 'not mentioned'),
    response = PostService.generatePost(
        language=language,
        title=title,
        levels=levels,
        degrees=degrees,
        benefits=benefits,
        locations=locations,
        maxSalary=maxSalary,
        minSalary=minSalary,
        profession=profession,
        workType=workType,
        yearExp=yearExp,
        requireNumber=requireNumber,
        otherRequirements=otherRequirements,
    )
    return Response({"content": response})

@api_view(['POST'])
def parseJD(request):
    if 'jd' in request.FILES:
        response = PostService.parseJD(request.FILES['jd'])
        return JsonResponse(response, status=200)
    return JsonResponse({"message": "Không tìm thấy jd được tải lên"}, status=400)
