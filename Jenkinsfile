pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/mbaynd/taskManager.git'
            }
        } 
        
        
        stage(" Sonarqube Analysis "){
            parallel {
                stage('"DEBUT - TRIVY Vulnerability Scan') {
                    steps {
                        sh "trivy fs ."
                    }
                }
                stage("DEBUT -----> de Sonarqube Analysis") {
                    steps {
                        sh 'echo "DEBUT - Sonar Scan"'
                    }
                }

                stage("DEBUT de Sonar Qube Analysis"){
                    steps {
                        withSonarQubeEnv('sonar') {
                            sh '''
                            /opt/sonar-scanner/bin/sonar-scanner -Dsonar.projectName=TaskManager \
                            -Dsonar.projectKey=TaskManager
                            echo "FIN - Sonar Scan"
                            ''' 
                        }
                    }
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
