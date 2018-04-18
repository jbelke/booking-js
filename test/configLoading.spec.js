'use strict';

jasmine.getFixtures().fixturesPath = 'base/test/fixtures';

var mockAjax = require('./utils/mockAjax');
var createWidget = require('./utils/createWidget');

describe('Config loading', function() {

  beforeEach(function(){
    loadFixtures('main.html');
    jasmine.Ajax.install();
    mockAjax.all();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it('should be able to load remote config with slug', function(done) {

    var widget = new TimekitBooking();
    var config = {
      projectSlug: 'my-widget-slug'
    };
    widget.init(config);

    expect(widget).toBeDefined();

    setTimeout(function() {

      var request = jasmine.Ajax.requests.first();

      expect(request.url).toBe('https://api.timekit.io/v2/projects/hosted/my-widget-slug');
      expect(widget.getConfig().appKey).toBeDefined();
      expect($('.bookingjs-calendar')).toBeInDOM();
      done();

    }, 50)
  });

  it('should be able to load remote config with slug and set widget ID', function(done) {

    var widget = new TimekitBooking();
    var config = {
      projectSlug: 'my-widget-slug'
    };
    widget.init(config);

    expect(widget).toBeDefined();

    setTimeout(function() {

      var request = jasmine.Ajax.requests.first();

      expect(request.url).toBe('https://api.timekit.io/v2/projects/hosted/my-widget-slug');
      expect(widget.getConfig().projectId).toBeDefined();
      expect($('.bookingjs-calendar')).toBeInDOM();
      done();

    }, 50)
  });

  it('should be able to load remote config with id', function(done) {

    var widget = new TimekitBooking();
    var config = {
      appKey: '12345',
      projectId: '12345'
    };
    widget.init(config);

    expect(widget).toBeDefined();

    setTimeout(function() {

      var request = jasmine.Ajax.requests.first();

      expect(request.url).toBe('https://api.timekit.io/v2/projects/embed/12345');
      expect(widget.getConfig().slug).toBeDefined();
      expect($('.bookingjs-calendar')).toBeInDOM();
      done();

    }, 50)
  });

  it('should be able to load local config with widget ID set by disabling remote load', function(done) {

    var config = {
      projectId: '12345',
      disableRemoteLoad: true
    }
    var widget = createWidget(config);

    setTimeout(function() {

      var request = jasmine.Ajax.requests.first();

      expect(request.url).toBe('https://api.timekit.io/v2/availability');
      expect(widget.getConfig().projectId).toBe('12345');
      done();

    }, 50)
  });

});
