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

                stage ("Install NPM Dependencies") {
                    steps {
                        sh '''
                            cd frontend
                            npm install
                        '''
                    }
                }

                stage('TRIVY Vulnerability Scan') {
                    steps {
                        sh "trivy fs --scanners vuln . > trivyfs.txt"
                    }
                }
            }
        } 
        
        stage('OWASP Dependency') {
            steps {
                dependencyCheck additionalArguments: '--scan ./  --nvdApiKey "ed43c876-8976-4e9c-aa2a-346aafb569ba"  --format HTML ', odcInstallation: 'DP_Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
            
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
    
        stage("Build Docker Image"){
            steps {
                sh '''
                   echo "DEBUT --- Build des images Frontend et Backend"
                   docker compose build --force-rm --no-cache   
                   echo "FIN --- Build des images Frontend et Backend"
                  '''
            }
        }

        stage('TRIVY Docker Image Vulnerability Scan') {
                    steps {
                        sh '''
                            trivy image --exit-code 0  --severity HIGH,CRITICAL --scanners vuln taskmanager_main-frontend > trivyimage.txt
                            trivy image --exit-code 0  --severity HIGH,CRITICAL --scanners vuln taskmanager_main-backend >> trivyimage.txt
                        '''
                    }
                }
    }     
    post {
     always {
        emailext attachLog: true,
            subject: "'${currentBuild.result}'",
            body: "Project: ${env.JOB_NAME}<br/>" +
                "Build Number: ${env.BUILD_NUMBER}<br/>" +
                "URL: ${env.BUILD_URL}<br/>",
            to: 'mbaynd@gmail.com',                               
            attachmentsPattern: 'trivyfs.txt,trivyimage.txt'
        }
    } 
}
