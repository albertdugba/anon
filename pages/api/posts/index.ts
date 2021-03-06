import { NextApiRequest, NextApiResponse } from 'next/types'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function withPrismaClient(
  _: NextApiRequest,
  res: NextApiResponse
) {
  async function main() {
    const posts = await prisma.post.findMany({
      orderBy: [{ createdAt: 'desc' }],
      include: {
        photos: true,
        vote: true,
        comments: {
          include: { replies: true },
        },
      },
    })
    return res.status(200).json(posts)
  }

  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}
