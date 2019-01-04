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
    stage('run tests') {
      steps {
        sh '''
chmod +x scripts/check-test-docker.sh
 sh scripts/check-test-docker.sh'''
      }
    }
    stage('deploy') {
      steps {
        echo 'in progress'
      }
    }
    stage('done') {
      steps {
        echo 'done'
      }
    }
  }
}