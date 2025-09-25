
// import { clerkClient } from '@clerk/express'
// // import { prisma } from '../../prisma/prisma';
// import { NextFunction, Request, Response } from 'express';

// export const syncUserstoDB = async (req: Request, res: Response, next: NextFunction) => {
//     // Logic to sync users from Clerk to your database
//     console.log("Syncing users from Clerk to database...", req.url, res.statusCode);
//     // Example: Fetch users from Clerk and upsert into your database
//     const users = await clerkClient.users.getUserList();
//     if (users.totalCount > 0) {
//         for (const user of users.data) {
//             await prisma.users.upsert({
//                 where: { clerkId: user.id },
//                 update: {
//                     name: user.fullName || "",
//                     email: user.emailAddresses[0].emailAddress
//                 },
//                 create: {
//                     clerkId: user.id,
//                     name: user.fullName || "",
//                     email: user.emailAddresses[0].emailAddress
//                 }
//             });
//         }
//     }
//     next();

// }