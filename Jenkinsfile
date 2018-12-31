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
        stage('start mongo') {
          steps {
            sh 'docker run -p 27017:27017 -d mongo'
          }
        }
        stage('start redis') {
          steps {
            sh 'docker run -p 6379:6379   -d redis'
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
    stage('stop mongo') {
      parallel {
        stage('stop mongo') {
          steps {
            sh 'docker stop mongo_1'
          }
        }
        stage('stop redis') {
          steps {
            sh 'docker stop redis_1'
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