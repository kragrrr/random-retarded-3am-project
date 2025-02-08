import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        try {
            // TODO: Save user details to database
            // const userDetails = req.body;
            // await db.user.update({ where: { email: session.user.email }, data: userDetails });

            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update profile' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 