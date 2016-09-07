.PHONY: all
all:
	@PATH="./node_modules/.bin:$$PATH"; \
	(make css & make js & make server & wait)

.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/app.css --output bundle/app.css

#.PHONY: js
# js:
# 	mkdir -p build
# 	watchify --debug -t babelify js/app.jsx -o build/app.js

.PHONY: js
js:
	mkdir -p build
	webpack -d --watch --progress js/app.jsx build/app.js --module-bind "js=babel" --module-bind "jsx=babel"

.PHONY: minjs
minjs:
	mkdir -p bundle
	webpack -p --progress js/app.js bundle/app.js --module-bind "js=babel"

.PHONY: server
server:
	browser-sync start --server --files='index.html,bundle/app.css,build/app.js'


.PHONY: clean
clean:
	rm -r bundle build