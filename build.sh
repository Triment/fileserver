#!/bin/sh
cd ./backend && GOOS=linux CGO_ENDBLED=0 go build main.go
cd ../frontend && npm run build 
