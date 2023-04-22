export default async function handle(req, res) {
  // 公開する記事のIDを取得
  const postId = req.query.id;

  // 記事を更新、publishedフラグをtrueに設定
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });

  // 更新された記事をJSON形式で返す
  res.json(post);
}