import { Response, webhookSchema } from "@/app/server/utils"
import { prisma } from "@/app/server/db"
import { put } from "@vercel/blob"

export async function POST(req: Request) {
  try {
    console.log("tago - save-emoji url "+req.url)
    const searchParams = new URL(req.url).searchParams
    const parsedParams = webhookSchema.safeParse(Object.fromEntries(searchParams))
    console.log("tago - save-emoji success "+parsedParams.success)
    if (!parsedParams.success) return Response.invalidRequest(parsedParams.error)
    const { id } = parsedParams.data

    // get output from Replicate
    const body = await req.json()
    const { output } = body
    console.log("tago - save-emoji body "+output)
    if (!output) return Response.badRequest("Missing output")

    // convert output to a blob object
    const file = await fetch(output).then((res) => res.blob())

    console.log("save-emoji "+file.name+" "+file.size+" "+file.type)
    // upload & store image
    const { url } = await put(`${id}-no-background.png`, file, { access: "public" })
    console.log("tago - save-emoji url "+url)
    // update emoji
    await prisma.emoji.update({ where: { id }, data: { noBackgroundUrl: url } })

    return Response.success()
  } catch (error) {
    console.error(error)
    return Response.internalServerError()
  }
}
