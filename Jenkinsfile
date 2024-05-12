pipeline {
    agent any

    stages {
        stage ("Clean Up Workspace") {
            steps {

                sh 'echo "Celaning the Workspace first"'
                cleanWs()
            }
        }

        stage ("Trivy Scan GITHUB Repository") {
            steps{
                sh 'trivy repository --exit-code 0 --no-progress --severity HIGH,CRITICAL --scanners vuln https://github.com/mbaynd/taskManager.git > trivyrepo.txt'
            }
        }
        stage('Git Checkout') {
            steps { 
                checkout scm
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

        stage("Project Dependencies and FS Scan"){
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
        
        stage('OWASP Dependency-Check Vulnerabilities') {
            steps {
                dependencyCheck additionalArguments: ''' 
                            -o './'
                            -s './'
                            -f 'ALL' 
                            --prettyPrint''', odcInstallation: 'DP_Check'
                
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
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
                    trivy image --exit-code 0  --severity HIGH,CRITICAL --scanners vuln taskmanager_main-frontend > trivyimage.txt
                    trivy image --exit-code 0  --severity HIGH,CRITICAL --scanners vuln taskmanager_main-backend >> trivyimage.txt
                '''
            }
        }

        stage("Docker Build & Push"){
            steps{
                script{
                   withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                       sh "docker tag taskmanagerfrontend mbaynd/taskmanagerfrontend:latest"
                       sh "docker tag taskmanagerfrontend mbaynd/taskmanagerbackend:latest "
                       sh 'echo "salafiyAAA" | docker login -u mbaynd --password-stdin'
                       sh "docker push mbaynd/taskmanagerfrontend:latest"
                       sh "docker push mbaynd/taskmanagerbackend:latest"
                    }
                }
            }
        }

        stage('Deploy to container to Staging') {
            steps{
                sh 'docker-compose up -d'
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
            to: 'mbaynd@gmail.com;mbaynd@yahoo.fr',                               
            attachmentsPattern: 'trivyrepo.txt,trivyfs.txt,trivyimage.txt'
        }
    } 
}
