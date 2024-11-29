# Hack template for frontend

Our hackaton frontend in Tambov

## Contents

1. [Tech stack](#tech-stack)
   1. [Dependencies](#dependencies)
2. [Getting started](#getting-started)
   1. [Requirements](#requirements)
   2. [Install](#install)
      1. [By `git clone`](#by-git-clone)
      2. [By GitHub](#by-github)
3. [Contribute](#contribute)
4. [Useful links](#useful-links)

## Tech stack

<img src="https://skillicons.dev/icons?i=svelte,typescript,tailwind,vite" />

### Dependencies

1. TaiwindCSS
2. Shadcn-UI
3. Lucida Icons
4. Vitest

## Getting Started

### Requirements

- node.js and npm
- git

### Install

#### By `git clone`

Use following commands:

```bash
# clone the repository
git clone git@github.com:InTeam-Russia/hack-template-frontend.git
cd hack-template-frontend

# install yarn
npm i -g yarn

# setup project
yarn
yarn dev
```

#### By GitHub

Just press `Use template`, make new repo and work with it

## Contribute

Follow this steps to make this repo clean

1. Always do extra check for code style before committing, using:

```bash
yarn format
yarn lint
yarn test # if nessesary
```

2. Use [conventional commits](https://www.conventionalcommits.org/ru/v1.0.0/)

3. Do **not** push direct into main. Insead, use pull requests

4. Do **not** use GitHub to make commits &mdash; they're probably won't pass lint check. And, if you did, do this manually:

- If bad commit is last

```bash
git pull origin <branch>
yarn format
git commit --amend -m "use same commit message"
git push origin <branch> --force-with-lease
```

- If bad commit is not last

```bash
git pull origin <branch>
yarn format
git commit -m "chore: format bad commit"

git log # find commit with hash e.x. `COMMIT` that is at least two commits higher than bad
git rebase -i COMMIT

# Do interactive rebase - select your fix commit and replace `pick` with `f`. Save and quit your git editor

git log # check if your fix commit is disappeared

git push origin <branch> --force-with-lease
```

## Useful links

1. [Svelte docs](https://svelte.dev/docs/svelte/overview)
2. [SvelteKit docs](https://svelte.dev/docs/kit/introduction)
3. [SvelteKit docs (in russian)](https://svelte-kit.ru/)
4. [Shadcn-svelte docs](https://shadcn-svelte.com/)
5. [TailwindCSS official website](https://tailwindcss.com/docs/)
