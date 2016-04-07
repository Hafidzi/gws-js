# Genero Web Client - JavaScript theme (GWC-JS) project

## Requirements

### proxies and firewall limitations

To avoid network problems with git:// protocol, you can add these lines to your `~/.gitconfig` :

    [url "https://github"]
      insteadOf = git://github

### System tools

To develop and compile GWC-JS, you will need some tools installed in your system:

* [node.js](http://nodejs.org/)
* [git](http://git-scm.com/)

### Development tools

*Once these tools are available, we consider that all following commands are executed from the root working directory (repository clone root, which contains **Gruntfile.js**)*

To start up a first time your npm cache, just run

    npm install

Now depending on your privileges on your machine,

* if you can have privileged access on your working machine, you can install these tools:

        sudo npm install -g grunt-cli
        sudo npm install -g bower
        sudo npm install -g phonegap # only if you want to create phonegap packages

To finalize the dependencies, run

    grunt deps

## Getting started

### First run

To build the project with default compilation options, just run

    grunt

Now you can see in `dist` folder that a `web` folder contains the compiled version of gbc.

### Gas hosting and live development

Now that your `dist/web` folder is created, you can use it directly in your local gas server,
by creating a link to this folder in your `<gas_install>/web` folder. Then you can access it with url `<base_gas_url>/<link_name>/index.html`.

You can enter in live development mode 

## Compile and run

To compile the project, just run the default grunt task (this has to be done before the first run)

    grunt

If you want to live refresh your development version (implying your gas has its docroot pointing to <client-javascript-directory>/dist)

    grunt dev

> ! this command will wait forever for changes, you can run it in background too

    grunt dev &

## Compilation configuration

Compilation options can be quickly switched to change its behavior.

### Default values

The default values can be found in `tools/grunt/common/grunt.json`.

    {
      "compile": {
        "mode":"dev", // can switch between 'dev' and 'prod'
        "with":{
          "nodewebkit": false,
          "phonegap": false
        }
      }
    }

### Override default values

You can override compilation configuration values by creating a file `custom.json` next to `Gruntfile.js` and redefine any variable from `tools/grunt/common/grunt.json` you want, i.e.:

    {
      "compile": {
        "mode":"prod",
        "with":{
          "phonegap": true
        }
      }
    }

> note that some grunt task will modify this file (see below).

### Using the LogPlayer to replay a log

The LogPlayer is a GBC customization that allows to replay a given log file.
It supports the following file formats:
* FGL (startgui)
* GDC
* uaproxy

To enable it, simply add its folder as customization in custom.json:

    {
      "compile": {
        ...
        "customization": "logplayer"
      }
    }

### Android (phonegap)

In order to compile successfully the android target, you need to fulfill those requirements:

* a local android sdk available on your machine
* `ant` tool

The environment variable `ANDROID_HOME` must be set.

### ios (phonegap)

In order to compile successfully the ios target, you need to fulfill those requirements:

* an osx environment
* xcode
* a certificate to sign the application

## grunt tasks references

 Command                                      | Description                                                          | modifies `custom.json`
 -------------------------------------------- | -------------------------------------------------------------------- | ----------------------
`grunt libs`                                  | Copy client libraries to the dist folder.
`grunt todo`                                  | Find TODO, FIXME and NOTE inside project files
`grunt doc`                                   | Builds the gwc-js technical documentation
`grunt buildnumber`                           | Returns the current build number in format **'BUILD=<buildnumber>'** on the console
`grunt buildnwjs`                             | Create nwjs package.
`grunt phonegap:build`                        | Build as a Phonegap application
`grunt phonegap:run:android:emulator`         | Run a Phonegap application
`grunt clean:default`                         | Clean *dist* folder.
`grunt githooks`                              | Binds grunt tasks to git hooks
`grunt deps`                                  | Installs and updates npm and bower dependencies.
`grunt codecheck`                             | Beautify and check code with jshint
`grunt compile`                               | Run the compilation
`grunt dev`                                   | Run the compilation and keep watching for changes (live development)
`grunt switchTo:<compile_mode>`               | Switch the compile mode (without cleaning dist)                      | yes
`grunt switchAndCompile:<compile_mode>`       | Switch the compile mode (and compile in the new mode)                | yes
`grunt enableNwjs`                            | Enable nwjs embedded package during compilation                      | yes
`grunt disableNwjs`                           | Disable nwjs embedded package during compilation                     | yes
`grunt enableAndroid`                         | Enable android (phonegap) embedded package during compilation        | yes
`grunt disableAndroid`                        | Disable android (phonegap) embedded package during compilation       | yes
`grunt enableIos`                             | Enable ios (phonegap) embedded package during compilation            | yes
`grunt disableIos`                            | Disable ios (phonegap) embedded package during compilation           | yes
`grunt`                                       | Default task. Run the compilation
