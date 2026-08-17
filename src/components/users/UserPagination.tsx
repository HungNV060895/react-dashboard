interface UserPaginationProps {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    onPageChange: (page: number) => void;
}


const UserPagination = ({ currentPage, totalPages, startIndex, onPageChange} : UserPaginationProps) => {
    return (
        <>
            <div className="flex justify-between items-center px-4 py-3">
                <div className="text-sm text-slate-500">
                Showing <b>{startIndex + 1}-{Math.min(startIndex + 2, totalPages * 2)}</b> of {totalPages * 2}
                </div>
                <div className="flex space-x-1">
                    <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button 
                            key={index} 
                            onClick={() => onPageChange(index + 1)}
                            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal rounded transition duration-200 ease ${
                                currentPage === index + 1 
                                    ? 'bg-blue-500 text-white border border-blue-500' 
                                    : 'text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-400'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserPagination;