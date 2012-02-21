$(function() {
	var app = window.app || {
		Router: {},
		Collections: {},
		Models: {},
		Views: {},
		router: {},
		collections: {},
		models: {},
		views: {}
	};
	window.app = app;

	app.Router = Backbone.Router.extend({
		routes: {
			'*path': 'home'
		},

		home: function() {
			this.views = {}
			this.views.picker = new app.Views.Picker({
				model: app.models.CSS3
			});
			$('#picker-wrap').empty().append(this.views.picker.render().el);

			this.views.viewer = new app.Views.Viewer({
				model: app.models.CSS3
			});
			$('#viewer-wrap').empty().append(this.views.viewer.render().el);
		}
	});

	app.Models.CSS3 = Backbone.Model.extend({
		defaults: {
			'borderRadius': 0
		}
	});

	app.models.CSS3 = new app.Models.CSS3();

	app.Views.Picker = Backbone.View.extend({
		events: {
			'change .border-radius': 'changeBorderRadius'
		},

		initialize: function() {
			var templateSrc;
			_.bindAll(this, 'render');
			// this.model.bind('change', this.render);
			templateSrc = $('#picker-template').html();
			this.template = Handlebars.compile(templateSrc);
		},

		render: function() {
			console.log('m', this.model.toJSON());
			$(this.el).html(this.template(
				this.model.toJSON()
			));
			return this;
		},

		changeBorderRadius: function(e) {
			var $e, value;
			e.preventDefault();
			$e = $(e.currentTarget);
			value = $e.val();
			this.model.set({
				borderRadius: value
			});
			console.log('br', this.model.get('borderRadius'));
			this.$('em span').text(value);
			// $('#viewer').css('-webkit-border-radius', value+'px');
		}
	});

	app.Views.Viewer = Backbone.View.extend({
		id: 'viewer',

		initialize: function() {
			var templateSrc;
			_.bindAll(this, 'render');
			this.model.bind('change', this.render);
			templateSrc = $('#viewer-template').html();
			this.template = Handlebars.compile(templateSrc);
		},

		render: function() {
			$(this.el).html(this.template(
				this.model.toJSON()
			));
			return this;
		}
	});

	app.router = new app.Router();
	Backbone.history.start({ pushState: true });
});