export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  address?: {
    city?: string;
    country?: string;
  };
};

export type JobPost = {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary?: number;
  jobType?: string;
  skills?: string[];
  experience?: string;
  deadline?: string;
  status?: string;
  employer?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt?: string;
};

export const AUTH_STORAGE_KEY = "jobbase-auth";

export type AuthState = {
  token: string;
  user: User;
};

export const getStoredAuth = (): AuthState | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthState) : null;
  } catch {
    return null;
  }
};

export const setStoredAuth = (auth: AuthState | null) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!auth) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const auth = getStoredAuth();
  const headers: HeadersInit = {
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>) ["Content-Type"] = "application/json";
  }

  if (auth?.token) {
    (headers as Record<string, string>).Authorization = `Bearer ${auth.token}`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof payload === "string"
        ? payload
        : payload?.message || "Request failed"
    );
  }

  return payload as T;
}

export async function getJobs(): Promise<{ count: number; jobPosts: JobPost[] }> {
  return request("/api/jobs");
}

export async function loginUser(payload: {
  email: string;
  password: string;
}): Promise<{ message: string; token: string; user: User }> {
  return request("/api/users/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: string;
}): Promise<{ user: User }> {
  return request("/api/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function forgotPasswordRequest(email: string): Promise<{ message: string; resetToken?: string }> {
  return request("/api/users/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function updateUserProfile(
  userId: string,
  payload: Partial<User> & { address?: Record<string, string> }
): Promise<{ user: User }> {
  return request(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
