
import { Outlet } from 'react-router-dom'
import Header from '@components/layouts/Header'
import Sidebar from '@components/layouts/Sidebar'
import Breadcrumb from './components/layouts/Breadcrumb'
import { DocsBotChat } from './components/DocsBotChat'
import { useState } from 'react'

function App() {
	const [isOpen, setIsOpen] = useState(true);
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const onToggle = () => {
		if (window.matchMedia('(min-width: 1024px)').matches) {
			setIsOpen((previous) => !previous);
		} else {
			setIsMobileNavOpen((previous) => !previous);
		}
	};
	const closeMobileNav = () => setIsMobileNavOpen(false);

	return (
		<>
			<div className="flex min-h-dvh bg-slate-50 text-slate-900 dark:bg-main dark:text-slate-100">
				{isMobileNavOpen && (
					<button
						type="button"
						aria-label="Close navigation menu"
						onClick={closeMobileNav}
						className="fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
					/>
				)}
				<Sidebar
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					mobileOpen={isMobileNavOpen}
					onNavigate={closeMobileNav}
				/>
				<main className="min-w-0 flex-1">
					<Header onToggle={onToggle} />
					<div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
						<Breadcrumb />
					</div>
					<div className="wrapper relative mx-auto w-full max-w-[1600px] px-4 pb-10 sm:px-6 lg:px-8">
						<Outlet />
					</div>
				</main>
			</div>
			<DocsBotChat />
		</>
	)
}

export default App
