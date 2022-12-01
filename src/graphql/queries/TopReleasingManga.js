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
                status: RELEASING
                type: ANIME
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
            }
        }
    }

`