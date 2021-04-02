import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
    const { body, createdAt, id, username, likeCount, commentCount, likes } = post;

    function likePost() {
        console.log('Liked post');
    }
    
    function commentPost() {
        console.log('Commented on post');
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image float="right" size="mini" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='teal' basic>
                        <Icon name='heart' />
                    </Button>
                    <Label basic color='teal' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={commentPost}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard;
