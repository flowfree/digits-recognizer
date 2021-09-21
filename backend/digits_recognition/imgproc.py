import base64
import math
import numpy as np
import cv2


def extract_digits_from_image(image_data):
    image_data = base64.b64decode(image_data)
    arr = np.fromstring(image_data, dtype='uint8')
    img = cv2.imdecode(arr, cv2.IMREAD_GRAYSCALE)
    _, img = cv2.threshold(img, 120, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    bounding_rects = []
    if len(contours):
        for contour in contours:
            r = cv2.boundingRect(contour)
            bounding_rects.append(r)

    bounding_rects.sort(key=lambda r: r[0])

    digits = []
    for rect in bounding_rects:
        x, y, w, h = rect
        digit = img[y:y+h, x:x+w]
        height, width = digit.shape
        m = max(width, height)
        digit = cv2.copyMakeBorder(
            digit, 
            math.ceil((m - height) / 2) + 25, 
            math.floor((m - height) / 2) + 25, 
            math.ceil((m - width) / 2) + 25, 
            math.floor((m - width) / 2) + 25, 
            cv2.BORDER_CONSTANT, 
            value=0
        )
        digit = cv2.resize(digit, (28, 28))
        digits.append(digit)

    return digits
