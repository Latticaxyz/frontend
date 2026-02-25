import { usePrivy } from "@privy-io/react-auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ApiError, api } from "@/lib/api";
import type { User } from "@/types";

export function useAuthUser() {
	const { authenticated, user: privyUser } = usePrivy();
	const queryClient = useQueryClient();

	const {
		data: user,
		error,
		isLoading: isFetching,
	} = useQuery({
		queryKey: ["user", "me"],
		queryFn: async () => {
			try {
				return await api.get<User>("/users/me");
			} catch (err) {
				if (err instanceof ApiError && err.status === 404) {
					return null;
				}
				throw err;
			}
		},
		enabled: authenticated,
		retry: false,
	});

	const createUser = useMutation({
		mutationFn: (payload: { name: string; email: string }) =>
			api.post<User>("/users", payload),
		onSuccess: (newUser) => {
			queryClient.setQueryData(["user", "me"], newUser);
		},
	});

	const { mutate, isPending: isCreating, isError } = createUser;

	useEffect(() => {
		if (user === null && privyUser && !isCreating && !isError) {
			const email =
				privyUser.email?.address ??
				privyUser.google?.email ??
				privyUser.twitter?.username ??
				"unknown";
			const name = privyUser.google?.name ?? email.split("@")[0];

			mutate({ name, email });
		}
	}, [user, privyUser, isCreating, isError, mutate]);

	return {
		user: user ?? createUser.data ?? undefined,
		isLoading: isFetching || isCreating,
		error: error ?? createUser.error ?? undefined,
	};
}
