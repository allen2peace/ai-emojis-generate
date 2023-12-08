import { Favicon } from "@/app/_components/favicon"
import { FEATURED_OG_IMAGES } from "@/app/lib/constants"
import { getRandomItem } from "@/app/lib/utils"
import { getEmoji } from "@/app/server/get-emoji"
import { EmojiContextProps } from "@/app/server/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Icon({ params }: EmojiContextProps) {
  const data = await getEmoji(params.id)
  // if (!data) return

  return Favicon({ url: "https://aaah0mnbncqtinas.public.blob.vercel-storage.com/SG2r10222N-no-background-7RCWU29wPByCsfYGjaWWJzrW2wzICY.png" ?? getRandomItem(FEATURED_OG_IMAGES) })
}
