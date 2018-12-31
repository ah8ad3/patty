pipeline {
  agent {
    docker {
      image 'ah8ad3/os:0.1'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }

  }
  stages {
    stage('docker test') {
      parallel {
        stage('docker test') {
          steps {
            sh 'docker version'
          }
        }
        stage('docker-compose test') {
          steps {
            sh 'docker-compose version'
          }
        }
      }
    }
    stage('run application') {
      steps {
        sh 'sh entrypoint.sh'
      }
    }
  }
}