import { NextResponse } from 'next/server';
export async function GET() {
    try {
      const response = NextResponse.json({ 
        message: 'Logout successful', 
        success: true 
      }, { 
        status: 200 
      });
      
      response.cookies.set("authToken", "", { maxAge: 0, path: "/" });
      
      return response;
      
    } catch (error) {
      return NextResponse.json({ 
        error: 'Logout failed', 
        success: false 
      }, { 
        status: 500 
      });
    }
  }