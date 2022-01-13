export default function handler(req, res) {
  if (process.env.NEXT_USERS_VIEWER_ONLY.split(';').includes(req.body.email)) {
    res.status(200).json({ viewer: true })
  } else {
    res.status(200).json({ viewer: false })
  }
}
