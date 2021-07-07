const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb')
const router = express.Router();

router.post('/',validateUser, (req, res) => {
  // do your magic!
  console.log(`HEY! ${req.body}`)
userDb.insert(req.body)
.then(user=>{console.log(user)
res.status(200).json(user)
})
.catch(err=>{console.log(err)
  res.status(500).json({error: "There was an error while saving the post to the database"})
  })
});

router.post('/:id/posts',validateUserId,validatePost, (req, res) => {
  // do your magic!
  console.log(req.body)
  console.log(req.params.id)
  const text = req.body
  const user_id = req.params.id 
  const submit = {...text,user_id}
  console.log(submit)
  postDb.insert(submit)
  .then(post=>{console.log(post)
  res.status(200).json(post)
  })
  .catch(err=>{console.log(err)
    res.status(500).json({error: "There was an error while saving the post to the database"})
    })

});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get()
  .then(users=>{
    console.log(users)
    res.status(200).json(users)})
    .catch(err=>{console.log(err)
      res.status(500).json({error: "There was an error while saving the post to the database"})
      })

});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
 id = req.params.id
userDb.getById(id)
.then(user=>{
  res.status(200).json(user)})
.catch(err=>{console.log(err)
  res.status(500).json({error: "There was an error while saving the post to the database"})
  })
});

router.get('/:id/posts', validateUserId,(req, res) => {
  // do your magic!
  id = req.params.id
postDb.getById(id)
.then(posts=>{
  res.status(200).json(posts)})
.catch(err=>{console.log(err)
  res.status(500).json({error: "There was an error while saving the post to the database"})
  })
});

router.get('/:id/userposts', validateUserId,(req,res)=>{
  id = req.params.id
userDb.getUserPosts(id)
.then(user=>{
  res.status(200).json(user)})
.catch(err=>{console.log(err)
  res.status(500).json({error: "There was an error while saving the post to the database"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
  userDb.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The user has been removed' });
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the user',
      });
    });
});

router.put('/:id',validateUserId, (req, res) => {
  // do your magic!
  id = req.params.id
  changes= req.body
  userDb.update(id, changes)
        .then(user => {
            res.status(200).json(user) 
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified.", error: err })
        })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id 
  let user = {}
  userDb.getById(id)
  .then(res=>{
  user = res
  })
  .catch()
  if(typeof user == "object"){
    next();
  }else{
    res.status(400).json({message:"invalid user id"})
  }
  
}

function validateUser(req, res, next) {
  // do your magic!
  console.log(req)
 if(!req.body.name){
   res.status(400).json({message: "missing required name field"})
 }else{
   next();
 }
  
}
function validatePost(req, res, next) {
  // do your magic!
postData = req.body
if(!postData.text){
  res.status(400).json({message: "missing required text field"})
}else{
  next();
}
}

module.exports = router;
