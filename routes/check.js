var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('You have to POST a SHA1 hashed password, no GET allowed for security reasons');
});

router.post('/', function(req, res, next) {
  var password = req.params.password || req.body.password
  if (password && password.matches("[a-fA-F0-9]{40}")) {
    var partition = password.substr(0,3).toLowerCase();
    var partitionFile = path.join(process.cwd(), "PasswordPartitions", partition + ".txt")
    var stream = fs.createReadStream(partitionFile);
    var found = false;
    stream.on('data',function(d){
      if(!found) found=!!(''+d).match(password.toUpperCase())
    });
    stream.on('error',function(err){
      console.log(err);
    });
    stream.on('close',function(err){
      if(found) {
        res.status(200).json({'found': found});
      } else {
        res.status(404).json({'found': found});
      }
    });
  } else {
    res.status(400).json({'message': 'password needs to be a sha1 hash'});
  }
});

module.exports = router;