export default function handler(req, res) {
  if (process.env.NEXT_USERS_AUTHORIZED.split(';').includes(req.body.email)) {
    res.status(200).json({ access: true })
  } else {
    res.status(403).json({ access: false })
  }
}
