
export const userKeys = {
	all: ["users"] as const,
	lists: () => [
		...userKeys.all,
		"list"
	],
	list: (params: any) => [
		...userKeys.lists(),
		params
	]
}