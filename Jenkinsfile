pipeline {
  agent any
  stages {
    stage('pull') {
      steps {
        git(url: 'https://github.com/ah8ad3/patty', branch: 'master')
      }
    }
    stage('docker test') {
      parallel {
        stage('docker test') {
          steps {
            sh 'docker version'
          }
        }
        stage('install compose') {
          steps {
            sh '''curl -L --fail https://github.com/docker/compose/releases/download/1.23.1/run.sh -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose'''
          }
        }
      }
    }
    stage('compose test') {
      steps {
        sh 'docker-compose version'
      }
    }
  }
}