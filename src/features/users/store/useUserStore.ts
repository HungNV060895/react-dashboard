import { create } from "zustand";
import type { User } from "@features/users/types/user";

type UserRole = User["role"] | "All";
type UserStatus = User["status"] | "All";

interface UserStore {
	page: number;
	search: string;
	role: UserRole;
	status: UserStatus;
	isFormOpen: boolean;
	userToEdit: User | null;
	userToDelete: User | null;
	setPage: (page: number) => void;
	setSearch: (search: string) => void;
	setRole: (role: UserRole) => void;
	setStatus: (status: UserStatus) => void;
	openForm: (user?: User) => void;
	closeForm: () => void;
	requestDelete: (user: User) => void;
	cancelDelete: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
	page: 1,
	search: "",
	role: "All",
	status: "All",
	isFormOpen: false,
	userToEdit: null,
	userToDelete: null,

	// Sets the active page for the users query.
	setPage: (page) => set({ page }),
	// Updates the search term and returns pagination to the first page.
	setSearch: (search) => set({ search, page: 1 }),
	// Updates the role filter and returns pagination to the first page.
	setRole: (role) => set({ role, page: 1 }),
	// Updates the status filter and returns pagination to the first page.
	setStatus: (status) => set({ status, page: 1 }),
	// Opens the form for creating a user or editing the provided user.
	openForm: (user = undefined) => set({ isFormOpen: true, userToEdit: user ?? null }),
	// Closes the form and clears the selected user.
	closeForm: () => set({ isFormOpen: false, userToEdit: null }),
	// Opens the delete confirmation for the selected user.
	requestDelete: (user) => set({ userToDelete: user }),
	// Closes the delete confirmation and clears the selected user.
	cancelDelete: () => set({ userToDelete: null }),
}));
