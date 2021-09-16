#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MusicAlbumFinderApiStack } from '../lib/music-album-finder-api-stack';

const app = new cdk.App();
new MusicAlbumFinderApiStack(app, 'MusicAlbumFinderApiStack');
