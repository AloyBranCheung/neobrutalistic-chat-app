#!/usr/bin/env bash

concurrently 'cd ./client && npm run start' 'cd ./server && npm run dev'