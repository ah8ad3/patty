pipeline {
  agent {
    docker {
      image 'tmaier/docker-compose'
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