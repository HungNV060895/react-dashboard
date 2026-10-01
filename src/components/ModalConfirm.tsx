import { AlertTriangle, LoaderCircle, Trash2, X } from "lucide-react";
import { useEffect } from "react";

interface IConfirm {
	isConfirm: boolean;
	message: string;
	handleConfirmDelete: () => void;
	handleCancelDelete: () => void;
	isDeleting: boolean;
}

const ModalConfirm = ({ isConfirm, handleConfirmDelete, handleCancelDelete, isDeleting, message }: IConfirm) => {
	useEffect(() => {
		if (!isConfirm) return;
		const previousOverflow = document.body.style.overflow;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && !isDeleting) handleCancelDelete();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isConfirm, isDeleting, handleCancelDelete]);

	if (!isConfirm) return null;

	return (
		<div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-4">
			<button type="button" onClick={handleCancelDelete} disabled={isDeleting} aria-label="Close confirmation" className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" />
			<section role="dialog" aria-modal="true" aria-labelledby="confirm-delete-title" className="relative z-10 w-full rounded-t-2xl bg-white p-5 shadow-2xl sm:max-w-md sm:rounded-xl sm:p-6">
				<div className="flex items-start justify-between gap-4">
					<span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700"><AlertTriangle size={21} /></span>
					<button type="button" onClick={handleCancelDelete} disabled={isDeleting} aria-label="Close" className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"><X size={18} /></button>
				</div>
				<h2 id="confirm-delete-title" className="mt-4 text-lg font-semibold text-slate-900">Delete this item?</h2>
				<p className="mt-2 break-words text-sm leading-6 text-slate-600">{message}</p>
				<div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
					<button type="button" onClick={handleCancelDelete} disabled={isDeleting} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">Cancel</button>
					<button type="button" onClick={handleConfirmDelete} disabled={isDeleting} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-rose-700 px-4 text-sm font-semibold text-white transition hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-60">
						{isDeleting ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}
						{isDeleting ? "Deleting..." : "Delete"}
					</button>
				</div>
			</section>
		</div>
	);
};

export default ModalConfirm;