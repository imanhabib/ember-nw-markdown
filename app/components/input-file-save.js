import Ember from 'ember';
import MenuEventHandler from '../mixins/menu-event-handler';

var run = Ember.run;

export default Ember.Component.extend(MenuEventHandler, {
  tagName: 'input',
  classNames: ['nw-input-file'],
  attributeBindings: ['type', 'nwsaveas'],

  type: 'file',
  nwsaveas: 'untitled.md',

  change: function() {
    var filePath = this.$().val();
    this.sendAction('action', filePath);
    this.$().val('');
  },

  openFileDialog: function() {
    run.scheduleOnce('afterRender', this, function() {
      this.$().click();
    });
  },

  menuEvents: {
    fileSave: function() {
      if (this.get('file.isNew')) {
        this.openFileDialog();
      }
    }
  }
});
