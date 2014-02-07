"use strict";

var FWK = [
        {
            "id":'1',
            "name":'AngularJS',
            "comment":'Des applications Web Monopage',
            "url":'http://angularjs.org/',
            "type":'Client'
        },
        {
            "id":'2',
            "name":'NodeJS',
            "comment":'Des applications ultra rapides',
            "url":'http://nodejs.org/',
            "type":'Serveur'
        },
        {
            "id":'3',
            "name":'JSPdf',
            "comment":'Des états PDF côté Client',
            "url":'http://parall.ax/products/jspdf',
            "type":'Client'
        },
        {
            "id":'4',
            "name":'JQuery',
            "comment":'Write less do more',
            "url":'http://jquery.com/',
            "type":'Client'
        }
];

/**
 * Fetch all frameworks
 * If category query is provided, fetch frameworks filtered by category
 * @param req
 * @param res
 * @returns {*}
 */
exports.fetchFwks = function (req, res) {
    var fwks = [];
    if(req.query.category){
        fwks = FWK.filter(function(fwk){
            return fwk.category === req.query.category;
        });
    } else {
        fwks = FWK;
    }
    return res.json(200, fwks);

};
/**
 * Fetch a framework by id
 * @param req
 * @param res
 * @returns {*}
 */
exports.fetchFwk = function (req, res){
    var id = req.params.id;

    for(var i = 0; i < FWK.length; i++){
        if(FWK[i].id == id){
            return res.json(200, FWK[i]);
        }
    }

    return res.json(404);
};

/**
 * Create a framework
 * @param req
 * @param res
 * @returns {*}
 */
exports.addFwk = function (req, res) {
    var lastId = 0;

    for(var i=0;i<FWK.length;i++){
        if(FWK[i].id > lastId){
            lastId = FWK[i].id;
        }
    }

    var nextId = parseInt(lastId)+1;


    var framework = req.body;

    for(var idx in FWK){
        if(FWK[idx].name === framework.name){
            return res.json(500, { error: 'Le framework ' + movie.name + ' a déjà été ajouté.' });
        }
    }

    // increment the id to generate a unique one
    framework.id = nextId;

    FWK.push(framework);
    return res.json(201, framework);

};

/**
 * Delete a framework
 * @param req
 * @param res
 * @returns {*}
 */
exports.deleteFwk = function (req, res) {
    var id = req.params.id;

    for(var i = 0; i < FWK.length; i++){
        if(FWK[i].id == id){
            FWK.splice(i, 1);
            return res.json(200);
        }
    }

    return res.json(304);
};

/**
 * Update a framework
 * @param req
 * @param res
 * @returns {*}
 */
exports.updateFwk = function(req, res) {
    var framework = req.body;
    var id = framework.id;

    for(var i = 0; i < FWK.length; i++){
        if(FWK[i].id === id){
            FWK.splice(i, 1);
            FWK.push(framework);
            return res.json(200);
        }
    }

    return res.json(304);
};
