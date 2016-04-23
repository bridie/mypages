var Page = require('../models/page');
var Group = require('../models/group');

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

    // All pages when first created get added to the 'miscellaneous' group.
    Group.findOne({ name: 'miscellaneous'}, function(err, group) {
      if (err) {
        res.send(err);
      }

      if (group) {
          group.pages.push(page);
      } else {
        // Create the 'miscellaneous' group if it does not exist already.
        group = new Group({
          name: 'miscellaneous',
          pages: [page]
        });
      }

      group.save(function(err) {
        if (err) {
          res.send(err);
        }
      });

    });

    res.json({'message': 'Page added'});
  });

  router.get('/api/pages', function(req, res) {

    Page.find(function(err, pages) {

      if (err) {
        res.send(err);
      }

      res.json(pages);
    });

  });

  router.post('/api/groups', function(req, res) {

    var group = new Group({
      name: req.body.pageName,
      pages: []
    });

    group.save(function(err) {
      if (err) {
        res.send(err);
      }
    });

    res.json({'message': 'Group added'});

  });

  router.get('/api/groups', function(req, res) {

    Group.find(function(err, groups) {

      if (err) {
        res.send(err);
      }

      res.json(groups);
    });

  });

  return router;
}