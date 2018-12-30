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
            sh 'pip install docker-compose'
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