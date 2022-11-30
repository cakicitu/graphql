import gql from 'graphql-tag'

export default  gql`
    mutation (
        $email: String!
        $password: String!
    ) {
        login(input: {
            username: $email,
            password: $password
        }) {
            access_token
            refresh_token
            expires_in
            token_type
            user {
                id
                email
                name
                created_at
                updated_at
            }
        }
    }
`