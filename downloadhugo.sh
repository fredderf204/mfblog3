#!/bin/bash
#download and install hugo 0.26
curl -fSL https://github.com/gohugoio/hugo/releases/download/v0.26/hugo_0.26_Linux-64bit.tar.gz -o hugo.tar.gz
tar -xvzf hugo.tar.gz

#verify install
hugo version