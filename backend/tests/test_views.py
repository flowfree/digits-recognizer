import base64 
from django.conf import settings


def test_predict_with_valid_payload(client):
    filename = settings.BASE_DIR / 'tests/images/12345.jpg'
    with open(filename, 'rb') as f:
        image_data = base64.b64encode(f.read())

    response = client.post('/predict', {
        'imageData': f'data:image/jpeg;base64,{image_data.decode("utf-8")}'
    })

    assert response.status_code == 200
    assert response.json() == {'result': '1 2 3 4 5'}


def test_predict_with_invalid_payload(client):
    response = client.post('/predict')

    assert response.status_code == 400
    assert response.json() == {'message': 'Please upload valid JPEG images.'}
