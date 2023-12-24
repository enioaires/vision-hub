import { db } from "@/lib/db"
import { getSelf } from "@/lib/service/auth"

export const getRecommended = async () => {
  const self = await getSelf()

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 10,
    where: {
      id: {
        not: self.id
      }
    }
  })

  return users
}