define([
    'backbone',
    'marionette',
    'underscore',
    'hbs!main/components/navSearch/navTemplate',
    'api/UserService',
    'api/Messaging'
], function(Backbone, Marionette, _, navTemplate, UserService, Messaging) {
    'use strict';
    return Backbone.Marionette.ItemView.extend({
        model: UserService.getUserSession(),
        template: navTemplate,
        className: 'col-md-12 appNav',
        events: {
            'click #logoutButton': 'logout'
        },
        logout: function() {
            Messaging.trigger('app:logout');
        },

    });
});