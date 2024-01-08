'use server'

import { revalidatePath } from "next/cache"
import { Stream } from "@prisma/client"
import { db } from "@/lib/db"
import { getSelf } from "@/lib/service/auth"

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf()
    const selfStream = await db.stream.findUnique({
      where: {
        userId: self.id,
      },
    })

    if (!selfStream) {
      throw new Error("Stream not found")
    }

    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isCHatFollowersOnly: values.isCHatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    }

    const updatedStream = await db.stream.update({
      where: {
        id: selfStream.id,
      },
      data: {
        ...validData,
      },
    })

    revalidatePath(`/u/${self.username}`)
    revalidatePath(`/u/${self.username}/chat`)
    revalidatePath(`/${self.username}`)


    return updatedStream
  } catch {
    throw new Error("Failed to update stream")
  }
}