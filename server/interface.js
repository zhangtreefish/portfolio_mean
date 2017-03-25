exports.insert = function(db, proj, callback) {
  db.collection('projects').insertOne(proj, function(error, results){
  	if(error){
  		console.log(error);
  	}
  	callback(null);
  })
};

exports.byTool = function(db, tool, callback) {
  db.collection('projects').find({'tools': tool}).sort({title: 1}).toArray(function(error, result){
  	if(error){
  		console.log(error);
  	}
  	callback(null, result);
  })
};

exports.byGenre = function(db, genre, callback) {
  db.collection('projects').find({'genre': genre}).sort({title: 1}).toArray(function(error, result){
    if(error){
      console.log(error);
    }
    callback(null, result);
  })
};
