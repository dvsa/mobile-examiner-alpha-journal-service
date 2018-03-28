@Library('MesSharedLibrary@master')
import aws.dvsa.mes.Globals
import aws.dvsa.mes.NVMFunctions
import aws.dvsa.mes.GitFunctions
import aws.dvsa.mes.AWSFunctions
//------------------------------------------
def Globals         = new Globals()
def NVMFunctions    = new NVMFunctions()
def GitFunctions    = new GitFunctions()
def AWSFunctions    = new AWSFunctions()

String uservice_name = "journal"
String branch_name   = "${env.BRANCH_NAME}"
String build_udl     = "${env.BUILD_URL}"


node (Globals.NONPROD_BUILDER_TAG) {
  currentBuild.description = "uservice: ${uservice_name} | BRANCH: ${branch_name}"

  stage ('pre build') {
    GitFunctions.git_check_out(Globals.GITHUB_USERVICE_REPOS[uservice_name], branch_name, uservice_name, Globals.GITHUB_CREDS[uservice_name], true)
    NVMFunctions.ensure_nvm_installed()
    dir(uservice_name) {
      NVMFunctions.run("./dist-scripts/pre-build.sh")
    }
  }
  stage ('test') {
    dir(uservice_name) {
      NVMFunctions.run("./dist-scripts/test.sh")
    }
  }
  stage ('build') {
    dir(uservice_name) {
      NVMFunctions.run("./dist-scripts/build.sh")
    }
  }
  stage ('package') {
    dir(uservice_name) {
      NVMFunctions.run("./dist-scripts/create-package.sh")
    }
  }
  stage('upload to s3') {
    dir(uservice_name) {
      AWSFunctions.upload_s3('dist/deployment-package.zip', s3_bucket_id, uservice_name + ".zip")
    }
  }
}
