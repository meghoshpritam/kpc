const themeDir = __dirname + '/../../';

const purgecss = require('@fullhuman/postcss-purgecss')({
    // see https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss
    content: [
        themeDir + '/layouts/**/*.html',
        'content/*.md',
        themeDir + '/assets/js/app.js'
    ],
    defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
})

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [themeDir]
        }),
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('postcss-preset-env')({
            stage: 3,
            autoprefixer: { flexbox: true }
        }),
        require('autoprefixer')({
            path: [themeDir]
        }),
        ...(process.env.HUGO_ENVIRONMENT === 'production' ? [
            require('cssnano')({
                preset: 'default',
            }),
            purgecss,
        ] : [])
    ]
}
