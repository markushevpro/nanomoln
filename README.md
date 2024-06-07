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
curl -lS 'https://raw.githubusercontent.com/markushevpro/nanomoln/release/install.sh' > nanomoln-install.sh && \. nanomoln-install.sh
```

## Running

```sh
npm start
```

## Configuration

### config.json

- **host** - public host IP or domain. *(Default: 127.0.0.1)*
- **port** - custom port to run on. *(Default: 3000)*
- **paths** - list of folders to be manipulated. *(Should be filled before start, default empty)*
- **accept** - list of MIME-types, allowed to be uploaded *(No wildcards for now, default: ["audio/mpeg"])*