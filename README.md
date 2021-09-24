Digits Recognizer
=================

Fullstack handwritten digits recognizer project with TensorFlow, OpenCV, Django, and React.


https://user-images.githubusercontent.com/9797761/134606813-3ea538f2-1ddd-4610-829d-05e2228c298d.mp4


Run the app on local machine
----------------------------

Ensure that you have Python 3.8+, Pipenv, and recent Node.js installed on your local machine.

**To run the backend server:**

1.  Change to the `backend/` directory and install the dependencies:

        cd backend
        pipenv install --dev

2.  Run the development server:

        pipenv run python manage.py runserver

    It will run Django's development server on port 8000.
        
3.  Open `http://localhost:8000` with your browser to see the welcome message.

4.  (Optional) run the unit tests:

        pipenv run pytest

**To run the frontend app:**

1.  Change to the `frontend/` directory and install the dependencies:

        cd frontend
        yarn install

2.  Run the server:

        yarn start

3.  Open `http://localhost:3000` with your browser to see the frontend app.

Run the app on local machine with Docker
----------------------------------------

Ensure that you have Docker and Docker Compose installed on your machine. Build and 
run the containers with:

    docker-compose build
    docker-compose up

Then open `http://localhost:3000` with your browser to see the frontend app.

If you want to run on machine other than localhost (e.g: EC2 instance), you need to 
set the `FRONTEND_URL` and `BACKEND_URL` environment variables so both frontend and 
backend know how to talk to each other.

For example, if the public IP address of your EC2 instance is `1.2.3.4` then you need 
to run the app with:

    export FRONTEND_URL=http://1.2.3.4:3000 
    export BACKEND_URL=http://1.2.3.4:8000 
    docker-compose build
    docker-compose up

<!--
Deploy to Amazon Web Services
-----------------------------

There are many ways to deploy the app to AWS. This example will show you how to deploy 
the React frontend to AWS S3 and the Django backend to AWS Lambda.

Make sure you have Python 3.8+, Pipenv, Docker, and recent Node.js installed on your 
machine. In addition, this example assumes that you have a domain name registered 
with Route53 and you have requested the SSL certificate from ACM.
-->
