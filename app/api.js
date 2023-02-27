var express = require('express');
var app = express();
var fs = require('fs');

function queryParameter(req, key, defaultValue) {
  if (req.query[key] === undefined) {
    return defaultValue;
  }
  return req.query[key];
}

app.get('/', function (req, res) {
  res.json({'data' : 'Hello World'});
});
app.get('/courses', function (req, res) {
  var courses = JSON.parse(fs.readFileSync('/Users/vladimirkarseka/Documents/devLearn/test_qa/app/data/courses.json', 'utf8'));
  let page = parseInt(queryParameter(req, 'page', '1'), 10);
  let limit = parseInt(queryParameter(req, 'limit', '2'), 10);
  courses = courses.slice(page * limit, (page + 2) * limit);

  if (req.query.sort === 'asc') {
    courses = courses.sort(function(a, b){return b.id - a.id});   
  }
  if (req.query.sort === 'desc') {
    courses = courses.sort(function(a, b){return a.id - b.id});   
  } 

  res.json(courses);
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});