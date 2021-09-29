Digits Recognizer
=================

Fullstack handwritten digits recognizer project with TensorFlow, OpenCV, Django, and React.


https://user-images.githubusercontent.com/9797761/134607130-16740acb-8111-4aaf-acb3-53aeb86ca56f.mp4

See the demo: [digits-recognizer.apps.nashruddinamin.com](https://digits-recognizer.apps.nashruddinamin.com)

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


Deploy to Amazon Web Services
-----------------------------

There are many ways to deploy the app to AWS. This example will show you how to deploy 
the React frontend to AWS S3 and the Django backend to AWS Lambda.

Make sure you have Python 3.8+, Pipenv, Docker, and recent Node.js installed on your 
machine. In addition, this example assumes that you have a domain name with two subdomains
registered with Route53:

- app.example.com
- api.example.com

and you have obtained the SSL certificate from ACM.

**To deploy the backend to AWS Lambda:**

1.  Change your working directory to the `backend/` dir:

        cd backend
    
1.  Create new virtualenv and install Zappa:

        python3 -m venv venv
        . venv/bin/activate
        pip install troposphere==2.7.1 zappa

1.  Create a new file named `zappa_settings.json` with the following content:

        {
          "prod": {
            "aws_region": "us-west-2",
            "django_settings": "config.settings.production",
            "profile_name": "default",
            "project_name": "digits-recognizer-backend",
            "s3_bucket": "digits-recognizer-backend",
            "domain": "api.example.com",
            "certificate_arn": "<certificate ARN>",
            "environment_variables": {
              "DJANGO_SETTINGS_MODULE": "config.settings.production",
              "SECRET_KEY": "<some random string>",
              "FRONTEND_HOSTNAME": "app.example.com",
              "BACKEND_HOSTNAME": "api.example.com"
            }
          }
        }

    Note that the environment variables above are required by the Django app.

    Visit the [Zappa repository](https://github.com/zappa/Zappa) to learn more about other 
    settings you can use.

1.  Generate `zappa_settings.py` from the JSON file above:

        zappa save-python-settings-file

1.  Build the docker image:

        docker build -f Dockerfile-lambda -t digits-recognizer-backend .

1.  Push the Docker image to an ECR repository: 

        # Create a new repository
        aws ecr create-repository --repository-name digits-recognizer-backend

        # Retrieve an authentication token and authenticate your Docker client 
        aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin <account number>.dkr.ecr.us-west-2.amazonaws.com

        # Tag your image so you can push the image to the repository
        docker tag \
            digits-recognizer-backend:latest \
            <account number>.dkr.ecr.us-west-2.amazonaws.com/digits-recognizer-backend:latest

        # Push this image to your newly created ECR repository
        docker push <account number>.dkr.ecr.us-west-2.amazonaws.com/digits-recognizer-backend:latest

1.  Deploy with Zappa:

        zappa deploy -d <account number>.dkr.ecr.us-west-2.amazonaws.com/digits-recognizer-backend:latest

1.  Register your custom domain name with your API gateway:

        zappa certify

1.  Ping your backend:

        curl http://api.example.com

    It should return the welcome message.


**To deploy the frontend to AWS S3:**

1.  Follow these tutorials for configuring S3 bucket to host static website:
    - [Tutorial: Configuring a static website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html)
    - [Speeding up your website with Amazon CloudFront](https://docs.aws.amazon.com/AmazonS3/latest/userguide/website-hosting-cloudfront-walkthrough.html)

    After finishing those tutorials, you will have a bucket that is publicly accessible from your subdomain.
    You might want to put a sample index.html in your bucket to make sure everything is working as expected.

1.  Change your working directory to the `frontend/` dir:

        cd frontend

1.  Create a new file named `.env.production` with the following content:

        REACT_APP_API_BASE_URL=https://api.example.com

1.  Build the frontend files:

        yarn build 

1.  Copy the files to your S3 bucket:

        aws s3 sync ./build s3://<your S3 bucket>

1.  The frontend should be available at `https://app.example.com`.

License
-------
MIT
