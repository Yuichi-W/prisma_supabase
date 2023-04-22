import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import prisma from '../../../lib/prisma';

// Next.js APIルートのハンドラーを定義
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  // 認証プロバイダーのリストを指定
  providers: [
    // GitHub認証プロバイダーを追加
    GitHubProvider({
      // GitHub OAuthアプリケーションのクライアントID
      clientId: process.env.GITHUB_ID,
      // GitHub OAuthアプリケーションのクライアントシークレット
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Google認証プロバイダーを追加
    GoogleProvider({
      // Google OAuthクライアントID
      clientId: process.env.GOOGLE_CLIENT_ID,
      // Google OAuthクライアントシークレット
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",// 認証時Googleに表示されるダイアログの種類を指定
          access_type: "offline",// Google OAuthアクセストークン取得に必要な許可を要求
          response_type: "code"// Google OAuth認証レスポンスタイプを指定。"code"はアクセストークンを受け取るための認証コードを返す
        }
      }
    }),
  ],
  // データベースアダプターを指定する
  adapter: PrismaAdapter(prisma),
  // トークン署名に使用する秘密鍵を指定する
  secret: process.env.SECRET,
};