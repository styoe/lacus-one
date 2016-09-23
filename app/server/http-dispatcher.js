/**
 * MAIN http dispatcher
 */
'use strict';

const   dispatcher = require('httpdispatcher'),
        fs = require('fs'),
        storage = require('electron-json-storage'),
        mime = require('mime');

let initialized = false;

const init = function() {

    if(initialized){ return false; }
    initialized = true;

    dispatcher.onPost('/add-guest', addGuest);
    dispatcher.onGet('/app', function(req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile(__dirname + '/../client/index.html', 'utf8', function(err, html){
            res.end(html);
        })
    });


    // RETURN CLIENT DIR ON /dist/ request
    dispatcher.beforeFilter(/\//, function(req, res, chain) {
        const file_url = __dirname + '/../client' + req.url,
            file_mime = mime.lookup(file_url);

        if(/\/dist\//.test(req.url)){

            res.writeHead(200, {'Content-Type': file_mime});

            if(file_mime==='image/jpeg' || file_mime==='image/png'){
                const img = fs.readFileSync(file_url);
                res.write(img, 'binary');
                res.end();
            }else{
                fs.readFile(file_url, 'utf8', function(err, file) {
                    res.end(file);
                });
            }

        }else{
            chain.next(req, res, chain);
        }

    });

};


const addGuest = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    const user = req.params;

    storage.has('directory-dialog', function(error, hasKey) {
        if (error) {
          throw error;
        }

        if (hasKey) {
          storage.get('directory-dialog', function(error, data) {
              if (error) {
                res.end(error);
                throw error;
              }

              fs.writeFile(data.path + '/test.txt',
                  JSON.stringify(user),
                  function(err) {
                      if (err) {
                        res.end(err);
                        throw err;
                      } else {
                        res.end('success');
                      }
                    });


            });
        } else {
          res.end('Please configure the saving directory on your desktop application.');
        }
      });

  };


module.exports = {
  init: init,
  isInitialized: function() {
        return initialized;
    },
  instance: dispatcher
};