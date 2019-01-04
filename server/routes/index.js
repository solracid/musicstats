//Export our App Routes
exports = module.exports = function (app) {
    // Set up the default route at 0.0.0.0:3000/index.html
    app.get('/index.html', function (req, res) {
        //Write some simple boilerplate html
        function renderFullPage() {
            // Note the div class name here, we will use that as a hook for our React code
            return `
            <!doctype html>
            <html>
                <head>
                    <title>Keystone With React And Redux</title>
                </head>
                <body>
                    <div class="react-container">
                    <h1> Hello World </h1>
                    </div>
                </body>
            </html>
            `;
        };
        // Send the html boilerplate
        res.send(renderFullPage());
      });
    };