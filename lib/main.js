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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const gitHubRepo = core.getInput('GitHubRepo');
            const gitHubToken = core.getInput('GitHubToken');
            const path = core.getInput('Path');
            const actionGroupInputs = JSON.parse(core.getInput('ActionGroupInputs'));
            console.debug(`GitHubRepo :  ${gitHubRepo}`);
            console.debug(`Path :  ${path}`);
            console.debug(`ActionGroupInputs :  ${actionGroupInputs}`);
            const octokit = new github.GitHub(gitHubToken, { baseUrl: gitHubRepo });
            console.log(octokit);
            console.log(octokit.request(gitHubRepo));
            console.log(octokit.git.getTree());
            console.log(octokit.repos.get());
            // octokit.repos.getContents({path: path})
        }
        catch (error) {
            console.log(error);
            core.setFailed(error.message);
        }
    });
}
main();
