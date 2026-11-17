pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-cred'
        DOCKER_IMAGE          = 'manasavenu2004/techworld'
        SONAR_SERVER_NAME     = 'sonarqube-env'
        SONAR_SCANNER_TOOL    = 'sonar-scanner'
        GIT_CREDENTIALS_ID    = 'github-cred'
        MANIFEST_REPO         = 'https://github.com/manasavenu-2004/TechWorld.git'
        MANIFEST_BRANCH       = 'main'
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/manasavenu-2004/TechWorld.git'

                echo "passed"
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool "${SONAR_SCANNER_TOOL}"

                    withSonarQubeEnv("${SONAR_SERVER_NAME}") {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=techworld-key \
                            -Dsonar.projectName=techworld-project \
                            -Dsonar.sources=. \
                            -Dsonar.exclusions=**/Dockerfile,**/Jenkinsfile
                        """
                    }
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    withCredentials([
                        usernamePassword(
                            credentialsId: "${DOCKER_CREDENTIALS_ID}",
                            usernameVariable: 'DOCKER_USER',
                            passwordVariable: 'DOCKER_PASS'
                        )
                    ]) {
                        sh """
                            echo "\$DOCKER_PASS" | docker login -u "\$DOCKER_USER" --password-stdin

                            docker build \
                            -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                            -t ${DOCKER_IMAGE}:latest \
                            -f Dockerfile .

                            docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}
                            docker push ${DOCKER_IMAGE}:latest

                            docker logout
                        """
                    }
                }
            }
        }

        
stage('Update Manifest Repo') {
    steps {
        withCredentials([
            usernamePassword(
                credentialsId: "${GIT_CREDENTIALS_ID}",
                usernameVariable: 'GH_USER',
                passwordVariable: 'GH_TOKEN'
            )
        ]) {
            sh """
                git config user.name "manasavenu-2004"
                git config user.email "manasavenu88914@gmail.com"

                sed -i 's|image:.*|image: ${DOCKER_IMAGE}:${BUILD_NUMBER}|' manifests/deployment.yml

                git add manifests/deployment.yml

                git commit -m "Update TechWorld image tag to ${BUILD_NUMBER} [skip ci]"

                git remote set-url origin https://\${GH_USER}:\${GH_TOKEN}@github.com/manasavenu-2004/TechWorld.git

                git pull --rebase origin main

                git push origin main
            """
        }
    }
}

    post {
        success {
            echo 'TechWorld pipeline executed successfully! Manifest repo updated with new image tag.'
        }

        failure {
            echo 'Pipeline failed. Please review the stage logs above.'
        }
    }
}
