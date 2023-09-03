// to run the file:
// npm install -g ts-node
// ts-node filename.ts

import axios from 'axios';
import fs from 'fs';

interface Repo {
    id: number;
    name: string;
    description: string | null;
    owner: {
        id: number;
        login: string;
        avatar_url: string;
        html_url: string;
    };
    html_url: string | null;
    created_at: string;
    updated_at: string;
    git_url: string;
    clone_url: string;
    ssh_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    language: string;
    archived: boolean;
    license: {
        spdx_id: string;
        url: string;
    } | null;
    is_template: boolean;
    topics: string[] | null;
}

const MAX_REQUESTS_PER_HOUR = 5000;
const REQUESTS_PER_MINUTE = 60;
const RATE_LIMIT_DELAY = 60 * 1000 / REQUESTS_PER_MINUTE;

async function fetchStarredRepos(username: string): Promise<Repo[]> {
    let page = 1;
    const repos: Repo[] = [];

    while (true) {
        await delay(RATE_LIMIT_DELAY);

        const response = await axios.get(`https://api.github.com/users/${username}/starred`, {
            params: {
                page: page,
                per_page: 100,
            },
        });

        const repoData = response.data.map((repo: Repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            owner: {
                id: repo.owner.id,
                login: repo.owner.login,
                avatar_url: repo.owner.avatar_url,
                html_url: repo.owner.html_url,
            },
            html_url: repo.html_url,
            created_at: repo.created_at,
            updated_at: repo.updated_at,
            git_url: repo.git_url,
            clone_url: repo.clone_url,
            ssh_url: repo.ssh_url,
            svn_url: repo.svn_url,
            homepage: repo.homepage,
            size: repo.size,
            stargazers_count: repo.stargazers_count,
            watchers_count: repo.watchers_count,
            forks_count: repo.forks_count,
            open_issues_count: repo.open_issues_count,
            language: repo.language,
            archived: repo.archived,
            license: repo.license ? {
                spdx_id: repo.license.spdx_id,
                url: repo.license.url,
            } : null,
            is_template: repo.is_template,
            topics: repo.topics,
        }));

        repos.push(...repoData);

        const nextPageUrl = getNextPageUrl(response.headers.link);
        if (!nextPageUrl) {
            break;
        }

        page = getPageFromUrl(nextPageUrl);
    }

    return repos;
}

function getNextPageUrl(linkHeader: string): string | null {
    const links = linkHeader.split(',');

    for (const link of links) {
        const [url, rel] = link.split(';').map(part => part.trim());
        if (rel === 'rel="next"') {
            const nextPageUrl = url.match(/<(.*?)>/);
            return nextPageUrl ? nextPageUrl[1] : null;
        }
    }

    return null;
}

function getPageFromUrl(url: string): number {
    const regex = /page=(\d+)/;
    const match = url.match(regex);
    if (match) {
        return parseInt(match[1]);
    }
    return 1;
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function generateHTML(username: string) {
    const repos = await fetchStarredRepos(username);

    let html = `<html>
      <body>
        <h1>Starred Repositories of ${username}</h1>
        <ul>`;

    for (const repo of repos) {
        html += `\n        <li>
            <a href="${repo.html_url}">${repo.name}</a>
            <p>${repo.description || ''}</p>
            <p>Owner: <a href="${repo.owner.html_url}">${repo.owner.login}</a></p>
            <p>Language: ${repo.language}</p>
            <p>Stars: ${repo.stargazers_count}</p>
            <p>Created: ${repo.created_at}</p>
            <p>Updated: ${repo.updated_at}</p>
            <p>License: ${repo.license ? repo.license.spdx_id : 'None'}</p>
          </li>
          <hr>`;
    }

    html += `\n      </ul>
      </body>
    </html>`;

    return html;
}

const username = 'jonasfroeller';
generateHTML(username)
    .then(html => {
        fs.writeFileSync('starred_repos.html', html);
        console.log('HTML generated and saved successfully!');
    })
    .catch(error => {
        console.error('Error generating HTML:', error);
    });
