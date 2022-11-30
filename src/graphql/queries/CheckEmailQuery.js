import gql from 'graphql-tag'

export default gql`
    query($email: String!) {
        checkEmailAvailable(email: $email) {
            email
        }
    }`