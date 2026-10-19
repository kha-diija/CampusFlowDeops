
pipeline {
    // Déclare un pipeline Jenkins de type Declarative Pipeline.

    agent any
    // Jenkins peut exécuter ce pipeline sur n'importe quel agent disponible.

    tools {
        // Déclare les outils nécessaires au pipeline.
        maven 'maven-3.9.6'
    }

    triggers {
        // Définit les événements qui peuvent lancer le pipeline.

        githubPush()
        // Déclenche le pipeline lorsqu'un push GitHub est reçu
        // par Jenkins, si le webhook est correctement configuré.

        pollSCM('H/5 * * * *')
        // Vérifie périodiquement si le dépôt Git a changé.
        // H/5 signifie environ toutes les 5 minutes.
    }

    stages {
        // Contient les différentes étapes du pipeline.

        stage('Checkout') {
            // Première étape : récupérer le code source.

            steps {
                checkout scm
                // Récupère le code depuis le dépôt SCM
            }
        }

        stage('Build') {
            // Deuxième étape : compiler et construire l'application.

            steps {
                dir('backend') {
                    // Exécute les commandes dans le dossier backend.

                    sh 'mvn -B clean package -DskipTests'
                    // clean : supprime les anciens fichiers de build.
                    // package : compile le code et crée le JAR.
                    // -B : active le mode non interactif de Maven.
                    // -DskipTests : ne lance pas les tests.
                }
            }
        }

        stage('Test') {
            // Troisième étape : exécuter les tests.

            steps {
                dir('backend') {
                    // Se place dans le dossier backend.

                    sh 'mvn -B test'
                    // Lance les tests du projet avec Maven.
                }
            }

            post {
                // Actions à effectuer après cette étape.

                always {
                    // Exécute cette action même si les tests échouent.

                    junit allowEmptyResults: true,
                          testResults: 'backend/target/surefire-reports/*.xml'
                    // Lit les rapports XML générés par les tests.
                    // Jenkins affiche les résultats des tests.
                    // allowEmptyResults: true évite une erreur
                    // uniquement parce qu'aucun rapport n'existe.
                }
            }
        }
    }

    post {
        // Actions à effectuer à la fin de tout le pipeline.

        success {
            // Exécute cette action uniquement si le pipeline réussit.

            archiveArtifacts artifacts: 'backend/target/*.jar',
                             fingerprint: true
            // Archive les fichiers JAR générés par Maven.
            // Ils deviennent téléchargeables depuis le build Jenkins.
            // fingerprint: true permet de suivre leur empreinte
            // pour identifier et tracer les artefacts.
        }
    }
}
