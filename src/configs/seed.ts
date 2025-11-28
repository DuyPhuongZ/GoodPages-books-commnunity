import { RoleName } from "../generated/prisma/enums";
import prisma from "./prisma.client.config";


export async function seed() {
    console.log(">>> Running seed...");

    /**
     * ==========================
     * 1. Seed Roles
     * ==========================
     */
    const roleCount = await prisma.role.count();

    await prisma.user.deleteMany();
    console.log(">>> Users already exist, delete old users.");

    await prisma.role.deleteMany();
    console.log(">>> Roles already exist, delete old roles.");

    if (roleCount === 0) {
        await prisma.role.createMany({
            data: [
                {
                    roleName: RoleName.ADMIN,
                    description: "Administrator – full access",
                },
                {
                    roleName: RoleName.AUTHOR,
                    description: "Author – author of books",
                },
                {
                    roleName: RoleName.READER,
                    description: "Reader – normal user",
                },
            ],
        });

        console.log(">>> Seeded roles (ADMIN, AUTHOR, READER)");
    } else {
        console.log(">>> Roles already exist, skip seeding roles.");
    }

    /**
     * ==========================
     * 2. Seed Users
     * ==========================
     */
    const userCount = await prisma.user.count();

    if (userCount === 0) {
        // Lấy id role từ DB (không hard-code số id)
        const adminRole = await prisma.role.findUnique({
            where: { roleName: RoleName.ADMIN },
        });
        const authorRole = await prisma.role.findUnique({
            where: { roleName: RoleName.AUTHOR },
        });
        const readerRole = await prisma.role.findUnique({
            where: { roleName: RoleName.READER },
        });

        if (!adminRole || !authorRole || !readerRole) {
            throw new Error(">>> Roles not found. Make sure roles are seeded correctly.");
        }

        await prisma.user.createMany({
            data: [
                {
                    username: "admin",
                    email: "admin@example.com",
                    name: "Main Admin",
                    password: "123456", // TODO: hash password khi dùng thực tế
                    bio: "System administrator",
                    roleId: adminRole.id,
                },
                {
                    username: "author1",
                    email: "author1@example.com",
                    name: "First Author",
                    password: "123456",
                    bio: "Content creator",
                    roleId: authorRole.id,
                },
                {
                    username: "reader1",
                    email: "reader1@example.com",
                    name: "First Reader",
                    password: "123456",
                    bio: "Just reading stuff",
                    roleId: readerRole.id,
                },
            ],
        });

        console.log(">>> Seeded users (admin, author1, reader1)");
    } else {
        console.log(">>> Users already exist, skip seeding users.");
    }

    console.log(">>> Seed finished.");
}

// Nếu muốn có thể chạy trực tiếp file này bằng ts-node
if (require.main === module) {
    seed()
        .catch((e) => {
            console.error(e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
