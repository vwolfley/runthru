module.exports = function(grunt){
    
    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                        '*@concat.min.css\n' +
                        '*@CSS Document for ..... Website @ MAG\n' +
                        '*@For Production\n' +
                        '*@<%= pkg.name %> - v<%= pkg.version %> | <%= grunt.template.today("mm-dd-yyyy") %>\n' +
                        '*@author <%= pkg.author %>\n' +
                    '*/\n',
        
    
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,                      // Force tags to have a closing pair
                    'tagname-lowercase': true,             // Force tags to be lowercase
                    'attr-lowercase': true,                // Force attribute names to be lowercase e.g. <div id="header"> is invalid
                    'attr-value-double-quotes': true,      // Force attributes to have double quotes rather than single
                    'doctype-first': true,                 // Force the DOCTYPE declaration to come first in the document
                    'spec-char-escape': true,              // Force special characters to be escaped
                    'id-unique': true,                     // Prevent using the same ID multiple times in a document
                    'head-script-disabled': true,       // Prevent script tags being loaded in the  for performance reasons
                    'style-disabled': true,             // Prevent style tags. CSS should be loaded through 
                    'curly': true                       // true: Require {} for every new block or scope
                    'strict': false,                    // true: Requires all functions run in ES5 Strict Mode ** Dojo style and existing codebase conflicts **
                },
                src: ['index.html']
            }
        },
        
        // CSSLint. Tests CSS code quality
        // https://github.com/gruntjs/grunt-contrib-csslint
        csslint: {
            // define the files to lint
            files: ["css/main.css"],
                strict: {
                    options: {
                        "import": 0,
                        "empty-rules": 0,
                        "display-property-grouping": 0,
                        "shorthand": 0,
                        "font-sizes": 0,
                        "zero-units": 0,
                        "important": 0,
                        "duplicate-properties": 0,
                    }
            }
        },
        
        jshint: {
                options: {
                    // strict: true,
                    sub: true,
                    quotmark: "double",
                    trailing: true,
                    curly: true,
                    eqeqeq: true,
                    unused: true,
                    scripturl: true,
                    // This option defines globals exposed by the Dojo Toolkit.
                    dojo: true,
                    // This option defines globals exposed by the jQuery JavaScript library.
                    jquery: true,
                    // Set force to true to report JSHint errors but not fail the task.
                    force: true,
                    reporter: require("jshint-stylish-ex")
                },
                files: {
                    src : ['src/**/*.js', 'test/**/*.js']
                }
        },
        
        uglify: {
            options: {
                // add banner to top of output file
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - main.js | <%= grunt.template.today("mm-dd-yyyy") %> */\n'
            },
            build: {
                files: {
                    "../deploy/build/js/main.min.js": ["js/mainmap.js"]
                }
            }
        },
        
        cssmin: {
            add_banner: {
                options: {
                // add banner to top of output file
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> | <%= grunt.template.today("mm-dd-yyyy") %> */'
                },
                files: {
                    "css/main.min.css": ["css/main.css"],
                    "css/normalize.min.css": ["css/normalize.css"]
                }
            }
        },
        
        concat: {
            options: {
              stripBanners: true,
              banner: '<%= banner %>'
            },
            target: {
              src: ["../build/css/normalize.min.css", "../build/css/main.min.css"],
              dest: 'css/concat.min.css'
            }
        },

        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },
            js: {
                files: ['assets/js/base.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }
        
    });

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint', 'less']);
    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint', 'less']);
    grunt.registerTask('bbuildcss', ['jshint', 'uglify', 'less']);
    grunt.registerTask('production', ['jshint', 'uglify', 'less']);

};

//ref
// http://coding.smashingmagazine.com/2013/10/29/get-up-running-grunt/
// http://csslint.net/about.html
// http://www.jshint.com/docs/options/
