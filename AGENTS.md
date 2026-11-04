# Development and releases

- Work on `develop` by default. `main` is the production branch used by GitHub Pages.
- Keep routine changes, commits, and pushes on `develop`.
- Release by opening a pull request from `develop` to `main`; merge when the user requests a production release.
- Do not push directly to `main`, force-push production, or change the GitHub Pages source during routine development.
- Before a release, review the diff and run checks appropriate to the change. Preserve unrelated user edits.
