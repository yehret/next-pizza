import { AuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: AuthOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_CLIENT_ID || '',
         clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      })
   ]
}