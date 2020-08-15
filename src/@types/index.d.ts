declare module "*.png"

interface Teacher {
  id: number
  name: string
  subject: 'matematica' | 'fisica'
  bio: string
  whatsapp: string
  cost: number
  avatar: string
  favorited?: boolean
  user_id: number
}