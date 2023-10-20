import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user } = req.body;
    try {
      const existingUser = await prisma.userDetails.findUnique({
        where: { email: user.email },
      });
      if (!existingUser) {
        await prisma.userDetails.create({
          data: {
            name: user.name,
            email: user.email,
          },
        });
      }

      res.status(200).json({ message: "Logged in successfully" });
      res.writeHead(302, { Location: "/reports" });
      res.end();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
