import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePostById, editPostById, getPostById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import { CategoryType, PostFormDataType, UserType } from '../types';


type EditPostProps = {
    flashMessage: (message:string, category:CategoryType) => void
    currentUser: UserType|null
}

export default function EditPost({ flashMessage, currentUser }: EditPostProps) {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [postToEditData, setPostToEditData] = useState<PostFormDataType>({title: '', body: ''})
    const [showModal, setShowModal] = useState(false);
    
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect( () => {
        async function getPost(){
            let response = await getPostById(postId!)
            if (response.data){
                setPostToEditData({title: response.data.title, body: response.data.body})
                const post = response.data
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
                if (!currentUser){
                    console.log(currentUser)
                }
                else if (currentUser?.id !== post.author.id){
                    flashMessage('You do not have permission to edit this post', 'danger')
                    navigate('/')
                }
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            }
            else {
                flashMessage('something went wrong', 'warning')
                navigate('/')
            }
        }

        getPost()
    }, [postId, currentUser] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostToEditData({...postToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editPostById(postId!, token, postToEditData)
        if (response.error){
            flashMessage(response.error, 'danger')
        }
        else{
            flashMessage(`${response.data?.title} has been updated`, 'success')
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deletePostById(postId!, token);
        if (response.error){
            flashMessage(response.error, 'danger')
        }
        else {
            flashMessage(response.data!, 'primary');
            navigate('/')
        }
    }

    return (
        <>
        <Card className='my-3'>
        <Card.Body>
          <h3 className='text-center'>Editing Post {postId}</h3>
          <Form onSubmit={handleFormSubmit}>
                <Form.Label>Post Title</Form.Label>
                <Form.Control name='title' placeholder='Enter New Post Title' value={postToEditData.title} onChange={handleInputChange} />
                <Form.Label>Post Body</Form.Label>
                <Form.Control as='textarea' name='body' placeholder='Enter New Post Body' value={postToEditData.body} onChange={handleInputChange} />
                <Button className='mt-3 w-50' variant='info' type='submit'>Edit Post</Button>
                <Button onClick={openModal} className='mt-3 w-50' variant='danger'>Delete Post</Button>
            </Form>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {postToEditData.title}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete {postToEditData.title}?
                This cannot be undone
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal} variant='secondary'>Close</Button>
                <Button onClick={handleDeleteClick} variant='danger'>Delete Post</Button>
            </Modal.Footer>
      </Modal>
      </>
  )
}