import { getEmojis } from "@/app/server/get-emojis"
import { EmojiCard } from "../emoji-card"
import { log } from "console"

interface EmojiGridProps {
  prompt?: string
}

export async function EmojiGrid({ prompt }: EmojiGridProps) {
  const emojis = await getEmojis({
    take: 100,
    orderBy: undefined,
    cacheStrategy: undefined,
  })
  log("tago - [EmojiGrid] " + emojis.length + " " + prompt + " " + emojis[0])
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out justify-items-stretch pl-5 pr-5">
      {/* <h2 className="font-semibold text-md text-left w-full mb-3">{!!prompt ? "Related Emojis" : "Recent Emojis"}</h2> */}
      <h2 className="font-semibold text-md text-left w-full mb-3">Recent Emojis</h2>
      <div className="grid grid-cols-6 gap-2 justify-self-center ">
        {emojis.map((emoji: any) => (
          <EmojiCard key={emoji.id} id={emoji.id} />
        ))}
      </div>
    </div>
  )
}