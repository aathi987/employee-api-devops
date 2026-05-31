pipeline {
    agent any

    tools {
        maven 'Maven3'
        jdk 'JDK17'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/aathi987/employee-api-devops.git'
            }
        }

        stage('Build Jar') {
            steps {
                bat 'mvn clean package -DskipTests'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t employee-api:latest .'
            }
        }

        stage('Push to DockerHub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    bat '''
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    docker tag employee-api:latest %DOCKER_USER%/employee-api:latest
                    docker push %DOCKER_USER%/employee-api:latest
                    '''
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat 'docker stop employee-api'
                bat 'docker rm employee-api'

                bat '''
                docker run -d ^
                --name employee-api ^
                -p 8080:8080 ^
                aathi987/employee-api:latest
                '''
            }
        }
    }
}