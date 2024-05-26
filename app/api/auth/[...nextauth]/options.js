import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
          placeholder: 'your-cool-username',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'your-awesome-password',
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        // get from mongodb 
        const user = { id: '42', name: 'admin', password: 'admin123' };

        if (credentials.username === user.name && credentials.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
      httpOptions: {
        timeout: 4000,
      },
    }),
  ],
};
