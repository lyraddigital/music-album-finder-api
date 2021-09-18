import * as cdk from '@aws-cdk/core';
import { Runtime } from '@aws-cdk/aws-lambda';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';

import { MusicAlbumFinderApi } from './constructs/music-album-finder-api';

export class MusicAlbumFinderApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const searchAlbumsFunction = new NodejsFunction(this, 'SearchAlbumsFunction', {
        entry: 'asset-input/lambda/search/index.ts',
        handler: 'handler',
        runtime: Runtime.NODEJS_14_X
    });

    new MusicAlbumFinderApi(this, 'MusicAlbumFinderApi', {
      searchAlbumsFunction
    });
  }
}
