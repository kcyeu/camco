#!/bin/sh

PACK_FILE='camco.zip'

rm -f ${PACK_FILE}

git add .
git commit

zip ${PACK_FILE} extension/*
