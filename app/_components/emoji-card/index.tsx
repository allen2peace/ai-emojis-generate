import { formatPrompt } from "@/app/lib/utils"
import { getEmoji } from "@/app/server/get-emoji"
import { ButtonCard } from "./button-card"

interface EmojiCardProps {
  id: string
  alwaysShowDownloadBtn?: boolean
}

export async function EmojiCard({ id, alwaysShowDownloadBtn }: EmojiCardProps) {
  const data = await getEmoji(id)
  // if (!data) return null

  return (
    <ButtonCard
      id={id}
      name={"cat prompt"}
      src={"https://aaah0mnbncqtinas.public.blob.vercel-storage.com/SG2r10222N-no-background-7RCWU29wPByCsfYGjaWWJzrW2wzICY.png"}
      createdAt={new Date()}
      alwaysShowDownloadBtn={alwaysShowDownloadBtn}
    />
  )
}
