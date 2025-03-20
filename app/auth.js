import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// Auth utils for server components
export async function getSession() {
  return await getServerSession();
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Auth middleware helpers
export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/signin');
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/signin');
  }
  
  return user;
} 