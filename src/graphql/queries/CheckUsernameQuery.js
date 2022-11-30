import gql from 'graphql-tag'

export default gql`
    query($username: String!) {
        checkUsernameAvailable(name: $username) {
            name
        }
    }`