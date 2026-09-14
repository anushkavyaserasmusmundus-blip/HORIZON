pipeline {
    agent any

    environment {
        JAVA_HOME = 'C:\\Program Files\\Eclipse Adoptium\\jdk-21.0.12.8-hotspot'
        PATH = "${JAVA_HOME}\\bin;${env.PATH}"
        JWT_SECRET = credentials('horizon-jwt-secret')
        GITHUB_TOKEN = credentials('horizon-github-token')
    }

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

        stage('Docker Compose Build') {
            steps {
                dir('backend/horizon') {
                    bat 'docker compose build'
                }
            }
        }
    }
}
/*  github
    jenkins
    maven test
    docker compose build -> read docker-compose.yml
        backend image
        frontend image*/