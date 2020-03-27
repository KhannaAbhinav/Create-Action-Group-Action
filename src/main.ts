import * as core from '@actions/core'
import * as github from '@actions/github'

async function main(): Promise<void> {
  try {
    const gitHubRepo = core.getInput('GitHubRepo')
    const gitHubRepoOwner = core.getInput('GitHubRepoOwner')
    const gitHubRepoName = core.getInput('GitHubRepoName')
    const gitHubToken = core.getInput('GitHubToken')
    const path = core.getInput('Path')
    let actionGroupInputs = {}
    if (null != core.getInput('ActionGroupInputs') || core.getInput('ActionGroupInputs') !== '') {
      actionGroupInputs = JSON.parse(core.getInput('ActionGroupInputs'))
    }

    console.debug(`GitHubRepo :  ${gitHubRepo}`)
    console.debug(`GitHubRepoOwner :  ${gitHubRepoOwner}`)
    console.debug(`GitHubRepoName :  ${gitHubRepoName}`)
    console.debug(`Path :  ${path}`)
    console.debug(`ActionGroupInputs :  ${actionGroupInputs}`)

    const octokit = new github.GitHub(gitHubToken)

    console.log(
      await octokit.repos.getContents({
        owner: gitHubRepoOwner,
        repo: gitHubRepoName,
        path
      })
    )

    // octokit.repos.getContents({path: path})
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

main()
