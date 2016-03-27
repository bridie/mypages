var Page = require('../models/page');

module.exports = function(router) {

  router.post('/api/pages', function(req, res) {

    var page = new Page({
      name: req.body.pageName,
      url: req.body.pageUrl
    });

    page.save(function(err) {
      if (err) {
        res.send(err);
      }
    });

    res.json({'message': 'Page added'});

  });

  return router;
}