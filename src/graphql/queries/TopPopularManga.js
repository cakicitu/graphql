import gql from 'graphql-tag'

export default  gql`
    query($page: Int, $perPage: Int) {
        Page(
            page: $page,
            perPage: $perPage,
        ){
            pageInfo{
                total
                currentPage
                lastPage
                hasNextPage
            }
            media(
                type: MANGA
                sort: POPULARITY_DESC,
            ){
                id
                title {
                    english
                }
                averageScore
                coverImage{
                    medium
                }
                genres
                trending
                status
                chapters
            }
        }
    }

`