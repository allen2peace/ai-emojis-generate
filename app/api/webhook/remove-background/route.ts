import { replicate } from "@/app/server/replicate"
import { Response, webhookSchema } from "@/app/server/utils"
import { prisma } from "@/app/server/db"
import { put } from "@vercel/blob"

// export async function POST(req: any) {
//   console.log("tago - remove-bg " + req.url)
// }
// export default async function handler(req, res) {
//   console.log("received webhook remove bg: ", req.body.id);
//   // await upsertPrediction(req.body);

//   res.end();
// }
export async function POST(req: any) {
  try {
    console.log("tago - remove-bg "+req.url)
    const searchParams = new URL(req.url).searchParams
    const parsedParams = webhookSchema.safeParse(Object.fromEntries(searchParams))
    console.log("tago - remove-bg "+parsedParams.success)
    if (!parsedParams.success) return Response.invalidRequest(parsedParams.error)
    const { id } = parsedParams.data

    // get output from Replicate
    const body = await req.json()
    const { output, error } = body
    console.log("tago - remove-bg body "+output+" "+error)

    if (typeof error === "string") {
      await prisma.emoji.update({ where: { id }, data: { isFlagged: true, error } })
      return Response.success()
    }

    if (!output) return Response.badRequest("Missing output")

    // convert output to a blob object
    const file = await fetch(output[0]).then((res) => res.blob())
    console.log("tago - remove-bg file "+file)
    // upload & store image
    const { url } = await put(`${id}-original.png`, file, { access: "public" })
    console.log("tago - remove-bg url "+url)
    // update emoji
    await prisma.emoji.update({ where: { id }, data: { originalUrl: url } })

    const res = await replicate.removeBackground({ id, image: output[0] })
    console.log("remove-bg return res= "+res.toString())

    return Response.success()
  } catch (error) {
    console.error(error)
    return Response.internalServerError()
  }
}
