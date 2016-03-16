/*
 * 1. 安装NodeJS
 * 2. npm install -g grunt-cli
 * 3. 进入项目根目录执行npm install命令安装依赖包(npm install grunt --save-dev / npm init)
 * 4. 运行grunt命令打包SDK
 */

'use strict';
module.exports = function(grunt) {
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
                    specify: ['<%= dirs.src.sass %>/**/*.scss', '<%= dirs.src.sass %>/**/*.sass'],
                    cssDir: '<%= dirs.build.css %>',
                    imagesDir: "<%= dirs.build.imgs %>",
                    httpPath: "<%= dirs.CDNurl %>",
                    assetCacheBuster: false
                }
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.imgs %>/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.build.imgs %>'
                }]
            }
        },
        clean: {
            build: ['<%= dirs.build.root %>']
        },


        cssmin: {
            build: {
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
                    cwd: '<%= dirs.build.imgs %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.dest.imgs %>'
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>',
                    src: ['lib/**/*.js', 'pages/**/*.js', 'module/**/*.js'],
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
        //压缩js
        uglify: {
            lib: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>/lib',
                    src: '**/*.js',
                    dest: '<%= dirs.build.js %>/lib',
                    ext: '.min.js'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>/pages',
                    src: '**/*.js',
                    dest: '<%= dirs.build.js %>/pages'
                }]
            }
        },
        replace: {
            path: {
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
                tasks: ['compass', 'cssmin']
            },
            imgs: {
                files: ['<%= dirs.src.imgs %>/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            js: {
                files: ['<%= dirs.src.js %>/**/*.js'],
                tasks: ['uglify','copy:js']
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('default', [
        'clean',
        'compass',
        'imagemin',
        'cssmin:build',
        'copy:js',
        'uglify:lib',
        'replace'
    ]);
}