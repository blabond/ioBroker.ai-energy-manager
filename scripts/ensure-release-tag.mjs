import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const expectedTag = `v${packageJson.version}`;

function git(args) {
    return execFileSync('git', args, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
}

function fail(message) {
    throw new Error(message);
}

try {
    git(['rev-parse', '--verify', '--quiet', `refs/tags/${expectedTag}`]);
} catch {
    fail(`Expected release tag ${expectedTag} does not exist.`);
}

const head = git(['rev-parse', 'HEAD']);
const tagCommit = git(['rev-list', '-n', '1', expectedTag]);

if (tagCommit !== head) {
    fail(`Expected release tag ${expectedTag} to point at HEAD ${head}.`);
}
