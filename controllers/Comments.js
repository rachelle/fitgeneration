var express = require('express');
var mongoose = require('mongoose'); 

/* source in required models */
var User = require('../models/User');
var Photo = require('../models/Photo'); 
var Comment = require('../models/Comment');  




router.post('/photos/:photo_id/comments', function(request, response, next){
    Photo.findOne({_id: request.params.photo_id}, function(error, photo){
        if(error) return response.send(error);
        photo.comments.push({
            content: request.body.content, 
            user: request.body.user
       });
       photo.save(function(error){
            if(error) return response.send(error);
            response.send({
                success: true
            });
       });
    });
});

router.get('/photos/:photo_id/comments', function(request, response, next){
    Photo.findOne({_id: request.params.photo_id}, function(error, photo){
        if(error) return response.send(error);
        response.send(photo.comments);
    });
});


