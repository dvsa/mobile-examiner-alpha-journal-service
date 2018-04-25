@Library('MesSharedLibrary@master')
import aws.dvsa.mes.Globals
import aws.dvsa.mes.NVMFunctions
import aws.dvsa.mes.GitFunctions
import aws.dvsa.mes.AWSFunctions
import aws.dvsa.mes.TerraformFunctions
//------------------------------------------
def Globals         = new Globals()
def NVMFunctions    = new NVMFunctions()
def GitFunctions    = new GitFunctions()
def AWSFunctions    = new AWSFunctions()
def TFFunctions     = new TerraformFunctions()

Map<String,String> tf_actions = [:]
String tf_log_level = ""
String uservice_name = "journal"
String branch_name   = "${env.BRANCH_NAME}"
String tf_component = Globals.USERVICE_MAPPING[uservice_name]


node (Globals.NONPROD_BUILDER_TAG) {
  currentBuild.description = "BRANCH: ${branch_name}"

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
    if(branch_name == "develop" || branch_name == "origin/develop"){
      dir(uservice_name) {
        AWSFunctions.upload_s3('dist/deployment-package.zip', Globals.NONPROD_S3_BUCKET_ID, uservice_name + ".zip")
      }
    }
  }
  stage('refresh lambda') {
    if(branch_name == "develop" || branch_name == "origin/develop"){
      GitFunctions.git_check_out(Globals.GITLAB_TERRAFORM_REPO, "master", 'terraform', Globals.GITLAB_TERRAFORM_CREDS)
      tf_actions = TFFunctions.define_tf_actions('apply')
      sha256sum = AWSFunctions.get_s3_object_sha256(Globals.NONPROD_S3_BUCKET_ID, uservice_name + ".zip")
      tf_extra_args = " -var '${uservice_name}_code_base64sha256sum=${sha256sum}' -target module.${uservice_name}_uservice.aws_lambda_function.general_lambda_function"
      dir("terraform") {
        TFFunctions.terraform_run(Globals.PROJECT_NAME, "develop", tf_component, tf_actions['apply'], Globals.TF_BUCKET_PREFIX, Globals.AWS_DEFAULT_REGION, tf_log_level, tf_extra_args)
      }
    }
  }
  stage('smoke-test') {
    if(branch_name == "develop" || branch_name == "origin/develop"){
      dir(uservice_name) {
        withEnv(["JOURNAL_API_URL="+Globals.JOURNAL_API_URL]){
          NVMFunctions.run("./dist-scripts/smoke-test.sh")
        }
      }
    }
  }
}
