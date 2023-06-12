# Project template

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a project template that can be copied for new projects. Repo has been initialized with following libraries:

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://github.com/typicode/husky)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [Release-it](https://github.com/release-it/release-it)

## Version control

This project [Angular commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits) which are enforced by Commitizen and `CHANGELOG.md` is automatically generated from commits messages.

Release commits are made when new code is pushed in `dev` branch.

## How to use

- Create a new repository
- Obtain a [personal access token](https://github.com/settings/tokens) (release-it only needs "repo" access; no "admin" or other scopes).
- Add your personal access token to repository secrets with the name `TOKEN`
- Make sure you're enabled read and write permissions for your workflow permissions in the repository settings
- Clone this repository
- Delete .git folder
- Delete `CHANGELOG.md`
- Init new git repository
- Update `package.json`
  - Update name
  - Update description
  - Set `version` to 0.0.0
- Commit changes
