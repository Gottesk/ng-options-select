module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "jade": {
            dev: {
                options: {
                    pretty: false
                },
                files: {
                    'temp/template.html': 'src/template.jade'
                }
            }
        },
        "stylus": {
            compile: {
                options: {},
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.styl'],
                        dest: 'dist',
                        ext: ['.css']
                    }
                ]
            }
        },
        "string-replace": {
            dist: {
                files: {
                    'dist/angular-options-select.js': 'src/angular-options-select.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: "{html}",
                            replacement_old: "<h1>i am the replacement!</h1>",
                            replacement: function(match, p1, offset, string) {
                                return grunt.file.read('temp/template.html');
                            }
                        }
                    ]
                }
            }
        }
    });

    var filepath = 'dist/angular-options-select.js';
    if ( !grunt.file.exists(filepath) ) {
        grunt.fail.warn('File ' + filepath + ' doesn\'t exist.');
    } else {
        grunt.log.write('File ' + filepath + ' exist!');
    }

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-string-replace');

    return grunt.registerTask('default', ['jade', 'stylus', 'string-replace']);
};
