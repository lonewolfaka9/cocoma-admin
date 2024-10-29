import { prisma } from '@/lib/prisma';

export const getSessionByToken = async (sessionToken: string) => {
  const existingSession = await prisma.onlineUserSession.findFirst({
    where: {
      sessionId: sessionToken
    }
  });

  return {
    sessionId: existingSession?.sessionId,
    onlineUserId: existingSession?.onlineUserId
  };
};
