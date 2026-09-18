
import { Outlet } from 'react-router-dom'
import Header from '@components/layouts/Header'
import Sidebar from '@components/layouts/Sidebar'

function App() {
	return (
		<>

			<div className='flex h-screen overflow-hidden'>
				<Sidebar />
				<main className='flex-1 bg-slate-100 dark:bg-main overflow-y-auto overflow-x-hidden'>
					<Header />
					<div className='wrapper relative'>
						<Outlet />
					</div>
				</main>
			</div>
		</>
	)
}

export default App
