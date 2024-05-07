pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/mbaynd/taskManager.git'
            }
        } 
        
        stage('Trivy FS') {
            steps {
               sh "trivy fs ."
            }
        }

        stage(" Sonarqube Analysis "){
            steps{
                 withSonarQubeEnv('sonar') {
                    sh '''/opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectName=TaskManager \
                    -Dsonar.projectKey=TaskManager -Dsonar.token=squ_7c4e3e404eafe1bc5211dc30f054bf01b24a307f'''
                 }
            }
        } 
        
        stage(" Build Docker Image"){
            steps {
                sh '''
                   docker-compose build   -t taskManager-vvv1.0.1 .
                  '''
      
            }
        }
    }      
}
