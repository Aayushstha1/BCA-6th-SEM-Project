from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def hello_world(request):
    """
    A simple API endpoint that returns a hello world message
    """
    return Response({
        'message': 'Hello from Django backend!',
        'status': 'success'
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
def api_info(request):
    """
    Returns information about the API
    """
    return Response({
        'name': 'Student Information & Resource Hub API',
        'version': '1.0.0',
        'description': 'Backend API for Student Information & Resource Hub',
        'endpoints': {
            'hello': '/api/hello/',
            'info': '/api/info/'
        }
    }, status=status.HTTP_200_OK)