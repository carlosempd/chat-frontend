# ChatFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.

Aplicación simple de Chat con angular y sockets.
Cuenta con tres pantallas, la primera de registro, en la que se debe ingresar el nombre de  usuario y el nombre de la sala de chata a la que desea ingresar. Luego la pantalla de chat en la que podra enviar y recibir mensajes con las personas conectadas en la misma sala y finalmente una vista para ver el historial de mensajes del chat.

Tanto en la pantalla de chat como la de historial, en la parte superior derecha tiene un menú a través del cual pordrá salir del chat y otras opciones dependiendo del la vista actual en la que se encuentre.

La vista de historial se implemento para realizar peticiones al backend, consultar la data a la DB y visualizar los datos en una lista sencilla.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
