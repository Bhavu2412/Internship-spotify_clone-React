import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Cards({trackId , item , trackUrl , handleOnClick , handlePlaylist , play}){
    return(
        <>   
            <Card style={{ width: '18rem' }} key={trackId} >
              <Card.Body>
                <Card.Title>{item.data.name}</Card.Title>
                <Card.Img variant="top" src="https://picsum.photos/200?blur=4"/>
                <Card.Text>
                  {
                  }
                </Card.Text>
                {<hr />}
                <Button variant="primary" onClick={()=>handlePlaylist(item)}>{!play? 'Add to playlist':'Remove'}</Button>{'  '}
                <Button variant="primary" onClick={()=> handleOnClick(item)}><FontAwesomeIcon icon={faStar}  /></Button>{'  '}
                <Card.Link href={trackUrl} >MusicLink</Card.Link>
              </Card.Body>
            </Card>
            </>
    )
}