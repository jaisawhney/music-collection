import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSetting(name: string) {
    return prisma.setting.findUnique({
        where: {
            name: name,
        },
    });
}

export default async function updateSetting(name: string, value: string) {
    return prisma.setting.upsert({
        where: {
            name: name,
        },
        update: {
            value: value,
        },
        create: {
            name: name,
            value: value,
        },
    });
}