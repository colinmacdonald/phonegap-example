/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* jshint browser:true*/
/* global goinstant, $, _ */

'use strict';

var CONNECT_URL = 'https://goinstant.net/cmac/phonegap';

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.connect();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    connect: function() {
      goinstant.connect(CONNECT_URL, function(err, conn, room) {
        if (err) {
          throw err;
        }

        var key = room.key('phonegap');

        var $input = $('.text');
        var $button = $('.submit');
        var $list = $('.list');

        key.get(function(err, val, con) {
          if (err) {
            throw err;
          }

          _.each(val, function(item) {
            var $li = $('<li></li>');

            $li.text(item);
            $list.append($li);
          });
        });

        $button.on('click', function(e) {
          key.add($input.val());
        });

        key.on('add', { local: true }, function(val, con) {
          var $li = $('<li></li>');

          $li.text(val);
          $list.append($li);
        });
      });
    }
};

$(document).ready(function() {
  app.initialize();
});
