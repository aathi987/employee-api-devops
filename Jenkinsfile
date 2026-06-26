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
                bat '''
                docker build -t employee-api:%BUILD_NUMBER% .
                docker tag employee-api:%BUILD_NUMBER% employee-api:latest
                '''
            }
        }

        stage('Test') {
            steps {
                bat 'docker rm -f test-api || exit /b 0'

                bat 'docker run -d -p 8082:8080 --name test-api employee-api:latest'

                sleep time: 15, unit: 'SECONDS'

                bat 'curl http://localhost:8082/api/employees'

                bat 'docker stop test-api'
                bat 'docker rm test-api'
            }
        }
    }

    post {
        always {
            bat 'docker stop test-api || exit /b 0'
            bat 'docker rm test-api || exit /b 0'
        }
    }
}