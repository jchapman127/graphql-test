import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloClientOptions } from 'apollo-client';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { createPersistedQueryLink } from 'apollo-angular-link-persisted';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink): ApolloClientOptions<any> => ({
                cache: new InMemoryCache(),
                link: createPersistedQueryLink()
                    .concat(
                        httpLink.create({
                            uri: 'https://localhost:5001/graphql'
                        })
                    )
            }),
            deps: [HttpLink]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
