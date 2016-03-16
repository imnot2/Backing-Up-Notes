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
                root: 'source',
                sass: '<%= dirs.src.root %>/css',
                js: '<%= dirs.src.root %>/js',
                imgs: '<%= dirs.src.root %>/imgs'
            },
            build: {
                root: '',
                css: 'css',
                imgs: 'img',
                js: 'Scripts'
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
        copy: {
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.js %>',
                    src: ['**/*.js','!core/**/*.js'],
                    dest: '<%= dirs.build.js %>'
                }]
            }
        },
        // cssmin: {
        //     //合并css
        //     // combine: {
        //     //     src: '<%= dirs.src.css %>*.css',
        //     //     dest: '<%= dirs.build.css %>app.css'
        //     // },
        //     //压缩css
        //     build: {
        //         expand: true,
        //         cwd: '<%= dirs.build.css %>',
        //         src: ['**/*.css', '!**/*-min.css'],
        //         dest: '<%= dirs.dest.css %>',
        //         ext: '.css'
        //     }
        // },
        concat: {
            options: {
                //separator: ';',
                stripBanners: true
            },
            //合并js
            combine: {
                files: {
                    '<%= dirs.build.js %>/ymt.js': ['<%= dirs.src.js %>/core/*.js']
                }
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
            js: {
                files: ['<%= dirs.src.js %>/**/*.js'],
                tasks: ['concat','copy:js']
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');



    grunt.registerTask('default', [
        'imagemin:build',
        'compass',
        'concat:combine',
        'copy:js'
    ]);
}