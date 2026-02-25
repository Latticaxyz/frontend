import { getAccessToken } from "@privy-io/react-auth";

const BASE_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
	constructor(
		public status: number,
		public body: unknown,
	) {
		super(`API error ${status}`);
	}
}

async function getToken(): Promise<string> {
	const token = await getAccessToken();
	if (!token) {
		throw new ApiError(401, { message: "No access token" });
	}
	return token;
}

async function request<T>(
	path: string,
	options: RequestInit = {},
	isRetry = false,
): Promise<T> {
	const token = await getToken();

	const response = await fetch(`${BASE_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			...options.headers,
		},
	});

	if (response.status === 401 && !isRetry) {
		return request<T>(path, options, true);
	}

	if (!response.ok) {
		const body = await response.json().catch(() => null);
		throw new ApiError(response.status, body);
	}

	return response.json() as Promise<T>;
}

export const api = {
	get: <T>(path: string) => request<T>(path),

	post: <T>(path: string, body: unknown) =>
		request<T>(path, {
			method: "POST",
			body: JSON.stringify(body),
		}),

	patch: <T>(path: string, body: unknown) =>
		request<T>(path, {
			method: "PATCH",
			body: JSON.stringify(body),
		}),
};

export { ApiError };
