import * as core from '@actions/core'
import * as github from '@actions/github'

async function main(): Promise<void> {
  try {
    const gitHubRepo = core.getInput('GitHubRepo')
    const gitHubToken = core.getInput('GitHubToken')
    const path = core.getInput('Path')
    let actionGroupInputs = {}
    if (null != core.getInput('ActionGroupInputs')) actionGroupInputs = JSON.parse(core.getInput('ActionGroupInputs'))

    console.debug(`GitHubRepo :  ${gitHubRepo}`)
    console.debug(`Path :  ${path}`)
    console.debug(`ActionGroupInputs :  ${actionGroupInputs}`)

    const octokit = new github.GitHub(gitHubToken, {baseUrl: gitHubRepo})

    console.log(octokit)
    console.log(octokit.request(gitHubRepo))
    console.log(octokit.git.getTree())
    console.log(octokit.repos.get())

    // octokit.repos.getContents({path: path})
  } catch (error) {
    console.log(error)
    core.setFailed(error.message)
  }
}

main()
