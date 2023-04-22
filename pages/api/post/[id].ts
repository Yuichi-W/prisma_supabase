import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  // 記事のIDを取得
  const postId = req.query.id;

  // HTTPメソッドがDELETEの場合、記事を削除
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });

    // 削除された記事をJSON形式で返す
    res.json(post);
  } else {
    // HTTPメソッドがDELETE以外の場合は、エラーメッセージを返す
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
