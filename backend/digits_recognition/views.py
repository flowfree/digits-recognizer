import base64
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['POST'])
def predict(request):
    image_data = request.data.get('imageData')
    if not image_data.startswith('data:image/jpeg;base64'):
        return Response({
            'message': 'Please upload valid JPEG images.'
        }, status=400)

    s = image_data.split(',')[-1]
    with open('/Users/nash/Desktop/a.jpg', 'wb') as f:
        f.write(base64.b64decode(s))

    return Response({'result': '7'})
