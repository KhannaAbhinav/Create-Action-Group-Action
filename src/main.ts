import * as core from '@actions/core'
import * as github from '@actions/github'

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
        const fileContent: string = response.content ? response.content : ''
        console.log(Buffer.from(fileContent, 'base64'))
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
