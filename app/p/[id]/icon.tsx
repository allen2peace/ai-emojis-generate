import { Favicon } from "@/app/_components/favicon"
import { FEATURED_OG_IMAGES } from "@/app/lib/constants"
import { getRandomItem } from "@/app/lib/utils"
import { getEmoji } from "@/app/server/get-emoji"
import { EmojiContextProps } from "@/app/server/utils"

export { contentType, size } from "@/app/_components/favicon"

export default async function Icon({ params }: EmojiContextProps) {
  const data = await getEmoji(params.id)
  console.log("tago - [FavIcon...] "+data?.noBackgroundUrl+" "+params.id + " "+data?.originalUrl)
  if (!data) return

  return Favicon({ url: data.noBackgroundUrl ?? getRandomItem(FEATURED_OG_IMAGES) })
  // return Favicon({ url: data.noBackgroundUrl ?? "" });
}
