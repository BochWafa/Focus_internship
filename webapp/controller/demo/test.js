yaml = require('js-yaml');
fs   = require('fs');


function test() {
// Get document, or throw exception on error
try {
  var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}}