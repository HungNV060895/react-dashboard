import { User } from "@/types/user";
import { LuUser } from "react-icons/lu";

const CurrentUser = ({ currentUsers }: { currentUsers: User[] }) => {
	return (
		<>
		<div>
		<h2 className="text-2xl text-slate-950 dark:text-white mb-5"><LuUser className="inline-block relative bottom-1" /> Current User</h2>
			<div className="overflow-x-auto mb-12 rounded-xl border border-[#1F2937] ">
				<table className="min-w-full dark:text-white border-none">
				<tbody className="divide-y divide-[#1F2937]">
							{
								currentUsers.map((item, index) => (
									<tr key={item.id}>
										<td className="px-4 py-2">
											{item.name}
											<span className="block text-sm font-thin text-[#94A3B8]">{item.email}</span>
										</td>
										<td className="px-4 py-2">{item.role}</td>
										<td className="px-4 py-2">
											<span className="bg-[#10b9814d] px-3 py-1 rounded-md text-sm">{item.status}</span>
										</td>
									</tr>
								))
							}
						</tbody>
					</table>
			</div>
		</div>
			
		</>
	)
}

export default CurrentUser;