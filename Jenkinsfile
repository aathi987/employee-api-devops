pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/aathi987/employee-api-devops.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker build -t employee-api:%BUILD_NUMBER% .'
                    bat 'docker tag employee-api:%BUILD_NUMBER% employee-api:latest'
                }
            }
        }
        
        stage('Test') {
            steps {
                script {
                    bat 'docker run -d -p 8082:8080 --name test-api employee-api:latest'
                    bat 'timeout /t 15'
                    bat 'curl http://localhost:8082/api/employees || exit /b 1'
                    bat 'docker stop test-api'
                    bat 'docker rm test-api'
                }
            }
        }
    }
    
    post {
        always {
            bat 'docker stop test-api || exit 0'
            bat 'docker rm test-api || exit 0'
        }
    }
}