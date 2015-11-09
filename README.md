# Simple Angular Boilerplate
This is a simple boilerplate architecture for frontend angular projects. For complete documentation, see the [Wiki](https://github.com/genu/simple-angular-boilerplate/wiki) page.

See [Roadmap](https://github.com/genu/simple-angular-boilerplate/wiki/Roadmap) for planned future developments.

### Philosophy
Modular architecture for building angular applications with an emphasis on minimal dependencies, lightweight core, and agnostic toward third party services.

## Prerequisites
[grunt](https://github.com/gruntjs/grunt) and [bower](https://github.com/bower/bower) should already be installed
## Quick Start
* `git clone https://github.com/genu/simple-frontend-boilerplate`
* `cd simple-frontend-boilerplate`
* `npm install`
* `grunt server`

## What's in the box
The basic bower components that are included with the projects are listed here. The only reason that these are include is to demonstrate the idea behind the architecture; they can be removed or replaced as needed.
* angular#1.4.1
* angular-ui-router
* angular-bootstrap
* font-awesome
* bootstrap#3.3.4

## Application architecture
```
src/
├── js/
│   ├── app.js (Most of the application entry point code would go here)
│   ├── environment.js (Generated automatically by grunt based on project configuration)
├── modules/
│   ├── core/
│   │   ├── config/
│   │   │   ├── core.config.js (Entry point for the module)
│   │   │   ├── core.routes.js (Routes for this module)
│   │   ├── controllers/ (controller for each route)
│   │   │   ├── about.ctrl.js
│   │   │   ├── architecture.ctrl.js
│   │   │   ├── home.ctrl.js
│   │   │   ├── layout.ctrl.js
│   │   │   ├── main.ctrl.js
│   │   ├── views/ (templates)
│   │   │   ├── about.html
│   │   │   ├── app.html
│   │   │   ├── architecture.html
│   │   │   ├── home.html
│   ├── app.core.js (Main module definition)
```
## Extending
The best way to extend an application is to add modules to the `modules/` directory as needed by your application. The `core` module should act as a global module, therefore, application wide functionality should be added to the `core` module.

## Contributing
I accept pull requests for fixes and/or new features. For small hotfixes, I will merge code, however, for everything else, please make sure to open up an issue first.

### Steps
1. Create a module similar to the `core` module in the `modules/` directory
2. Add the new module as a dependency to the application in `src/js/app.js`
2. Relaunch the server with `grunt server`

## License
Licensed under the MIT License
