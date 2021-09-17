import { Construct } from "@aws-cdk/core";
import { IFunction } from "@aws-cdk/aws-lambda";
import { EndpointType, LambdaIntegration, Model, PassthroughBehavior, RestApi } from "@aws-cdk/aws-apigateway";

export interface MusicAlbumFinderApiProps {
    searchAlbumsFunction: IFunction;
}

export class MusicAlbumFinderApi extends Construct {
    constructor(scope: Construct, id: string, props: MusicAlbumFinderApiProps) {
        super(scope, id);

        const restApi = new RestApi(this, 'MusicAlbumFinderApi', {
            description: 'Handles all queries for the Music Album Finder',
            endpointTypes: [EndpointType.REGIONAL],
            deployOptions: {
              stageName: 'Production'
            }  
        });

        const searchResource = restApi.root.addResource('search'); 

        const searchResourceIntegration = new LambdaIntegration(props.searchAlbumsFunction, {
            proxy: false,
            passthroughBehavior: PassthroughBehavior.WHEN_NO_TEMPLATES,
            requestTemplates: {
              'application/json': `$input.json('$')`
            },
            integrationResponses: [
              { statusCode: '200', responseTemplates: { 'application/json': `$input.path('$')` } }
            ]
        });

        searchResource.addMethod('GET', searchResourceIntegration, {
            methodResponses: [
                { statusCode: '200', responseModels: { 'application/json': Model.EMPTY_MODEL }}
            ]
        });
    }
}