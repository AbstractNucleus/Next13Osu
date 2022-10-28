import '../styles/globals.css'
import Counter from './Counter'
import Nav from './osu/Nav'

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
  const response = await fetch(`https://osu.ppy.sh/api/v2/users/${user_id}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token.access_token}`
      }
  })
  return response.json()
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await get_user("16589754")


  return (
    <html>
      <head></head>
      <body>
        <div className='flex-col'>
          <div className='flex'>
            <Nav />
            <h1 className="text-3xl font-bold text-red-500">#{user.statistics.global_rank}</h1>
            <Counter />
            
          </div>
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
