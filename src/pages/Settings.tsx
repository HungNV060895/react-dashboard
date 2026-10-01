import { Building2, Check, Fingerprint, Globe2, Mail, ShieldCheck, UserRound } from "lucide-react";
import Themes from "@/components/layouts/Themes";

const Settings = () => {
	return (
			<section className="space-y-5 py-5 sm:py-7">
				<div>
					<p className="mb-1 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-300">Workspace</p>
					<h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">Settings</h1>
					<p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">Manage your account and workspace preferences.</p>
				</div>

				<div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
					<section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
						<div className="border-b border-slate-100 px-5 py-4 dark:border-slate-700 sm:px-6">
							<h2 className="text-base font-semibold text-slate-900 dark:text-white">Account profile</h2>
							<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your administrator account details.</p>
						</div>
						<div className="divide-y divide-slate-100 dark:divide-slate-700">
							<div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><UserRound size={16} /> Full name</span><span className="text-sm font-medium text-slate-800 dark:text-slate-200">Hung NV</span></div>
							<div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Mail size={16} /> Email address</span><span className="break-all text-sm font-medium text-slate-800 dark:text-slate-200">hungnv@admin.com</span></div>
							<div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"><span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><ShieldCheck size={16} /> Access level</span><span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-400/10 dark:text-teal-300"><Check size={13} /> Administrator</span></div>
						</div>
					</section>

					<div className="space-y-5">
						<section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
							<div className="flex items-start justify-between gap-4">
								<div>
									<h2 className="text-base font-semibold text-slate-900 dark:text-white">Appearance</h2>
									<p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">Choose the color mode for this dashboard.</p>
								</div>
								<Themes />
							</div>
						</section>

						<section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-6">
							<h2 className="text-base font-semibold text-slate-900 dark:text-white">Workspace details</h2>
							<div className="mt-4 space-y-4">
								<div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300"><Building2 size={17} /></span><div className="min-w-0"><p className="text-xs text-slate-500 dark:text-slate-400">Workspace</p><p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">Northstar Admin</p></div></div>
								<div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-800 dark:bg-sky-400/10 dark:text-sky-300"><Globe2 size={17} /></span><div className="min-w-0"><p className="text-xs text-slate-500 dark:text-slate-400">Region</p><p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">Vietnam · ICT (UTC+7)</p></div></div>
								<div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-teal-50 text-teal-800 dark:bg-teal-400/10 dark:text-teal-300"><Fingerprint size={17} /></span><div className="min-w-0"><p className="text-xs text-slate-500 dark:text-slate-400">Account status</p><p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Active</p></div></div>
							</div>
						</section>
					</div>
				</div>
			</section>
	)
}

export default Settings;