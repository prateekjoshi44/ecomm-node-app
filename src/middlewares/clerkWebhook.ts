// src/middlewares/webhookMiddleware.ts
import { verifyWebhook } from '@clerk/express/webhooks'
import { Request, Response, NextFunction } from "express";
import { prisma } from '../../prisma/prisma';
import { clerkClient } from '@clerk/express'


export const webhookMiddleware = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        // Verify the webhook (your custom function)
        console.log("verifyWebhook")
        const event = await verifyWebhook(req);
        // Attach verified event to request object

        switch (event.type) {
            case 'user.created':
                // Handle user creation
                const user = await clerkClient.users.getUser(event.data.id);
                const response = await prisma.user.upsert({
                    where: { clerkId: user.id },
                    update: {
                        name: user.fullName || "",
                        email: user.emailAddresses[0].emailAddress
                    },
                    create: {
                        name: user.fullName || "",
                        clerkId: user.id,
                        email: user.emailAddresses[0].emailAddress
                    }
                });
                console.log("user created!!!", response)
                if (response.id) {
                    res.status(201).send("User created");
                }
                break;

            case 'user.deleted':
                // Handle user deletion from postgres
                if (event.data.id) {
                    const user = await prisma.user.findUnique({ where: { clerkId: event.data.id } });
                    if (user) {
                        const response = await prisma.user.delete({ where: { clerkId: event.data.id } });
                        console.log("user deleted!!!", response)
                        if (response.id) {
                            res.status(201).send("User deleted from DB");
                        }
                    }
                    else {
                        console.log("user not found in DB for deletion");
                        res.status(404).send("User not found in DB");
                    }
                }

                break;

            default:
                console.log("unhandled")
        }
        // Continue to next middleware/controller

        (req as any).webhookEvent = event;
        // next();
    } catch (err) {
        console.error("Error verifying webhook:", err);
        res.status(400).send("Error verifying webhook");
    }
};
