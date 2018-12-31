pipeline {
  agent {
    docker {
      image 'ah8ad3/os:0.1'
    }

  }
  stages {
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