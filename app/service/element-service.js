'use strict';

module.exports = [
  '$q',
  '$log',
  '$http',
  '$window',
  'Upload',
  'authService',
  function($q, $log, $http, $window, Upload, authService) {
    $log.debug('Element Service');

    let service = {};


    service.uploadElement = function(song, element) {
      $log.debug('#elemService.uploadElem');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/element`;
        let headers = {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        };

        return Upload.upload({
          url,
          headers,
          method: 'POST',
          data: {
            name: element.name,
            desc: element.desc,
            file: element.file,
          },
        });
      })
      .then(
        res => {
          song.elements.push(res.data);
          return res.data;
        },
        err => {
          $log.error(err.message);
          $q.reject(err);
        }
      );
    };

    service.deleteElement = (song, element) => {
      $log.debug('#elemService.deleteElem');

      return authService.getToken()
      .then(token => {
        let url = `${__API_URL__}/api/song/${song._id}/elem/${element._id}`;
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json, text/plain, */*',
          },
        };
        return $http.delete(url, config);
      })
      .then(
        () => {
          $log.log('deleted the element');

          for(let i = 0; i < song.elements.length; i++) {
            if(song.elements[i]._id === element._id) {
              song.elements.splice(i, 1);
              break;
            }
          }
        },
        err => {
          $log.error(err.message);
          return $q.reject(err);
        }
      );
    };

    return service;
  },
];
