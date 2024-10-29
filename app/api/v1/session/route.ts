import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';
export async function GET(request: Request) {
  // generate new session token
  const sessionToken = uuid();

  const sessionInfo = {
    session_token: sessionToken
  };

  return NextResponse.json(sessionInfo);
}
