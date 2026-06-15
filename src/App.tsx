
import { Outlet, BrowserRouter  } from 'react-router-dom'
import Header from '@components/layouts/Header'
import Footer from '@components/layouts/Footer'
import Sidebar from '@components/layouts/Sidebar'

function App() {
	return (
		<>
			<Header />
			<div className='flex'>
				<Sidebar />
				<main className='flex-1 p-6 bg-slate-100'>
					Main Content
				</main>
			</div>
			<Footer />
		</>
	)
}

export default App
