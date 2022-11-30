import gql from 'graphql-tag'

export default  gql`
    mutation (
        $title: String!
        $author: String!
        $description: String!
        $featured: Boolean
        $category_id: Int!
    ) {
        createBook(
            title: $title,
            author: $author,
            description: $description,
            featured: $featured,
            category_id: $category_id
        ){
            id
            title
        }
    }
`