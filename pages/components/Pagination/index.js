import List from './List';
export default function index({ result, changeHandler}) {
    
    return (
            <ul className={`pagination py-3 justify-content-center`}>
                {(result.hasPreviousPage)?<li className="page-item"><a className="page-link" role="button" onClick={changeHandler.bind(this, result.previousPage)}>Previous</a></li>
                :<li className="page-item disabled"><a className="page-link" role="button">Previous</a></li>}

                <List cur_page={result.currentPage} hasNext={result.hasNextPage} lastPage={result.lastPage} changeHandler={changeHandler}/>
                

                {(result.hasNextPage)?<li className="page-item"><a className="page-link" role="button"  onClick={changeHandler.bind(this, result.nextPage)}>Next</a></li>
                :<li className="page-item disabled"><a className="page-link" role="button">Next</a></li>}
            </ul>
    )
} 
