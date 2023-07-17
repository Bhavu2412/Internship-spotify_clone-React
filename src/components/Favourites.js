import React from 'react';
import { Button, Card } from 'react-bootstrap';
export default function Favourites({favourites , choice}){
  console.log(favourites);
    return(
        <>
        <h1>Here comes favourites</h1>
        {favourites.map((item)=>{
            const uri = item.uri;
          const trackId = uri.split(':')[2];
          const trackUrl = `https://open.spotify.com/${choice.slice(0,-1)}/${trackId}`;
          console.log(trackId);
           return (<>
               
              <Card style={{ width: '18rem' }} key={trackId}>
                
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {
    
                    }
                  </Card.Text>
                  {<hr />}
                  <Button variant="primary">Add to Playlist</Button>{'  '}
                  
                  <Card.Link href={trackUrl} >MusicLink</Card.Link>
                </Card.Body>
              </Card>
              </>
            );
          })}
          </>
    )
}