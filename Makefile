init:
	npm ci

install:
	npm install
	cd my-task-manager-app && npm install

run:
	cd my-task-manager-app && npm start