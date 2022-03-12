#!/bin/sh
cd frontend && npm run build 
cd .. && docker-compose up --build
