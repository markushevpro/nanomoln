# nanomoln

Easy way to make comfortable web-based file management.
Written in Remix (Node.js, React) & Typescript.

## Features

- Drag'n'drop interface (uploading, moving)
- Flexible config
- - Choose port
- - Select folders to manipulate
- - Restrict accepted mime types for uploading

## Requirements

### Ubuntu

- Bash
- Internet access
- Permission to install packages

*yeah, that's it*

## Installation

Installation script will automatically install nvm, Node.js 18 (if not installed) and Nanomoln. 

Run following command in *parent* directory, new directory "nanomoln" will be created there.

```sh
curl -sL 'https://raw.githubusercontent.com/markushevpro/nanomoln/release/install.sh' > nanomoln-install.sh && \. nanomoln-install.sh
```

## Running

```sh
npm start
```

## Configuration

You can automatically set or update config files with following command

```sh
npm run config
```

### config.json

- **host** - local IP or public host. *(Default: 127.0.0.1)*
- **port** - custom port to run on. *(Default: 3000)*
- **paths** - list of folders to be manipulated. *(Should be filled before start, default empty)*
- **accept** - list of MIME-types, allowed to be uploaded *(No wildcards for now, default: ["audio/mpeg"])*