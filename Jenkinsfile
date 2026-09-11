pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend/horizon') {
                    bat 'mvnw.cmd test'
                }
            }
        }
    }
}