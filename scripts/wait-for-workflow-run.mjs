import { setTimeout as delay } from 'node:timers/promises';

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
    args.set(process.argv[index], process.argv[index + 1]);
}

const workflow = args.get('--workflow');
const ref = args.get('--ref');
const sha = args.get('--sha');
const timeoutSeconds = Number(args.get('--timeout') || 900);
const pollSeconds = Number(args.get('--poll') || 10);
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

if (!workflow || !ref || !sha) {
    throw new Error(
        'Usage: node scripts/wait-for-workflow-run.mjs --workflow <file> --ref <branch-or-tag> --sha <sha>',
    );
}

if (!repository || !token) {
    throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN must be set.');
}

const startedAt = Date.now();
const deadline = startedAt + timeoutSeconds * 1000;
const workflowPath = encodeURIComponent(workflow);
const apiUrl = `https://api.github.com/repos/${repository}/actions/workflows/${workflowPath}/runs?event=workflow_dispatch&per_page=100`;
const dispatchUrl = `https://api.github.com/repos/${repository}/actions/workflows/${workflowPath}/dispatches`;
let lastRunId = 0;

async function dispatchWorkflow() {
    const response = await fetch(dispatchUrl, {
        method: 'POST',
        headers: {
            accept: 'application/vnd.github+json',
            authorization: `Bearer ${token}`,
            'content-type': 'application/json',
            'x-github-api-version': '2022-11-28',
        },
        body: JSON.stringify({ ref }),
    });
    if (!response.ok) {
        throw new Error(`GitHub workflow dispatch returned ${response.status}: ${await response.text()}`);
    }
    console.log(`Dispatched ${workflow} for ${ref}.`);
}

async function listRuns() {
    const response = await fetch(apiUrl, {
        headers: {
            accept: 'application/vnd.github+json',
            authorization: `Bearer ${token}`,
            'x-github-api-version': '2022-11-28',
        },
    });
    if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);
    }
    const data = await response.json();
    return Array.isArray(data.workflow_runs) ? data.workflow_runs : [];
}

await dispatchWorkflow();

while (Date.now() < deadline) {
    const runs = await listRuns();
    const run = runs.find(item => {
        const createdAt = Date.parse(item.created_at);
        return item.head_sha === sha && item.head_branch === ref && createdAt >= startedAt - 60_000;
    });

    if (run) {
        if (run.id !== lastRunId) {
            console.log(`Found ${workflow} run for ${ref} at ${sha}: ${run.html_url}`);
            lastRunId = run.id;
        }

        if (run.status === 'completed') {
            if (run.conclusion === 'success') {
                console.log(`${workflow} run for ${ref} completed successfully.`);
                process.exit(0);
            }
            throw new Error(`${workflow} run for ${ref} completed with conclusion ${run.conclusion}: ${run.html_url}`);
        }

        console.log(`${workflow} run for ${ref} is ${run.status}; waiting...`);
    } else {
        console.log(`Waiting for ${workflow} run for ${ref} at ${sha}...`);
    }

    await delay(pollSeconds * 1000);
}

throw new Error(`Timed out waiting for ${workflow} run for ${ref} at ${sha}.`);
