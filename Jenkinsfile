pipeline {
  agent {
    docker {
      image 'tmaier/docker-compose'
    }

  }
  stages {
    stage('pull') {
      steps {
        git(url: 'https://github.com/ah8ad3/patty', branch: 'master')
      }
    }
    stage('docker test') {
      steps {
        sh 'docker version'
      }
    }
    stage('compose test') {
      steps {
        sh 'docker-compose version'
      }
    }
  }
}