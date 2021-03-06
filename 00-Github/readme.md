# Getting Started with Source Control

[Git Bash Download](https://git-scm.com/downloads)

[Git Extensions for Windows](https://sourceforge.net/projects/gitextensions/)

[Git Graph VS Code](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

[Git History Diff](https://marketplace.visualstudio.com/items?itemName=huizhou.githd)

## Labs

[Version Controlling with Git in Azure Repos - Exercises 1 - 5](https://www.azuredevopslabs.com/labs/azuredevops/git/)

## Learning Labs:

[Introduction to Git](https://docs.microsoft.com/en-us/learn/modules/intro-to-git/)

[Learning Path - Introduction to version control with Git](https://docs.microsoft.com/en-us/learn/paths/intro-to-vc-git/)

# Git / Github Essentials

## Configuration

Set User and E-Mail

`git config --global user.name "Your Name"`

`git config --global user.email "your.email@yourdomain.com`

Unset Credentials

`git config --global --unset credential.helper`

## Basic Git Commands

Init Git: `git init`

Add all files to Git: `git add .`

Add a specific file to Git: `git add file.txt | *.ts`

Commit files: `git commit -m "your checkin comment"`

Get a spcific Commit: `git checkout <sha1>`

## Status & Updates

Show Commit logs: `git log`

Check for remote updates: `git remote update`

Show Status (Adds/Delets/Changes): `git status`

## Branching

List Branches: `git branch`

Create Branch: git branch feature/myfeature

Push new Branch to remote: `git push origin [name_of_your_new_branch]`

Switch to Branch: `git checkout [name_of_your_branch]`

> Note: When switching branches it is always good advice to check the status with `git status` on a windows machine. When there are changes from other branches on the disk you can clean the branch using `git clean -f`

Merge Branch: `git merge [branch_to_merge]`

## Remotes

Adding Remotes: `git remote add origin https://github.com/try-git/try_git.git`

Pull / Push from / to repository: `git pull / git push`

## Tags

Create Lightweight tag : `git tag -l v1.1.0`

Create Annotated tag : `git tag -a v2.0.1 -m "fixed Bug on replaced data layer. do not use v.2.0.0"`

List all tags: `git tag`

Show a specific tag: `git show v2.0.1`

Push tags to Remote: `git push origin v2.0.1 | git push --tags`

Delete tag: `git tag -d v2.0.1`

Checkout tag: `git checkout 2.0.1`

## Configure ignored files

Add a `.gitignore` file to the root of your project. A valid `.gitignore` file can be generated at https://www.gitignore.io/

## Refresh from Upstream

> Note: You can use this guide to refresh changes I made during the week to your forked repo

Open Git Bash.

List the current configured remote repository for your fork.

```
git remote -v
> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
> origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
```

Specify a new remote upstream repository that will be synced with the fork.

```
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```

Verify the new upstream repository you've specified for your fork.

```
git remote -v
> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
> origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
> upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
```

Fetch from Upstream:

```
 git fetch upstream
 git merge upstream/master
 git push origin master
```

## Git-flow

[Gitflow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

> Note: Require GIT 2.24.0+ - Check with `git --version`

Initialize repo for gitflow:

```
git flow init
```

Start a new feature:

```
git flow feature start MYFEATURE
```

Finish feature:

```
git flow feature finish MYFEATURE
```

Publish a feature:

```
git flow feature publish  MYFEATURE
```

Start a release:

```
git flow release start RELEASE
```

Finish a release:

```
git flow release finish  RELEASE
```

## Github CLI

[GitHub CLI Documentation](https://cli.github.com/manual/)

[GitHub CLI Download](https://github.com/cli/cli/releases/download/v1.1.0/gh_1.1.0_windows_amd64.msi)

Installation using Chocolatey:

```
choco install gh
```
