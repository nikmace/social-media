import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Icon, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql/graphql';

function DeleteButton({ postId, callback }) {
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: data.getPosts.filter(post => post.id !== postId)} })
            if (callback) callback();
        },
        variables: {
            postId
        }
    })

    return (
        <>
            <Button as='div' color='red' floated="right" onClick={() => setConfirmOpen(true)}>
                <Icon name='trash' style={{margin: 0}}/>
            </Button>
            <Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePost} />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton;