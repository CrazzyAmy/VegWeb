
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose().connect('mongodb://localhost:27017/test');
  const postSchema = new mongoose.Schema({
      account: String,
      password: String
  });

  const Post = mongoose.model('Post', postSchema);

  mongoose.post("/addDB", (req, res) => {
 
  });

  var bodyParser = require('body-parser');
  mongoose.use(bodyParser.json());
  mongoose.use(bodyParser.urlencoded({ extended: true }));
  mongoose.post("/addDB", (req, res) => {
    var myData = new Post(req.body);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });
  
  module.exports = Post;