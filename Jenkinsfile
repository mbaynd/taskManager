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
               echo "DEBUT - TRIVY Vulnerability Scan"
               sh "trivy fs ."
               echo "FIN - TRIVY Vulnerability Scan"
            }
        }

        stage(" Sonarqube Analysis "){
            steps{
                 withSonarQubeEnv('sonar') {
                    sh '''
                    echo "DEBUT - Sonar Scan"
                    /opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectName=TaskManager \
                    -Dsonar.projectKey=TaskManager -Dsonar.token=squ_7c4e3e404eafe1bc5211dc30f054bf01b24a307f
                    echo "FIN - Sonar Scan"
                    '''
                 }
            }
        } 
        
        stage(" Build Docker Image"){
            steps {
                sh '''
                   echo "DEBUT --- Build des images Frontend et Backend"
                   docker compose build --force-rm --no-cache   
                   echo "FIN --- Build des images Frontend et Backend"
                  '''
      
            }
        }
    }      
}
