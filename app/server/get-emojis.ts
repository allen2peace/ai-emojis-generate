import { Prisma } from "@prisma/client"
import "server-only"
import { prisma } from "./db"
import { VALID_EMOJI_FILTER } from "./utils"
import { PrismaCacheStrategy } from "@prisma/extension-accelerate"
import { log } from "console"

export const getEmojis = async (opts: {
  take?: number
  skip?: number
  orderBy?:
    | Prisma.EmojiOrderByWithRelationInput
    | Prisma.EmojiOrderByWithRelationInput[]
  cacheStrategy?: PrismaCacheStrategy["cacheStrategy"]
}) => {
  const take = opts.take ?? 100
  const skip = opts.skip ?? undefined
  const orderBy = opts.orderBy ?? { createdAt: Prisma.SortOrder.desc }
  const cacheStrategy = opts.cacheStrategy ?? undefined

  const a = prisma.emoji.findMany({
  select: { id: true, updatedAt: true },
  orderBy,
  where: VALID_EMOJI_FILTER,
  take,
  skip,
  cacheStrategy,
})

// await prisma.emoji.deleteMany({
//   where: {
//     noBackgroundUrl: null,
//   },
// })
log("tago - getEmojis findMany --- "+a)
  return a
}
