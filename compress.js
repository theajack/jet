const gulp=require('gulp');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

gulp.src(["assets/css/icon.css","assets/css/style.css","assets/css/jui.css"])
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('jui.min.css'))
    .pipe(gulp.dest('compress'))
    .on('end',function(){
        gulp.src('compress/jui.min.css')
            .pipe(gulp.dest('template/jet-template/assets/css'))
    })

    
gulp.src("assets/js/jet.main.js")
    .pipe(uglify())
    .pipe(rename('jet.min.js'))
    .pipe(gulp.dest('compress'))
    .on('end',function(){
        gulp.src('compress/jet.min.js')
            .pipe(gulp.dest('template/jet-template/assets/js'))
    })

    
gulp.src("assets/js/jet-lib/*.js")
    .pipe(uglify())
    .pipe(gulp.dest('compress/jet-lib'))
    .on('end',function(){
        gulp.src('compress/jet-lib/*.js')
            .pipe(gulp.dest('template/jet-template/assets/js/jet-lib'))
    })
