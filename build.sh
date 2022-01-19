#!/bin/sh
cd ./backend && GOOS=linux GOARCH=amd64 CGO_ENDBLED=0 go build main.go
cd ../frontend && npm run build 
