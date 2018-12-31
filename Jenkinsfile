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
    stage('test application') {
      steps {
        sh './scripts/docker-test.sh'
        sleep 5
      }
    }
    stage('') {
      steps {
        sleep 10
        sh '''test=$(docker inspect test_node_1 --format=\'{{.State.ExitCode}}\')
if [ $test -eq 0 ]
then
exit 0 
else
exit 1
fi'''
      }
    }
  }
}