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
    stage('run redis') {
      parallel {
        stage('run redis') {
          steps {
            sh 'docker run -t -p 6379:6379 redis'
          }
        }
        stage('run mongo') {
          steps {
            sh 'docker run -t -p 27017:27017 mongo'
          }
        }
      }
    }
    stage('install dependency') {
      parallel {
        stage('install dependency') {
          steps {
            sh 'npm install'
          }
        }
        stage('test app') {
          steps {
            sh 'npm test'
          }
        }
      }
    }
    stage('done') {
      steps {
        echo 'done'
      }
    }
  }
}