import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando o seed do banco de dados...');

  // Limpar dados existentes (opcional - comentar se não quiser apagar)
  console.log('🧹 Limpando dados existentes...');
  await prisma.reflection.deleteMany();
  await prisma.dashboardMetrics.deleteMany();
  await prisma.passwordResetToken.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuários de exemplo
  console.log('👥 Criando usuários...');

  const hashedPassword = await bcrypt.hash('123456', 10);

  const user1 = await prisma.user.create({
    data: {
      username: 'João Silva',
      email: 'joao@exemplo.com',
      password: hashedPassword,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'Maria Santos',
      email: 'maria@exemplo.com',
      password: hashedPassword,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'Pedro Costa',
      email: 'pedro@exemplo.com',
      password: hashedPassword,
    },
  });

  console.log('✅ Usuários criados com sucesso!');

  // Criar reflexões de exemplo
  console.log('📝 Criando reflexões...');

  const reflexoesExemplo = [
    // Reflexões do João
    {
      title: 'Primeira aula de algoritmos',
      category: 'ESTUDO' as const,
      emotion: 'MOTIVACAO' as const,
      content:
        'Hoje tive minha primeira aula de algoritmos. Foi muito interessante aprender sobre estruturas de dados básicas. Estou empolgado para continuar estudando e praticar mais exercícios.',
      userId: user1.id,
    },
    {
      title: 'Desafio com recursividade',
      category: 'ESTUDO' as const,
      emotion: 'ANSIEDADE' as const,
      content:
        'Estou tendo dificuldades para entender recursividade. Preciso estudar mais exemplos e talvez pedir ajuda ao professor. É frustrante não conseguir resolver os exercícios na primeira tentativa.',
      userId: user1.id,
    },
    {
      title: 'Projeto em equipe',
      category: 'ESTUDO' as const,
      emotion: 'ALEGRIA' as const,
      content:
        'Começamos um projeto em equipe para desenvolver um sistema web. Estou animado para trabalhar com meus colegas e aplicar os conhecimentos que aprendi até agora.',
      userId: user1.id,
    },
    {
      title: 'Exercícios físicos',
      category: 'PESSOAL' as const,
      emotion: 'CALMA' as const,
      content:
        'Voltei a fazer exercícios regularmente. Sinto que isso está me ajudando a manter o foco nos estudos e a ter mais energia durante o dia.',
      userId: user1.id,
    },
    {
      title: 'Entrevista de estágio',
      category: 'ESTAGIO' as const,
      emotion: 'ANSIEDADE' as const,
      content:
        'Tenho uma entrevista de estágio na próxima semana. Estou nervoso, mas também empolgado. Preciso revisar os conceitos principais e preparar algumas perguntas sobre a empresa.',
      userId: user1.id,
    },

    // Reflexões da Maria
    {
      title: 'Início da pesquisa de TCC',
      category: 'PESQUISA' as const,
      emotion: 'MOTIVACAO' as const,
      content:
        'Comecei a pesquisar temas para meu TCC. Estou interessada em inteligência artificial aplicada à educação. Já encontrei alguns artigos interessantes que vou estudar mais profundamente.',
      userId: user2.id,
    },
    {
      title: 'Dificuldades com matemática',
      category: 'ESTUDO' as const,
      emotion: 'TRISTEZA' as const,
      content:
        'Estou tendo muita dificuldade com cálculo diferencial. Às vezes me sinto burra por não conseguir acompanhar a turma. Preciso buscar ajuda e não desistir.',
      userId: user2.id,
      createdAt: new Date('2024-03-06T20:30:00.000Z'),
    },
    {
      title: 'Grupo de estudos',
      category: 'ESTUDO' as const,
      emotion: 'ALEGRIA' as const,
      content:
        'Formamos um grupo de estudos para matemática. É incrível como estudar em grupo me ajuda a entender melhor os conceitos. Todos se ajudam e o ambiente é muito positivo.',
      userId: user2.id,
      createdAt: new Date('2024-03-08T15:45:00.000Z'),
    },
    {
      title: 'Primeira publicação científica',
      category: 'PESQUISA' as const,
      emotion: 'ALEGRIA' as const,
      content:
        'Meu artigo foi aceito em um congresso de iniciação científica! Estou muito feliz e orgulhosa. Todo o esforço valeu a pena. Agora preciso preparar a apresentação.',
      userId: user2.id,
      createdAt: new Date('2024-03-14T13:00:00.000Z'),
    },
    {
      title: 'Equilibrio vida-estudo',
      category: 'PESSOAL' as const,
      emotion: 'REFLEXAO' as const,
      content:
        'Tenho refletido sobre como equilibrar melhor minha vida pessoal com os estudos. Às vezes me dedico tanto à faculdade que esqueço de cuidar de outros aspectos da minha vida.',
      userId: user2.id,
      createdAt: new Date('2024-03-16T18:30:00.000Z'),
    },

    // Reflexões do Pedro
    {
      title: 'Primeiro dia de estágio',
      category: 'ESTAGIO' as const,
      emotion: 'ANSIEDADE' as const,
      content:
        'Hoje foi meu primeiro dia de estágio na empresa de desenvolvimento. Estou nervoso, mas animado. A equipe parece muito acolhedora e já me deram algumas tarefas interessantes.',
      userId: user3.id,
      createdAt: new Date('2024-03-04T08:30:00.000Z'),
    },
    {
      title: 'Aprendendo React',
      category: 'ESTUDO' as const,
      emotion: 'MOTIVACAO' as const,
      content:
        'Comecei a estudar React para o projeto do estágio. É uma biblioteca muito interessante e posso ver como é poderosa para criar interfaces interativas. Estou animado para aprender mais.',
      userId: user3.id,
      createdAt: new Date('2024-03-07T19:45:00.000Z'),
    },
    {
      title: 'Feedback do supervisor',
      category: 'ESTAGIO' as const,
      emotion: 'ALEGRIA' as const,
      content:
        'Recebi um feedback muito positivo do meu supervisor no estágio. Ele disse que estou me desenvolvendo bem e que minhas contribuições são valiosas. Isso me motiva muito!',
      userId: user3.id,
      createdAt: new Date('2024-03-11T17:20:00.000Z'),
    },
    {
      title: 'Desafio técnico',
      category: 'ESTAGIO' as const,
      emotion: 'REFLEXAO' as const,
      content:
        'Encontrei um bug complexo no sistema e passei o dia todo tentando resolvê-lo. Foi frustrante, mas também uma ótima oportunidade de aprendizado. Aprendi muito sobre debugging.',
      userId: user3.id,
      createdAt: new Date('2024-03-13T21:15:00.000Z'),
    },
    {
      title: 'Vida social na faculdade',
      category: 'PESSOAL' as const,
      emotion: 'CALMA' as const,
      content:
        'Participei de um evento da faculdade hoje. Foi legal conhecer pessoas de outros cursos e conversar sobre coisas diferentes dos estudos. É importante ter momentos assim.',
      userId: user3.id,
      createdAt: new Date('2024-03-17T22:00:00.000Z'),
    },

    // Mais algumas reflexões recentes
    {
      title: 'Preparação para prova',
      category: 'ESTUDO' as const,
      emotion: 'ANSIEDADE' as const,
      content:
        'Tenho uma prova importante na próxima semana. Estou estudando bastante, mas ainda me sinto inseguro. Vou fazer mais exercícios e revisar as anotações.',
      userId: user1.id,
      createdAt: new Date('2024-03-18T10:30:00.000Z'),
    },
    {
      title: 'Reunião com orientador',
      category: 'PESQUISA' as const,
      emotion: 'MOTIVACAO' as const,
      content:
        'Tive uma reunião produtiva com meu orientador. Ele aprovou minha proposta de pesquisa e me deu várias sugestões de bibliografia. Estou empolgada para começar os experimentos.',
      userId: user2.id,
      createdAt: new Date('2024-03-19T14:00:00.000Z'),
    },
    {
      title: 'Projeto pessoal',
      category: 'PESSOAL' as const,
      emotion: 'ALEGRIA' as const,
      content:
        'Comecei um projeto pessoal de desenvolvimento de um app mobile. É gratificante aplicar os conhecimentos em algo que criei do zero. Espero conseguir terminar nas próximas semanas.',
      userId: user3.id,
      createdAt: new Date('2024-03-20T16:45:00.000Z'),
    },
  ];

  // Inserir todas as reflexões
  for (const reflexao of reflexoesExemplo) {
    await prisma.reflection.create({
      data: reflexao,
    });
  }

  console.log('✅ Reflexões criadas com sucesso!');

  // Criar métricas do dashboard para cada usuário
  console.log('📊 Criando métricas do dashboard...');

  const semesterStart = new Date('2024-03-01T00:00:00.000Z');
  const currentWeek = Math.ceil(
    (Date.now() - semesterStart.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );

  for (const user of [user1, user2, user3]) {
    const userReflections = await prisma.reflection.count({
      where: { userId: user.id },
    });

    const lastReflection = await prisma.reflection.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const reflectionsThisWeek = await prisma.reflection.count({
      where: {
        userId: user.id,
        createdAt: {
          gte: thisWeekStart,
        },
      },
    });

    await prisma.dashboardMetrics.create({
      data: {
        userId: user.id,
        totalReflections: userReflections,
        currentWeek: currentWeek,
        reflectionsThisWeek: reflectionsThisWeek,
        lastReflectionAt: lastReflection?.createdAt,
        consecutiveDays: Math.floor(Math.random() * 7) + 1, // Valor aleatório para exemplo
        weekGrowth: Math.random() * 20 - 10, // Crescimento entre -10% e +10%
        semesterStart: semesterStart,
      },
    });
  }

  console.log('✅ Métricas do dashboard criadas com sucesso!');

  // Estatísticas finais
  const totalUsers = await prisma.user.count();
  const totalReflections = await prisma.reflection.count();
  const totalMetrics = await prisma.dashboardMetrics.count();

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log(`📊 Estatísticas:`);
  console.log(`   - Usuários criados: ${totalUsers}`);
  console.log(`   - Reflexões criadas: ${totalReflections}`);
  console.log(`   - Métricas criadas: ${totalMetrics}`);
  console.log('\n🔐 Dados de login para teste:');
  console.log('   Email: joao@exemplo.com | Senha: 123456');
  console.log('   Email: maria@exemplo.com | Senha: 123456');
  console.log('   Email: pedro@exemplo.com | Senha: 123456');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Erro durante o seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
