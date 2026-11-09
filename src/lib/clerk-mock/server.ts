export type MockUserRole = "admin" | "teacher" | "student" | "parent";

export function getRole(): { role: MockUserRole; userId: string } {
  return { role: "admin", userId: "admin1" };
}

export const auth = () => {
  const { role, userId } = getRole();
  return {
    userId,
    sessionId: "mock-session-id",
    sessionClaims: {
      metadata: {
        role,
      },
    },
    protect: () => {},
  };
};

export const currentUser = async () => {
  const { role, userId } = getRole();
  return {
    id: userId,
    firstName: "Admin",
    lastName: "User",
    imageUrl: "/avatar.png",
    publicMetadata: {
      role,
    },
  };
};

export const clerkClient = {
  users: {
    createUser: async (params: any) => {
      return {
        id: params?.publicMetadata?.role
          ? `${params.publicMetadata.role}_${Date.now()}`
          : `user_${Date.now()}`,
        username: params.username,
        firstName: params.name,
        lastName: params.surname,
      };
    },
    updateUser: async (id: string, params: any) => {
      return {
        id,
        ...params,
      };
    },
    deleteUser: async (id: string) => {
      return { id };
    },
  },
};

export const createRouteMatcher = (routes: string[]) => {
  return (req: any) => {
    return routes.some((r) => req?.nextUrl?.pathname?.startsWith(r.replace("(.*)", "")));
  };
};

export const clerkMiddleware = (handler?: any) => {
  return (req: any) => {
    if (handler) {
      return handler(auth, req);
    }
  };
};
