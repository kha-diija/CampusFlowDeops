pipeline {
    agent any

    tools {
        maven 'maven-3.9.6'
    }

    triggers {
        githubPush()
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean install -Dmaven.test.skip=true'
                }
            }
        }
    }
}