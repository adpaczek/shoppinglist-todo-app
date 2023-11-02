import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'


const ListItem = ({list}) => {
    return (
      <div className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{list.title}</p>
          <ProgressBar/>

        </div>
      </div>
    );
  }
  
  export default ListItem;
  