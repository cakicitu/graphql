
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApolloComponents from '@vue/apollo-components'
// import { ApolloLink, concat, split } from "apollo-link";

import App from './App.vue'
import router from './router'

import './assets/main.css'

import {ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'



const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: 'http://localhost:8888/graphql',

})

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    // const token = this.$root.token
    // console.log("token: ", token)
    const token = localStorage.getItem('token');
    // this.$root.user
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        },
    });
    return forward(operation);
});

// Create the apollo client
const apolloClient = new ApolloClient({
    link:  concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

// Create a provider
const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
})


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(apolloProvider)
app.use(VueApolloComponents)
app.mount('#app')