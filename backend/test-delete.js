const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const snippets = await prisma.snippet.findMany();
  console.log('Current snippets:', snippets.map(s => ({ id: s.id, title: s.title })));
  
  if (snippets.length > 0) {
    const target = snippets.find(s => s.title.includes('Test') || s.title.includes('verified') || s.title.includes('Bug'));
    if (target) {
      console.log('Attempting to delete:', target.id);
      const deleted = await prisma.snippet.delete({ where: { id: target.id } });
      console.log('Deleted successfully:', deleted.id);
    } else {
      console.log('No test snippets found to delete.');
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
