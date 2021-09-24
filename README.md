Digits Recognizer
=================

Fullstack handwritten digits recognizer project with TensorFlow, OpenCV, Django, and React.

![ScreenFlow](https://user-images.githubusercontent.com/9797761/134186945-8f1d12c3-ef05-4bb7-9ee2-5730511d2763.gif)

Run the app on local machine
----------------------------

Ensure that you have Python 3.8+, Pipenv, and recent Node.js installed on your local machine.

To run the backend server:

1.  Change to the `backend/` directory and install the dependencies:

        cd backend
        pipenv install 

2.  Run the development server:

        ppienv run python manage.py runserver

    It will run Django's development server on port 8000.
        
3.  Open `http://localhost:8000` with your browser to see the welcome message.

To run the frontend app:

1.  Change to the `frontend/` directory and install the dependencies:

        cd frontend
        yarn install

2.  Run the server:

        yarn start

3.  Open `http://localhost:3000` with your browser.
