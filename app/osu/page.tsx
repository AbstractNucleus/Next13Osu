

async function get_token() {

    const id = process.env.OSU_CLIENT_ID
    const secret = process.env.OSU_CLIENT_SECRET

    const response = await fetch("https://osu.ppy.sh/oauth/token", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "client_id": id,
        "client_secret": secret,
        "grant_type": "client_credentials",
        "scope": "public"
      })
    })
    return response.json()
  }

  async function get_user(user_id: string) {
    const token = await get_token()
    const response = await fetch(`https://osu.ppy.sh/api/v2/users/${user_id}/scores/best`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token.access_token}`
        }
    })
    return response.json()
  }


export default async function Osu() {
    const scores = await get_user("16589754")
    console.log(scores[0].beatmapset)
    return scores.map((score: any) => {
        return (
            <>
                <div>
                <img src={score.beatmapset.covers.list} />
                <a href={score.beatmap.url}>
                    <h1>{score.beatmapset.title}</h1>
                </a>
                </div>
            </>
        )
    })
}