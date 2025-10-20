// Script temporário para buscar dados do banco
const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function buscarDados() {
  try {
    console.log('🔍 Buscando reflexões do usuário: cmgwakeho0000weu8r3vl9r3q');

    const reflexoes = await prisma.reflection.findMany({
      where: {
        userId: 'cmgwakeho0000weu8r3vl9r3q',
      },
      select: {
        id: true,
        title: true,
        category: true,
        emotion: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log('� Reflexões atuais do usuário:');
    console.log('='.repeat(60));

    if (reflexoes.length === 0) {
      console.log('❌ Nenhuma reflexão encontrada para este usuário.');
    } else {
      reflexoes.forEach((reflection, index) => {
        console.log(`${index + 1}. ID: ${reflection.id}`);
        console.log(`   Título: ${reflection.title}`);
        console.log(`   Categoria: ${reflection.category}`);
        console.log(`   Emoção: ${reflection.emotion}`);
        console.log(`   Criada: ${reflection.createdAt.toISOString()}`);
        console.log(`   Atualizada: ${reflection.updatedAt.toISOString()}`);
        console.log('-'.repeat(50));
      });

      console.log(`\n📊 Total: ${reflexoes.length} reflexões encontradas`);

      // URLs para teste
      console.log('\n🚀 URLs para testes de edição individual:');
      reflexoes.forEach((reflection, index) => {
        console.log(
          `${index + 1}. PUT http://localhost:3000/edicao-registros/reflexao/${reflection.id}/usuario/cmgwakeho0000weu8r3vl9r3q`,
        );
      });

      console.log('\n�️ URLs para testes de exclusão individual:');
      reflexoes.forEach((reflection, index) => {
        console.log(
          `${index + 1}. DELETE http://localhost:3000/edicao-registros/reflexao/${reflection.id}/usuario/cmgwakeho0000weu8r3vl9r3q`,
        );
      });

      if (reflexoes.length >= 2) {
        console.log('\n📦 JSON para teste em lote (2 reflexões):');
        console.log(
          'URL: PUT http://localhost:3000/edicao-registros/reflexoes/usuario/cmgwakeho0000weu8r3vl9r3q',
        );
        console.log(
          JSON.stringify(
            {
              reflexaoIds: [reflexoes[0].id, reflexoes[1].id],
              updateData: {
                category: 'ESTUDO',
                emotion: 'MOTIVACAO',
              },
            },
            null,
            2,
          ),
        );
      }

      if (reflexoes.length >= 3) {
        console.log('\n🗑️ JSON para exclusão em lote (3 reflexões):');
        console.log(
          'URL: DELETE http://localhost:3000/edicao-registros/reflexoes/usuario/cmgwakeho0000weu8r3vl9r3q',
        );
        console.log(
          JSON.stringify(
            {
              reflexaoIds: [reflexoes[0].id, reflexoes[1].id, reflexoes[2].id],
            },
            null,
            2,
          ),
        );
      }
    }
  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

buscarDados();
