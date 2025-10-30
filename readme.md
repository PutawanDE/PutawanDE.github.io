# My Personal Blog

## Built with Jekyll

Jekyll is a simple, blog-aware, static site generator for personal, project, or organization sites. It takes your content, renders Markdown and Liquid templates, and produces a complete, static website ready to be served by Apache, Nginx, or another web server.

## Why Jekyll?

- Supports Markdown natively. I love writing in Markdown.
- I'm bored with React/Vue/Angular SPA and want to try something different.
- Static site generation is great for blogs and personal websites.
- Easy to deploy on GitHub Pages.
- Great for SEO.
- No database required.
- Easily customizable with HTML, CSS, and JavaScript.

## Set up Environment

[Official Guide](https://jekyllrb.com/docs/installation/)

1. Install Ruby+Devkit. You can use `winget`.
2. Run the `ridk install` command in the terminal to install `MSYS2 and MINGW development toolchain`.
3. `gem update`
4. Install Jekyll and Bundler gems: `gem install jekyll bundler`.

## Start the project

1. `npm i`
2. `bundle exec jekyll serve --livereload`. `--livereload` for hot reload.

## Build

1. `bundle exec jekyll build`
2. The static site will be in `_site` folder.
3. You can deploy it to GitHub Pages or any static hosting service.
4. Pushing to main will automatically build and deploy to GitHub Pages at branch `gh-pages`.

## Read more

- [Jekyll Documentation](https://jekyllrb.com/docs/home/)
- [GitHub Pages & Jekyll Documentation](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)