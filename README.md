# Article Searcher

#### Epicodus JS Week 1 Project, 3/15/2017

#### By Charles Peden, Benjamin T. Seaver

## Description

User enters a query to find stories from NYTimes website optionally w/ date ranges.  Program displays link, headline, lead paragraph, author, and publish date.

Stretch Goals:
Date range for search
Multiple page results
Add multiple sites to search against
Aggregate queryer for multiple sites
Support Lucene query method w/ tutorial.
With thumbnail images.
Some sort of loading statement or icon while waiting query return



## Setup Requirements
node.js (for npm)  https://nodejs.org/
npm https://www.npmjs.com/
gulp http://gulpjs.com/
bower https://bower.io/
ruby (for gem install sass) https://www.ruby-lang.org/
sass http://sass-lang.com/install

optional installation tool: Homebrew https://brew.sh/


## Installation Instructions
* Clone project.

Acquire API key from http://developer.nytimes.com/.

Create .env file at root of project folder with the following single line:

exports.nyTimesAPI = "your-NY-Times-API-key-here";

then run at the command line:

npm install

bower install

gem install sass

gulp jshint (to check for errors)

gulp dev (to generate build, gulp prod to uglify/minify the build)

gulp servedev (to serve the dev build, gulp serveprod to serve the production)


##Create New Project - Module Installation Commands

npm init

npm install gulp --save-dev

npm install browserify --save-dev

npm install gulp-concat --save-dev

npm install gulp-uglify --save-dev

npm install gulp-util --save-dev

npm install del --save-dev

npm install jshint --save-dev

npm install vinyl-source-stream --save-dev

npm install browser-sync --save-dev

npm install bower-files --save-dev

npm install gulp-jshint --save-dev

npm install gulp-sass gulp-sourcemaps --save-dev


bower install jquery --save

bower install bootstrap --save

*not currently used* bower install moment --save



## Remove build folder from git project (after adding it to .gitignore)

git filter-branch --tree-filter 'rm -rf build' --prune-empty HEAD

git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d

(edited README.md)

git add README.md

git pair-commit -m "remove build from project"

git gc

git push origin master --force

gem install sass

npm install gulp-sass gulp-sourcemaps --save-dev


## Known Bugs
* No known bugs

## Support and contact details
* No support

## Technologies Used
* Git

## Copyright (c)
* 2017 Charles Peden, Benjamin T. Seaver

## License
* MIT

##Implementation Plan
* draft site design
* npm, gulp, and sass framework buildout
* rudimentary front end for getting query info and display results
* js for manipulation of front end data into api query form
* back end api query
* handle errors: empty result set, bad key or search data, bad destination
* manipulation of results to display
* styling and completion of html



* End specifications
