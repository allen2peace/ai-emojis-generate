import { formatPrompt } from "@/app/lib/utils"
import { getEmoji } from "@/app/server/get-emoji"
import { ButtonCard } from "./button-card"

interface EmojiCardProps {
  id: string
  alwaysShowDownloadBtn?: boolean
}

export async function EmojiCard({ id, alwaysShowDownloadBtn }: EmojiCardProps) {
  const data = await getEmoji(id)
  if (!data) return null

  return (
    <ButtonCard
      id={id}
      name={formatPrompt(data.prompt)}
      src={data.noBackgroundUrl}
      createdAt={data.createdAt}
      alwaysShowDownloadBtn={alwaysShowDownloadBtn}
    />
  )
}
