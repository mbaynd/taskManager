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

                stage('OWASP Dependency') {
                    steps {
                        dependencyCheck additionalArguments: '--scan ./  --nvdApiKey "ed43c876-8976-4e9c-aa2a-346aafb569ba"  --format HTML ', odcInstallation: 'DP_Check'
                        dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
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



Prestations Maintenance et support DevOPS 
Administration et gestion des plateformes techniques des 
services  de QuickPay sur AWS
