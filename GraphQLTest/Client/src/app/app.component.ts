import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'graphql-test';

    constructor(private readonly apollo: Apollo) {
        this.apollo
            .query({
                query: gql`
                    query GetGreeting($name: String) {
                        greeting(name: $name)
                    }
                `,
                variables: {
                    name: 'Tom Jones'
                }
            })
            .subscribe(result => console.log(result.data?.greeting));
    }
}
