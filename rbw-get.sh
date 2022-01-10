#!/bin/bash

PATH=$RBW_PATH:$PATH

argv=(${1//// })

rbw get ${argv[0]} ${argv[1]}
