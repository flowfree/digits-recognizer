import base64
import numpy as np
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .dnn import DigitRecognitionModel
from .imgproc import extract_digits_from_image


@api_view(['POST'])
def predict(request):
    image_data = request.data.get('imageData')
    if not image_data.startswith('data:image/jpeg;base64'):
        return Response({
            'message': 'Please upload valid JPEG images.'
        }, status=400)

    image_data = image_data.split(',')[-1]
    digits = extract_digits_from_image(image_data)
    model = DigitRecognitionModel()
    prediction = []
    for digit in digits:
        result = model.predict(digit.reshape(1, 28, 28))
        prediction.append(np.argmax(result))

    return Response({
        'result': ' '.join([str(i) for i in prediction])
    })
