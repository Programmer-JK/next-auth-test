import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    // ID, PW 로그인 방식
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소를 입력해주세요",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: credentials?.userName,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log("$$$ user:", user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      console.log("$$$ token : ", token);
      session.user = token as never;
      console.log("$$$ session : ", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

export { handler as GET, handler as POST };
