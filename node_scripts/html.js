const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const { render } = require('@riotjs/ssr')
const register = require('@riotjs/ssr/register')
const srcDirFromRoot = './src/html'
const srcDirFromFile = '../src/html'
const outputDir = 'dist'
const file = path.join(srcDirFromFile, 'html.riot')
const pages = JSON.parse(fs.readFileSync(path.join(srcDirFromRoot, 'pages.json')))
const getDirName = require('path').dirname


// Riot コンポーネントを require できるように
register()

const generateHtml = (outputPath) => {
  const Root = require(file).default
  const html = render('html', Root)
  const fileName = outputPath.match(/\.html?$/) ? '' : 'index.html'
  mkdirp.sync(path.parse(path.join(outputDir, outputPath)).dir)
  fs.writeFile(path.join(outputDir, outputPath, fileName), html, err => {
    if (err) throw err
  })
}

pages.forEach(page => {
  generateHtml(page.path)
})