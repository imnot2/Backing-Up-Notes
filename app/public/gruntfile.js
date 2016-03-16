'use strict';

module.exports = function(grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

	var config = {
		jsFiles: require('./moduleFiles').ymtappFiles,
		src: 'src',
		dist: 'dist'
	};

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		//项目配置文件
		config: config,

		watch: {
			css: {
				files: ['<%= config.src %>/sass/{,**/}/*.scss'],
				tasks: ['sass:dev', 'autoprefixer', 'copy']
			},
			script: {
				files: ['<%= config.src %>/js/{,**/,}*.js'],
				tasks: ['concat:dist', 'copy']
			},
			assets: {
				files: ['<%= config.src %>/images', '<%= config.src %>/fonts'],
				tasks: ['copy:dist']
			},
			livereload: {
				options: {
					livereload: 35729
				},
				files: [
					'../{,*/}*.html',
					'<%= config.src %>/sass/{,*/}/*.scss',
					'<%= config.src %>/js/{,*/}/*.js'
				]
			}
		},

		concat: {
			vendor: {
				src: [
					//'<%= config.src %>/js/vendor/zepto.min.js',
					'<%= config.src %>/js/vendor/jquery-1.8.2.min.js',
					'<%= config.src %>/js/vendor/angular.min.js',
					'<%= config.src %>/js/vendor/ng-infinite-scroll.min.js',
					'<%= config.src %>/js/vendor/angular-touch.min.js',
					'<%= config.src %>/js/vendor/swiper.min.js'
				],
				dest:'.tmp/js/lib/application.js'
			},
			dist: {
				src: '<%= config.jsFiles %>',
				dest: '.tmp/js/<%= pkg.name %>.js'
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.dist %>/js/{,*/}*.js',
				'!<%= config.dist %>/js/lib/*'
			]
		},
		sass: {
			options: {
				banner: '/*<%=pkg.name%> v<%=pkg.version%> by <%=pkg.author%> <%=grunt.template.today(\'yyyy-mm-dd\')%>*/',
				style: 'expanded',
				sourcemap: false
			},
			dev: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/sass',
					src: ['*.{scss,sass}', '!app.{scss,sass}','activitys/{,*/}*.{scss,sass}'],
					dest: '.tmp/css',
					ext: '.css'
				}, {
					src: '<%= config.src %>/sass/app.{scss,sass}',
					dest: '.tmp/css/<%= pkg.name %>.css'
				}]
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: [{
					expand: true,
					cwd: '<%= config.src %>/sass/',
					src: ['*.{scss,sass}', '!app.{scss,sass}','activitys/{*,**/}*.{scss,sass}'],
					dest: '.tmp/css',
					ext: '.css'
				}, {
					src: '<%= config.src %>/sass/app.{scss,sass}',
					dest: '.tmp/css/<%= pkg.name %>.css'
				}]
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/css/',
					src: '*.css',
					dest: '.tmp/css/'
				}]
			}
		},
		uglify: {
			dev: {

			},
			dist: {
				options: {
					banner: '/*\n* <%=pkg.name%> V <%=pkg.version%> \n* (c) http://www.ymatou.com \n* <%=grunt.template.today(\'yyyy-mm-dd\')%>\n*/\n',
					compress: {
						'drop_console': true
					}
				},
				files: [{
					expand: true,
					cwd: '.tmp/js',
					src: ['{,lib/}*.js'],
					dest: '.tmp/js'
				},{
					expand: true,
					cwd: 'src/js',
					src: ['*.js','!_main.js'],
					dest: 'dist/js'
				}]
			}
		},
		filerev: {
			options: {
				options: {
					algorithm: 'md5',
					length: 8
				}
			},
			dev:{

			},
			dist: {
				src: [
					//'dist/js/{,*/}*.js',
					//'dist/css/{,*/}*.css',
					'<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'!<%= config.dist %>/images/recommend*.png',
					'<%= config.dist %>/fonts/*'
				]
			}
		},
		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			//html: '../views/global/footer.html'
		},
		usemin: {
			options: {
				assetsDirs: [
					'<%= config.dist %>',
					'<%= config.dist %>/images/{*,**}/*',
					'<%= config.dist %>/fonts',
				]
			},
			//html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/css/{,*/}*.css']
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/images',
					src: '{*,**/}*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/images'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: 'views/{,*/}*.html',
					dest: '<%= config.dist %>/views'
				}]
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.src %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'images/{,**/}*.webp',
						'js/lib/{*,**/}*.js',
						'js/activitys/{,**/}*.js',
						'fonts/{,*/}*.*',
						'js/*.js'
					]
				}]
			},
			tmp: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.tmp',
					dest: '<%= config.dist %>',
					src: [
						'js/activitys/{,*/}*.js',
						'js/{,*/}*.js',
						'css/{,**/}*.css',
					]
				}]
			}
		},
		include:{
			dist:{
			    src:"src/views/{,*/}*.html",
			    dest:"../views"
		  	}
		}
	});
	grunt.loadNpmTasks('ymt-include');

	grunt.registerTask('develop', 'start the server and preview your app, --allow-remote for remote access', function(target) {
		var info = target ? '发布' : '开发',
			model = ':dev';
		if (target === 'dist') {
			model = ':dist';
		}
		grunt.task.run([
			'clean',
			'concat:dist',
			'sass' + model,
			'autoprefixer',
			'uglify' + model,
			'imagemin',
			'copy',
			//'jshint',
			'filerev'+model,
			'usemin'
		]);

		if (!target) {
			grunt.task.run(['watch']);
		}
		grunt.log.warn('当前为' + info + '模式！');
	});
};