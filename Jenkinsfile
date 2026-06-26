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
    post {
        always {
            bat 'docker stop test-api || exit /b 0'
            bat 'docker rm test-api || exit /b 0'
        }
    }
}