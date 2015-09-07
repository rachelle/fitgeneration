var express = require('express'); 
var mongoose = require('mongoose'); 

/* sources in required models */
var Photo = require('../models/Photo'); 
var User = require('../models/User'); 

/* gets all progress photos from user */
module.exports.renderPhotosNew = function(req, res){
  var photos = Photo.all 
  res.render('./photos/new', {user: req.user, photos: photos});
};

module.exports.renderPhotosCreate = function(req, res, next){
  var Photo = new Photo({
    caption:    req.body.caption, 
    image:      req.body.image, 
    date_taken: req.body.data_taken, 
    comment:    req.body.comment, 
    user:       req.user
  });   
  console.log(req.body); 
  photo.save(function(error){
    if(error){res.send('> ', + err);}
      req.user.photos.push(photo); 
      req.user.save(); 
      res.redirect('/photos/' + photo.id)
  });
};

module.exports.renderPhotosEdit = function(req, res, next){
  var id       = req.params.id; 
  var photo_id = req.params.id; 

  Photo.findById({_id: id}, function(error, photo){
    console.log('photo', photo); 
    if(error) res.send(error); 
      res.render(
        './photos/edit', {
          photo: photo, 
          user: req.user
        });
      })
    };

module.exports.renderPhotosUpdate = function(req, res, next) {
  var id = req.params.id; 

  Photo.findById({_id: id}, function(error, photo) {
    if(error) res.send(error); 
      if (req.body.image) photo.image = req.body.image; 
      if (req.body.caption) photo.caption = req.body.caption; 
      if (req.body.date_taken) photo.data_taken = req.body.date_taken; 
      if (req.body.comment) photo.comment = req.body.comment; 

      photo.save(function(error) {
        if (error) res.send(error); 
          res.redirect('/photos/' + id);
        });
      });
  };

module.exports.deletePhoto = function(req, res){
  var id = req.params.id; 
  var photo_id = req.params.id; 

  Photo.findByIdAndRemove({_id: id}, function(error){
    if (error) res.send(error);
      res.redirect('/photos')
    }); 
 };
