var express = require('express');
var router = express.Router();
var Lion= require('../models/lions');

router.route('/lions')
    .post(function(req, res) {
        console.log('POST!!!');
        var lion = new Lion();     
        lion.name = req.body.name; 
        lion.age = req.body.age; 
        lion.pride = req.body.pride; 	
        lion.gender = req.body.gender;    
        lion.save(function(err, lion) { 
        	if (err) {
        		res.json(err);
        	} else {
        		res.json(lion); // if save works give me lion in json format
        	}
        });
    })

    .get(function(req, res) { // get bears from DB
    	console.log('GET!!!!');

    	Lion.find(function(err, lions) {
    	
    		if (err) {
    			res.json(err);
    		} else {
    			res.json(lions);
    		}
    	});
    });

    module.exports = router;

router.route('/lions/:lion_id')
    .put(function(req, res) {
        Lion.findById(req.params.lion_id, function(err, lion) {
        if (err) {
            res.json(err);
        } else {
        lion.name = req.body.name || lion.name; 
        lion.age = req.body.age || lion.age; 
        lion.pride = req.body.pride || lion.pride;    
        lion.gender = req.body.gender || lion.gender;    
        
            lion.save(function(err, lion) { 
                if (err){
                    console.log(err);
                } else {
                    res.json({lion});
                }
            });
            }
        });
    })

    .get(function(req, res) { // get bears from DB
        console.log('GET!!!!');

        Lion.findById(req.params.lion_id, function(err, lions) {
        
            if (err) {
                res.json(err);
            } else {
                res.json(lions);
            }
        });
    })

        .delete(function(req, res) { // get bears from DB
        console.log('DELETE!!!!');

        Lion.remove({_id: req.params.lion_id}, function(err, lions) {
            if (err) {
                res.json(err);
            } else {
                res.json('lion was removed');
            }
        });
    });

    module.exports = router;