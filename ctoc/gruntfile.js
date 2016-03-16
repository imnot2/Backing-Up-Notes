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
                root: 'src',
                sass: '<%= dirs.src.root %>/sass',
                js: '<%= dirs.src.root %>/js',
                imgs: '<%= dirs.src.root %>/images',
                font: '<%= dirs.src.root %>/fonts'
            },
            build: {
                root: 'build',
                css: '<%= dirs.build.root %>/css',
                imgs: '<%= dirs.build.root %>/images',
                js: '<%= dirs.build.root %>/js',
                font: '<%= dirs.build.root %>/fonts'
            },
            dest: {
                root: 'dist',
                css: '<%= dirs.dest.root %>/css',
                imgs: '<%= dirs.dest.root %>/images',
                js: '<%= dirs.dest.root %>/js',
                font: '<%= dirs.dest.root %>/fonts'
            }
        },

        compass: {
            app: {
                options: {
                    sassDir: '<%= dirs.src.sass %>',
                    specify: ['<%= dirs.src.sass %>/lib/app.scss'],
                    cssDir: '<%= dirs.build.css %>',
                    imagesDir: "<%= dirs.src.imgs %>",
                    httpPath: "<%= dirs.CDNurl %>",
                    assetCacheBuster: false
                }
            },
            sprite: {
                options: {
                    sassDir: '<%= dirs.src.sass %>',
                    specify: ['<%= dirs.src.sass %>/page/*.scss'],
                    cssDir: '<%= dirs.build.css %>',
                    imagesDir: "<%= dirs.src.imgs %>",
                    httpPath: "<%= dirs.CDNurl %>",
                    assetCacheBuster: false
                }
            }
        },
        imagemin: {
            build: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.imgs %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= dirs.build.imgs %>'
                }]
            }
        },
        clean: {
            build: ['<%= dirs.build.root %>', '<%= dirs.dest.root %>']
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
                    src: ['lib/**/*.js', 'module/**/*.js', 'page/**/*.js'],
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
            },
            data : {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.src.root %>',
                    src: ['data/**/*.js'],
                    dest: '<%= dirs.build.js %>'
                }]
            }
        },

        cssmin: {
            //合并css
            // combine: {
            //     src: '<%= dirs.src.css %>*.css',
            //     dest: '<%= dirs.build.css %>app.css'
            // },
            //压缩css
            build: {
                expand: true,
                cwd: '<%= dirs.build.css %>',
                src: ['**/*.css', '!**/*-min.css'],
                dest: '<%= dirs.dest.css %>',
                ext: '.css'
            }
        },

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


        //压缩js
        uglify: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= dirs.build.js %>',
                    src: '**/*.js',
                    dest: '<%= dirs.dest.js %>'
                }]
            }
        },
        replace: {
            //给背景图添加版本号
            build: {
                src: ['<%= dirs.dest.css %>/page/*.css'],
                overwrite: true,
                replacements: [{
                    from: /(url\((\'|\"|\s?)[^\'\"\)]+)/ig,
                    to: '$1?v=' + new Date().getTime()
                }]
            },
            path: {
                src: ['<%= dirs.build.css %>/page/*.css', '<%= dirs.build.css %>/lib/*.css'],
                overwrite: true,
                replacements: [{
                    from: /url\((\'|\"|\s?)\/src/ig,
                    to: 'url($1'
                }]
            },
            path1: {
                src: ['<%= dirs.dest.css %>/page/*.css', '<%= dirs.dest.css %>/lib/*.css'],
                overwrite: true,
                replacements: [{
                    from: /url\((\'|\"|\s?)\/(build|src)?/ig,
                    to: 'url(/'
                }]
            },
            apicdn: {
                src: ['<%= dirs.dest.js %>/module/config/apiCDN.js'],
                overwrite: true,
                replacements: [{
                    from: /(exports=\w+\.)dev/ig,
                    to: '$1dest'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ['<%= dirs.src.sass %>/**/*.sass', '<%= dirs.src.sass %>/**/*.scss'],
                tasks: ['compass', 'replace:path']
            },
            js: {
                files: ['<%= dirs.src.js %>/core/*.js'],
                tasks: ['concat']
            },
            copyjs: {
                files: ['<%= dirs.src.js %>/lib/**/*.js', '<%= dirs.src.js %>/module/**/*.js', '<%= dirs.src.js %>/page/**/*.js'],
                tasks: ['copy:js']
            },
            copydata:{
                files: ['<%= dirs.src.root %>/data/**/*.js'],
                tasks: ['copy:data']
            }
        }

    });
    /**
     * 载入使用到的通过NPM安装的模块
     */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', [
        //'clean',
        'compass',
        'imagemin',
        'concat:combine',
        'copy:font',
        'copy:js',
        'cssmin:build',
        'copy:imgs',
        'copy:data',
        'uglify',
        'replace'
    ]);
}