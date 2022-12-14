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
                season: FALL,
                seasonYear: 2022
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
                airingSchedule{
                    nodes{
                        timeUntilAiring
                        episode

                    }
                }
                trending
            }
        }
    }

`