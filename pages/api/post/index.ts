import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  // タイトルとコンテンツを抽出
  const { title, content } = req.body;

  // セッション取得。
  const session = await getSession({ req });

  // PrismaClientを使用して、新しい記事を作成。
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  // レスポンスとして、作成された記事をJSON形式で返す
  res.json(result);
}