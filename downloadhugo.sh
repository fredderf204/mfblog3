#!/bin/bash
#download and install hugo 0.26
curl -O https://github.com/gohugoio/hugo/releases/download/v0.26/hugo_0.26_Linux-64bit.deb
sudo dpkg -i hugo*.deb

#verify install
hugo version