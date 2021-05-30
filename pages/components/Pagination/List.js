
export default function List(props) {
    let page ,j = 1, NavList = [];

    j = ((Math.ceil((4 + (props.cur_page-4))/4)-1)*4)+1;
    page = (Math.ceil((4 + props.cur_page)/4)-1)*4;

    
    if(page > props.lastPage){
        while(page > props.lastPage){
            page -= 1;
        }
    }

    for (let i = j; i <= page; i++) {
        NavList[i] = <li className="page-item"><a className="page-link" role="button" onClick={props.changeHandler.bind(this ,i)}>{i}</a></li>
    }
    return (NavList)
} 