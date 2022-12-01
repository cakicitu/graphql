import gql from 'graphql-tag'

export default  gql`
    query($search: String, $page: Int) {
        Page(
            page: $page,
            perPage: 15,
        ){
            pageInfo{
                total
                currentPage
                lastPage
                hasNextPage
            }
            media(
                search: $search
            ){
                id
                title {
                    english
                    native
                    romaji
                }
                averageScore
                coverImage{
                    medium
                }
                genres
                airingSchedule{
                    nodes{
                        timeUntilAiring
                        episode
                    }
                }
                trending
                favourites
                type
            }
        }
    }

`