pipeline {
    agent any

    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/mbaynd/taskManager.git'
            }
        } 
        
        
        stage("Static Code Analysis  and Vulnerability Scan"){
            stage("Sonar Qube Analysis"){
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

        parallel {
            stage('Install Dependencies') {
                 steps {
                    sh '''
                        echo 'Debut Exuecution INstallation des dependances'
                    '''
                }
                
                steps {
                    sh '''
                        cd frontend
                        npm install
                        npm audit fix --force
                    '''
                }
            }
        }

        stage('TRIVY Vulnerability Scan') {
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
            
        } 
        
        stage("Build Docker Image"){
            steps {
                sh '''
                   docker compose build --force-rm --no-cache   
                  '''
            }
        }

        stage('TRIVY Docker Image Vulnerability Scan') {
                    steps {
                        sh '''
                            trivy image --exit-code 0  --severity HIGH,CRITICAL --scanners vuln taskmanager_main-frontend
                            trivy image --exit-code 0  --severity HIGH,CRITICAL --scanners vuln taskmanager_main-backend
                        '''
                    }
                }
    }      
}



Prestations Maintenance et support DevOPS 
Administration et gestion des plateformes techniques des 
services  de QuickPay sur AWS
