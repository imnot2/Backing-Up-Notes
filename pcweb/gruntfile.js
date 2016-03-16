/*
 * 1. 安装NodeJS
 * 2. npm install -g grunt-cli
 * 3. 进入项目根目录执行npm install命令安装依赖包(npm install grunt --save-dev / npm init)
 * 4. 运行grunt命令打包SDK
 */

'use strict';
module.exports = function (grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            CNDurl: "",
            src: {
                root: 'source',
                sass: '<%= dirs.src.root %>/sass',
                js: '<%= dirs.src.root %>/js',
                imgs: '<%= dirs.src.root %>/images'
            },
            build: {
                css: 'Content',
                imgs: 'images',
                js: 'Scripts'
            },
            newbuild: {
                root: 'build',
                css: '<%= dirs.newbuild.root %>/css',
                imgs: '<%= dirs.newbuild.root %>/images',
                js: '<%= dirs.newbuild.root %>/js'
            },
            dest: {
                css: 'css',
                imgs: 'images',
                js: 'js'
            }
        },

        compass: {
            app: {
                options: {
                    sassDir: '<%= dirs.src.sass %>',
                    specify: ['<%= dirs.src.sass %>/assets/*.scss'],
                    cssDir: '<%= dirs.build.css %>',
                    imagesDir: '<%= dirs.src.imgs %>',
                    httpPath: '<%= dirs.CDNurl %>',
                    assetCacheBuster: false
                }
            },
            partial: {
                options: {
                    sassDir: '<%= dirs.src.sass %>/partial',
                    cssDir: '<%= dirs.build.css %>',
                    imagesDir: '<%= dirs.src.imgs %>',
                    httpPath: '<%= dirs.CDNurl %>',
                    assetCacheBuster: false
                }
            },
            styles: {
                options: {
                    sassDir: '<%= dirs.src.sass %>/styles',
                    cssDir: '<%= dirs.build.css %>',
                    imagesDir: '<%= dirs.src.imgs %>',
                    httpPath: '<%= dirs.CDNurl %>',
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
        transport: {
            options: {
                idleading: 'js/',
                paths: ['.'],
                debug: false
            },
            cmd: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>',
                    src: ['**/*.js', '!core/*.js', '!newcore/*.js'],
                    dest: '<%= dirs.newbuild.js %>'
                }]
            }
        },

        concat: {
            core: {
                options: {
                    noncmd: true
                },
                files: [{
                    src: '<%= dirs.src.js %>' + "/core/*.js",
                    dest: '<%= dirs.build.js %>/ymt.js'
                }, {
                    src: '<%= dirs.src.js %>' + "/newcore/*.js",
                    dest: '<%= dirs.dest.js %>/ymt.js'
                }]
            },
            cmd: {
                options: {
                    include: "relative"
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.newbuild.js %>',
                    src: ['**/*.js', '!ymt.js'],
                    dest: '<%= dirs.dest.js %>'
                }]
            }
        },

        clean: {
            build: ['<%= dirs.newbuild.root %>', '<%= dirs.dest.css %>', '<%= dirs.dest.js %>']
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['<%= dirs.src.sass %>/**/*.scss'],
                tasks: ['compass']
            },
            js: {
                files: ['<%= dirs.src.js %>/**/*.js'],
                tasks: ['concat']
            },
            imgs: {
                files: ['<%= dirs.src.imgs %>/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        }

    });
    /**
     * 载入使用到的通过NPM安装的模块
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');



    grunt.registerTask('default', [
        'clean',
        'imagemin:build',
        'transport',
        'concat',
        'compass'
    ]);
}