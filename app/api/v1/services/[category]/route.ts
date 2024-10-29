import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  

  

  const responseResult = {
  
  };

  return NextResponse.json(responseResult);
}
