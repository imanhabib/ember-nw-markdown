import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';

var run = Ember.run;

moduleForComponent('input-file-open', 'Unit - Input File Open Component', {
  integration: true
});

test("should open a file dialog when the 'File > Open' menu is selected", function(assert) {
  assert.expect(1);

  var component = this.subject();

  var clicked = false;
  component.on('click', function() {
    clicked = true;
  });

  this.render();

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileOpen');
  assert.ok(clicked, "click was triggered to open the file dialog");
});

test("should trigger the primary action when the input is changed", function(assert) {
  assert.expect(1);

  var component = this.subject();

  var isActionCalled = false;
  component.set('action', 'open');
  component.set('targetObject', {
    open: function() {
      isActionCalled = true;
    }
  });

  this.render();
  this.$().change();

  assert.ok(isActionCalled, "action was called");
});

test("should trigger the primary action when the 'File > New' menu is selected", function(assert) {
  assert.expect(1);

  var component = this.subject();

  var isActionCalled = false;
  component.set('action', 'open');
  component.set('targetObject', {
    open: function() {
      isActionCalled = true;
    }
  });

  var nw = component.get('nw');
  run(nw, 'trigger', 'fileNew');
  assert.ok(isActionCalled, "action was called");
});
