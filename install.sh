#!/bin/bash

# Use nvm if installed

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Define helpers

install_nvm(){
    echo "Installing nvm..."

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
}

install_node(){
    echo "Switching to Node.js v18..."
    nvm install 18 && nvm use 18
}

check_nvm(){
    echo "Checking nvm installation..."

    NVM=$(nvm -v) > /dev/null
    if [ "$NVM" = '' ]
    then
        echo "nvm installation not found"
        install_nvm
    fi

    install_node
}

# Check and install nvm & node.js 

if which node > /dev/null
    then
    echo "Node.js installation found"

    NODE_VERSION=$(node -v | cut -d'.' -f 1 | cut -d'v' -f 2)

    if [ "$NODE_VERSION" -lt "18" ];
    then
        echo "Wrong Node.js version: $NODE_VERSION"
        check_nvm
    fi
else
    echo "Node.js not found. Installing..."
    check_nvm
fi

# Install Nanomoln

curl -lS "https://github.com/markushevpro/nanomoln/archive/refs/tags/0.1.0.tar.gz" | tar zx
cd nanomoln && npm install --loglevel verbose

# Create config

node ./install.cjs

echo "Nanomoln installed. Successfully. To run Nanomoln type 'npm start'"