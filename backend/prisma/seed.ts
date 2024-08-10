import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()
async function main() {
	const adminUser = await prisma.user.upsert({
		where: { email: "admin@careerhak.com" },
		update: {},
		create: {
			name: "Principal",
			email: "principal@classroom.com",
			password: await bcrypt.hash("Admin", 10),
			role: "Principal",
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
