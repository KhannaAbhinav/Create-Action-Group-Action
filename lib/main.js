"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const yaml = __importStar(require("js-yaml"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gitHubRepo = core.getInput('GitHubRepo');
            const gitHubRepoOwner = core.getInput('GitHubRepoOwner');
            const gitHubRepoName = core.getInput('GitHubRepoName');
            const gitHubRepoBranch = core.getInput('GitHubRepoBranch');
            const gitHubToken = core.getInput('GitHubToken');
            const path = core.getInput('Path');
            let actionGroupInputs = {};
            if (null != core.getInput('ActionGroupInputs') || core.getInput('ActionGroupInputs') !== '') {
                actionGroupInputs = JSON.parse(core.getInput('ActionGroupInputs'));
            }
            console.debug(`GitHubRepo :  ${gitHubRepo}`);
            console.debug(`GitHubRepoOwner :  ${gitHubRepoOwner}`);
            console.debug(`GitHubRepoName :  ${gitHubRepoName}`);
            console.debug(`GitHubRepoBranch :  ${gitHubRepoBranch}`);
            console.debug(`Path :  ${path}`);
            console.debug(`ActionGroupInputs :  ${actionGroupInputs}`);
            const octokit = new github.GitHub(gitHubToken);
            const { status, data: response } = yield octokit.repos.getContents({
                owner: gitHubRepoOwner,
                repo: gitHubRepoName,
                path,
                ref: gitHubRepoBranch
            });
            if (status >= 200 || status < 300) {
                if (!Array.isArray(response)) {
                    if (response.content) {
                        const fileContent = Buffer.from(response.content, 'base64').toString('utf-8');
                        console.log(fileContent);
                        console.log(github.context);
                        const actionGroupData = yaml.safeLoad(fileContent);
                        console.log(actionGroupData.inputs);
                        console.log(actionGroupData.outputs);
                        console.log(actionGroupData.steps);
                    }
                    else {
                        core.setFailed('File Content is not good. Please check the file.');
                    }
                }
                else {
                    core.setFailed('Path might be pointing to a directory. Please provide a file path.');
                }
            }
            else {
                core.setFailed('Error in fetching the shared action file. Please check the input values.');
            }
            // octokit.repos.getContents({path: path})
        }
        catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    });
}
main();
