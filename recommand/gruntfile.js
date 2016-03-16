/*
 * 1. 安装NodeJS
 * 2. npm install -g grunt-cli
 * 3. 进入项目根目录执行npm install命令安装依赖包(npm install grunt --save-dev / npm init)
 * 4. 运行grunt命令打包SDK
 */

'use strict';
module.exports = function(grunt) {
    var sources_gui = [
        'src/js/gui/intro.js',
        'src/js/gui/base.js',
        'src/js/gui/styleof.js',
        'src/js/gui/bindScope.js',
        'src/js/gui/promise.js',
        'src/js/gui/utils.js',
        'src/js/gui/utils-startdown.js',
        'src/js/gui/utils-wechat.js',
        'src/js/gui/outro.js'
    ];
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            CNDurl: "",
            src: {
                root: 'src/',
                sass: '<%= dirs.src.root %>sass',
                js: '<%= dirs.src.root %>/js',
                imgs: '<%= dirs.src.root %>images'
            },
            build: {
                root: 'build',
                css: '<%= dirs.build.root %>/css/',
                js: '<%= dirs.build.root %>/js',
                imgs: '<%= dirs.build.root %>/images/'
            }
        },

        compass: {
            sprite: {
                options: {
                    sassDir: '<%= dirs.src.sass %>',
                    specify: ['<%= dirs.src.sass %>/**/*.scss', '!<%= dirs.src.sass %>/pages/*.scss'],
                    cssDir: '<%= dirs.build.css %>',
                    imagesDir: "<%= dirs.build.imgs %>",
                    httpPath: "<%= dirs.CDNurl %>",
                    assetCacheBuster: false
                }
            }
        },
        clean: {
            build: ['<%= dirs.build.root %>']
        },

        imagemin: {
            build: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.imgs %>/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.build.imgs %>'
                }]
            }
        },
        cssmin: {
            dev: {},
            release: {
                expand: true,
                cwd: '<%= dirs.build.css %>',
                src: ['**/*.css', '!**/*-min.css'],
                dest: '<%= dirs.build.css %>',
                ext: '.css'
            }
        },
        copy: {
            imgs: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.imgs %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.build.imgs %>'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>',
                    src: ['lib/**/*.js', 'pages/**/*.js', '!gui/**/*.js'],
                    dest: '<%= dirs.build.js %>'
                }]
            },
            font: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.font %>',
                    src: ['*.{eot,svg,ttf,woff}'],
                    dest: '<%= dirs.build.font %>'
                }]
            }
        },
        concat: {
            options: {
                separator: ''
            },

            dev: {
                src: sources_gui,
                //src:'<%= dirs.src.js %>/gui/*.js',
                dest: '<%= dirs.build.js %>/gui.dev.js'
            }
        },
        //压缩js
        uglify: {
            lib: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>/lib',
                    src: '**/*.js',
                    dest: '<%= dirs.build.js %>/lib',
                    ext: '.js'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>/pages',
                    src: '**/*.js',
                    dest: '<%= dirs.build.js %>/pages'
                }]
            },
            gui: {
                files: {
                    '<%= dirs.build.js %>/gui.min.js': '<%= dirs.build.js %>/gui.dev.js'
                }
            }
        },
        replace: {
            dev: {
                src: [],
                overwrite: true,
                replacements: []
            },
            release: {
                src: ['<%= dirs.build.css %>/page/*.css', '!<%= dirs.build.css %>/page/*.min.css'],
                overwrite: true,
                replacements: [{
                    from: /url\((\'|\"|\s?)\/(build|src)?/ig,
                    to: 'url($1/'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['<%= dirs.src.sass %>/**/*.sass', '<%= dirs.src.sass %>/**/*.scss'],
                tasks: ['compass']
            },
            imgs: {
                files: ['<%= dirs.src.imgs %>/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            js: {
                files: ['<%= dirs.src.js %>/**/*.js'],
                tasks: ['copy:js']
            }
        }

    });
    /**
     * 载入使用到的通过NPM安装的模块
     */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('ymt', 'start the server and preview your project', function(target) {
        var isRelease = !!target,
            info = isRelease ? '发布' : '开发',
            module = isRelease ? 'release' : 'dev',
            taskArr = [];

        taskArr.push('clean');
        taskArr.push('compass');
        if (isRelease) {
            taskArr.push('imagemin');
            taskArr.push('cssmin');
        }
        if (!isRelease) {
            taskArr.push('copy');            
        }
        taskArr.push('concat');
        if (isRelease) {
            taskArr.push('uglify');
            taskArr.push('replace');
        }
        if (!isRelease) {
            taskArr.push('watch');
        }
        grunt.task.run(taskArr);
        grunt.log.warn('当前为' + info + '模式！');
    });
}