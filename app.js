var colors = require('colors');
var localData = require('./data/local');
var schemas = require('./lib/schemas.js');

var site = require('apostrophe-site')();

site.init({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'samantha-combs',
  hostName: 'samantha combs',
  title: 'Samantha Combs',
  sessionSecret: localData.sessionSecret || 'samantha combs demo',
  adminPassword: localData.adminPassword || 'demo',

  locals:  require('./lib/locals.js'),

  mailer: {
    transportOptions:{
      service: "Postmark",
      auth: {
        user: localData.postmark || '',
        pass: localData.postmark || ''
      }
    },
    transport: 'SMTP'
  },

  pages: {
    types: [
      { name: 'default', label: 'Default Page' },
      { name: 'home', label: 'Home Page' }
    ]
  },

  lockups: {
    left: {
      label: 'Left',
      tooltip: 'Inset Left',
      icon: 'icon-arrow-left',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      }
    },
    right: {
      label: 'Right',
      tooltip: 'Inset Right',
      icon: 'icon-arrow-right',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      }
    }
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Styles required by the new editor, must go FIRST
    'apostrophe-editor-2': {},
    'apostrophe-ui-2': {},
    'apostrophe-browserify': {
      files: ["./public/js/modules/_site.js"]
    },
    'apostrophe-snippets': {},
    'apostrophe-forms': {
      email: {
        from: "Spacely Co <team@spacely.space>"
      },
      removeControls: ['sectionBreak', 'integerField', 'dateField', 'timeField']
    },
    'apostrophe-schema-widgets': {
      widgets: [
        {
          name: 'clientWidget',
          label: 'Clients',
          instructions: 'Add client snippets',
          schema: schemas.clientWidget || []
        },
        {
          name: 'resume',
          label: 'Resume',
          schema: schemas.resume || [],
        }
      ]
    },
    'clients': {
      extend: 'apostrophe-snippets',
      name: 'clients',
      label: 'Clients',
      instance: 'client',
      instanceLabel: 'Client',
      menuName: 'aposClientMenu',
      addFields: schemas.clientSnippet || []
    }
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    stylesheets: ['site'],
    scripts: ['_site-compiled']
  },

  afterInit: function(callback) {
    if(localData.development || !localData.minify) {
      console.log();
      console.log('*****************************************'.rainbow);
      console.log('       Running in DEVELOPMENT mode.      ');
      console.log('       Samantha Combs, Boss, Etc ©       '.blue);
      console.log('*****************************************'.rainbow);
      console.log();
    } else if(process.argv.length <= 2){
      console.log();
      console.log('*****************************************'.rainbow);
      console.log('       Running in PRODUCTION mode.       ');
      console.log('*****************************************'.rainbow);
      console.log();
    }

    if(!localData.postmark){
      console.log("MISSING POSTMARK CREDENTIALS!".yellow);
      console.log();
    }

    callback(null);
  }

});
