// note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/infinity/:mobile', (req, res) => {
    db.collection('subs').findOne( {"mobile": req.params.mobile} , (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
    
  app.post('/infinity', (req, res) => {
    const subs = { eligibility: req.body.eligible, mobile: req.body.mobile };
    db.collection('subs').insert(subs, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/infinity/:mobile', (req, res) => {
    db.collection('subs').remove( {"mobile": req.params.mobile} , (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Subs ' + req.params.mobile + ' deleted!');
      } 
    });
  });

  app.put('/infinity/:mobile', (req, res) => {
    const subs = { eligibility: req.body.eligible, mobile: req.body.mobile };
    db.collection('subs').update( {"mobile": req.params.mobile} , subs, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(subs);
      } 
    });
  });
    
};