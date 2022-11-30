import gql from 'graphql-tag'

export default  gql`
    query {
        Page(
            page:1,
            perPage: 5,
        ){
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