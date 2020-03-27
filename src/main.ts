import * as core from '@actions/core'
import * as github from '@actions/github'
import {ActionGroup} from './typings/actiongroup'
import * as yaml from 'js-yaml'
async function main(): Promise<void> {
  try {
    const gitHubRepo = core.getInput('GitHubRepo')
    const gitHubRepoOwner = core.getInput('GitHubRepoOwner')
    const gitHubRepoName = core.getInput('GitHubRepoName')
    const gitHubRepoBranch = core.getInput('GitHubRepoBranch')
    const gitHubToken = core.getInput('GitHubToken')
    const path = core.getInput('Path')

    let actionGroupInputs = {}
    if (null != core.getInput('ActionGroupInputs') || core.getInput('ActionGroupInputs') !== '') {
      actionGroupInputs = JSON.parse(core.getInput('ActionGroupInputs'))
    }

    console.debug(`GitHubRepo :  ${gitHubRepo}`)
    console.debug(`GitHubRepoOwner :  ${gitHubRepoOwner}`)
    console.debug(`GitHubRepoName :  ${gitHubRepoName}`)
    console.debug(`GitHubRepoBranch :  ${gitHubRepoBranch}`)
    console.debug(`Path :  ${path}`)
    console.debug(`ActionGroupInputs :  ${actionGroupInputs}`)

    const octokit = new github.GitHub(gitHubToken)

    const {status, data: response} = await octokit.repos.getContents({
      owner: gitHubRepoOwner,
      repo: gitHubRepoName,
      path,
      ref: gitHubRepoBranch
    })

    if (status >= 200 || status < 300) {
      if (!Array.isArray(response)) {
        if (response.content) {
          const fileContent: string = Buffer.from(response.content, 'base64').toString('utf-8')
          console.log(fileContent)
          console.log(github.context)
          const actionGroupData: ActionGroup = yaml.safeLoad(fileContent) as ActionGroup
          console.log(actionGroupData.inputs)
          console.log(actionGroupData.outputs)
          console.log(actionGroupData.steps)
        } else {
          core.setFailed('File Content is not good. Please check the file.')
        }
      } else {
        core.setFailed('Path might be pointing to a directory. Please provide a file path.')
      }
    } else {
      core.setFailed('Error in fetching the shared action file. Please check the input values.')
    }

    // octokit.repos.getContents({path: path})
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

main()
