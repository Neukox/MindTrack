// Script de teste para verificar configuração de email
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmailConfig() {
  console.log('🔍 Testando configuração de email...');
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log(
    'EMAIL_PASS:',
    process.env.EMAIL_PASS ? '[CONFIGURADO]' : '[NÃO CONFIGURADO]',
  );

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('❌ Credenciais de email não configuradas!');
    console.error('Configure EMAIL_USER e EMAIL_PASS no arquivo .env');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 75000,
  });

  try {
    console.log('🔌 Testando conexão SMTP...');
    await transporter.verify();
    console.log('✅ Conexão SMTP funcionando!');

    // Teste de envio (opcional)
    console.log(
      '📧 Você quer testar o envio de email? (pressione Ctrl+C para cancelar)',
    );
    setTimeout(async () => {
      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_USER,
          subject: 'Teste MindTrack',
          html: '<h1>Email funcionando!</h1><p>Sistema MindTrack configurado corretamente.</p>',
        });
        console.log('✅ Email de teste enviado:', info.messageId);
      } catch (error) {
        console.error('❌ Erro ao enviar email:', error.message);
      }
    }, 3000);
  } catch (error) {
    console.error('❌ Erro na conexão SMTP:', error.message);
    console.error('');
    console.error('💡 Possíveis soluções:');
    console.error(
      '1. Verifique se EMAIL_PASS é a senha de app do Gmail (16 caracteres)',
    );
    console.error('2. Confirme que a verificação em duas etapas está ativada');
    console.error('3. Tente gerar uma nova senha de app');
    console.error('4. Verifique sua conexão com internet');
  }
}

testEmailConfig();
