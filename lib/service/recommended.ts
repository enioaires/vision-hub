import { db } from "@/lib/db"
import { getSelf } from "@/lib/service/auth"

export const getRecommended = async () => {
  let userId

  try {
    const self = await getSelf()
    userId = self.id
  } catch {
    userId = null
  }

  let users = []

  if (userId) {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      },
      where: {
        id: {
          not: userId
        }
      }
    })
  } else {
    users = await db.user.findMany({
      orderBy: {
        createdAt: "desc"
      },
    })
  }


  return users
}