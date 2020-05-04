pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: env.GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: env.GIT_REPO_URL,
          credentialsId: env.CREDENTIALS_ID
        ]]])
      }
    }
    stage('测试') {
      steps {
        sh 'yarn'
      }
    }
    stage('构建并上传到腾讯云 COS Bucket') {
      steps {
        sh 'yarn pro'
      }
    }
    stage('上传到 COS Bucket') {
      steps {
        codingArtifactsGeneric(files: 'dist/**/**', zip: 'front-wCloud-open-manage.zip', repoURL: 'https://clife-devops-generic.pkg.coding.net/public-repository/test-sl', credentialsId: env.public_web_test_credentials_id)
        echo '上传制品成功'
      }
    }
  }
}