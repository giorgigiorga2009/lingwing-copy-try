import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const url: any = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL
      const { message } = req.body

      await axios.post(url, {
        text: message,
      })

      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: 'Failed to send log to Slack' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
