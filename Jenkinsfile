pipeline {
    agent any
    
    tools {
        maven 'Maven3'
        jdk 'JDK21'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/aathi987/employee-api-devops.git'
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
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        bat "docker login -u %USER% -p %PASS%"
                        bat "docker tag employee-api:latest %USER%/employee-api:latest"
                        bat "docker push %USER%/employee-api:latest"
                    }
                }
            }
        }
        stage('Deploy Container') {
            steps {
                bat 'docker stop employee-api || exit 0'
                bat 'docker rm employee-api || exit 0'
                bat 'docker run -d -p 8080:8080 --name employee-api aathi987/employee-api:latest'
            }
        }
    }
}