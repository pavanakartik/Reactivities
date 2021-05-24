import * as React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment , Image, Button} from 'semantic-ui-react';

export default function HomePage() {
    return (


        <Segment inverted textAlign='center' vertical className='masthead'>

            <Container>
                <Header as='h1' inverted>
<Image size= 'massive' src='/assets/logo.png' style={{marginBottom: 12}} />
               
               React Activities
                </Header>

                <Header as ='h2' invertedContent='Welcome to React Activities'>


<Button as ={Link} to='/activities' size='huge' inverted>


    Take me to the Activities
</Button>






                </Header>

            </Container>

        </Segment>
    )
}