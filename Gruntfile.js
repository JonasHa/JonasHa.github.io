module.exports = function(grunt) {
    grunt.initConfig({
    	minify: 1,
        less: {
            options: {
                plugins: [
                    new(require('less-plugin-clean-css'))({
                        advanced: false,
                        roundingPrecision: -1
                    })
                ]
            },
            base: {
                files: [{
                    src: "./assets/less/base.less",
                    dest: "./assets/css/base.css"
                }]
            },
        },
        requirejs: {
        	base: {
        		options: {
		            out: './assets/js/base.min.js',
		            optimize: '<%= Boolean(parseInt(minify), 10) ? "uglify2" : "none" %>',
		            name: './assets/js/base',
		            uglify2: {
		                compress: {
		                    drop_console: false
		                }
		            },
                    wrapShim: false,
                    findNestedDependencies: true,
                    excludeShallow: [],
                    exclude: [],
		            waitSeconds: 30,
		            include: [
                        'jquery',
		                'angular',
		                'requireLib',
		            ],
		            paths: {
		                'jquery': './node_modules/jquery/dist/jquery',
                        'requireLib': './node_modules/requirejs/require',
		                'angular': './node_modules/angular/angular.min',
		                'components': './assets/js/components'
		            },
		            shim: {
                        'angular': {
                            exports: 'angular'
                        }
		            }        		        			
        		}
        	}
        }
    })

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-html2js');
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.loadNpmTasks('grunt-contrib-clean');


grunt.registerTask('build', ['requirejs:base', 'less:base']);
grunt.registerTask("build:dev", ["set_config:minify:0", "build"]);


};
