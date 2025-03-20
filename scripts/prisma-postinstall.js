const { execSync } = require('child_process');

try {
  console.log('🔄 Running Prisma Generate...');
  
  // Run prisma generate
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.error('❌ Error generating Prisma client:', error);
  process.exit(1);
} 