#!/usr/bin/env bash
createdb magic-eight-ball
psql -f schema.sql magic-eight-ball
psql -f seed.sql magic-eight-ball