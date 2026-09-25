
import { Outlet } from 'react-router-dom'
import Header from '@components/layouts/Header'
import Sidebar from '@components/layouts/Sidebar'
import { DocsBotChat } from './components/DocsBotChat'
import { useState } from 'react'

function App() {
	const [isOpen, setIsOpen] = useState<boolean>(true);
	const onToggle = () => {
		setIsOpen(prev => !prev);
	}
	return (
		<>
			<div className='flex h-screen overflow-hidden'>
				<Sidebar isOpen={isOpen} />
				<main className='flex-1 bg-slate-100 dark:bg-main overflow-y-auto overflow-x-hidden'>
					<Header onToggle={onToggle} />
					<div className='wrapper relative'>
						<Outlet />
					</div>
				</main>
			</div>
			<DocsBotChat />
		</>
	)
}

export default App
