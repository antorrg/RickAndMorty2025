import dotenv from 'dotenv'
dotenv.config()
const { EMPTYIMG } = process.env
const datamaped = (info) => {
  return {
    id: info.id,
    name: info.name,
    description: info.description,
    image: info.image,
    released: info.released,
    price: info.price,
    physicalGame: info.physicalGame,
    stock: info.stock,
    enable: info.enable,
    Genres: info.Genres.map(genre => genre.name),
    Platforms: info.Platforms.map(platform => platform.name)
  }
}

const usermaped = (info) => {
  return {
    id: info.id,
    email: info.email,
    password: info.password ?? null,
    nickname: info.nickname,
    given_name: info.given_name ?? null,
    user_name: info.user_name ?? null,
    picture: info.picture,
    role: info.role,
    country: info.country ?? null,
    enable: info.enable,
    createdAt: info.createdAt,
    updatedAt: info.updatedAt ?? null

  }
}
const emptyRes = () => {
  return [{
    id: 9999,
    name: 'No hay favoritos aun',
    gender: 'Nada por aqui',
    status: 'No hay favoritos aun',
    species: 'Aca menos',
    image: `${EMPTYIMG}`
  }]
}
export {
  datamaped,
  usermaped,
  emptyRes
}
