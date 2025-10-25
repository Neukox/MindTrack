// Script temporário para buscar dados do banco
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function buscarDados() {
  try {
    console.log('🔍 Buscando usuários...');
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
      }
    });
    
    console.log('👥 Usuários encontrados:');
    usuarios.forEach(user => {
      console.log(`  - ID: ${user.id} | Username: ${user.username} | Email: ${user.email}`);
    });

    console.log('\n🔍 Buscando reflexões...');
    const reflexoes = await prisma.reflection.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        emotion: true,
        userId: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('📝 Reflexões encontradas:');
    reflexoes.forEach(reflection => {
      console.log(`  - ID: ${reflection.id}`);
      console.log(`    Título: ${reflection.title}`);
      console.log(`    User ID: ${reflection.userId}`);
      console.log(`    Categoria: ${reflection.category}`);
      console.log(`    Emoção: ${reflection.emotion}`);
      console.log(`    Criada em: ${reflection.createdAt}`);
      console.log('    ---');
    });

    console.log(`\n📊 Total: ${usuarios.length} usuários, ${reflexoes.length} reflexões`);

  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

buscarDados();