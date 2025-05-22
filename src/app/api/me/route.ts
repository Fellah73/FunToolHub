// app/api/me/route.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { db } from '@/app/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    
    if (!token) {
      return Response.json({ error: 'No token' , success: false }, { status: 401 });
    }
   
    // Vérifier et décoder le token
    const payload = jwt.verify(token, process.env.AUTH_SECRET_KEY!) as any;
    
    const user = await db.user.findUnique({ where: { email: payload.email } }); 
    
    if (!user) {
      return Response.json({ error: 'User not found', success: false }, { status: 404 });
    }
    
    return Response.json({ user : user, success: true });
    
  } catch (error) {
    return Response.json({ error: 'Invalid token', success: false }, { status: 401 });
  }
}