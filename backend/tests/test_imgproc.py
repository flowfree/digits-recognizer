import base64
from django.conf import settings
from app.imgproc import extract_digits_from_image


def test_extract_digits_from_image_12345():
    filename = settings.BASE_DIR / 'tests/images/12345.jpg'
    with open(filename, 'rb') as f:
        image_data = base64.b64encode(f.read())

    digits = extract_digits_from_image(image_data)

    assert len(digits) == 5
    assert digits[0].shape == (28, 28)
    assert digits[1].shape == (28, 28)
    assert digits[2].shape == (28, 28)
    assert digits[3].shape == (28, 28)
    assert digits[4].shape == (28, 28)


def test_extract_digits_from_image_321():
    filename = settings.BASE_DIR / 'tests/images/321.jpg'
    with open(filename, 'rb') as f:
        image_data = base64.b64encode(f.read())

    digits = extract_digits_from_image(image_data)

    assert len(digits) == 3
    assert digits[0].shape == (28, 28)
    assert digits[1].shape == (28, 28)
    assert digits[2].shape == (28, 28)
