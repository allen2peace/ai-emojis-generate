import { prisma } from "@/app/server/db"
import { EmojiContextProps, Response } from "@/app/server/utils"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const fetchCache = "force-no-store"
export const revalidate = 0

export async function GET(request: Request, { params }: EmojiContextProps) {
  try {
    const emoji = await prisma.emoji.findUnique({
      where: { id: params.id },
    })
    if (!emoji) return Response.emojiNotFound()

    return NextResponse.json({ emoji }, { status: 200 })
  } catch (error) {
    console.error(error)
    return Response.internalServerError()
  }
}
