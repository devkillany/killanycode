import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Admin User
  const adminEmail = 'admin@killanycode.com';
  const hashedPassword = await bcrypt.hash('01000621479', 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Eng. Mohamed Elkillany',
      password: hashedPassword,
    },
  });

  console.log(`Admin user created: ${admin.name}`);

  // 2. Create Initial Languages
  const languages = [
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'Python', icon: 'python' },
    { name: 'C++', icon: 'cpp' },
    { name: 'Java', icon: 'java' },
    { name: 'PHP', icon: 'php' },
    { name: 'Go', icon: 'go' },
    { name: 'Rust', icon: 'rust' },
    { name: 'HTML', icon: 'html' },
    { name: 'CSS', icon: 'css' },
  ];

  for (const lang of languages) {
    await prisma.language.upsert({
      where: { name: lang.name },
      update: {},
      create: lang,
    });
  }

  console.log('Languages seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
