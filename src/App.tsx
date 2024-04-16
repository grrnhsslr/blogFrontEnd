// import React from 'react';
import { useState } from 'react';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Post = {
    id: number,
    title: string
}

type Sorting = {
    idAsc: (a: Post, b:Post) => number,
    idDesc: (a: Post, b:Post) => number,
    titleAsc: (a: Post, b:Post) => number,
    titleDesc: (a: Post, b:Post) => number,
}

export default function App(){
    const firstName: string = 'Brian';
    const lastName: string = 'Stanton';
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const posts: {id:number, title:string}[] = [
    //     {id: 1, title: 'Happy Monday'},
    //     {id: 2, title: 'React Rules!'},
    //     {id: 3, title: 'Spring has Sprung'}
    // ]

    const [posts, setPosts] = useState<Post[]>([
        {id: 1, title: 'Happy Monday'},
        {id: 2, title: 'React Rules!'},
        {id: 3, title: 'Spring has Sprung'},
        {id: 4, title: 'another post'},
        {id: 5, title: 'its CHEWSDAY INNIT'}
    ])

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        
        const sortFunctions:Sorting = {
            idAsc: (a:Post, b:Post) => a.id - b.id,
            idDesc: (a:Post, b:Post) => b.id - a.id,
            titleAsc: (a:Post, b:Post) => a.title > b.title ? 1 : -1,
            titleDesc: (a:Post, b:Post) => b.title > a.title ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...posts].sort(func);
        setPosts(newSortedArr);
    }

    const handleClick = () => {
        // console.log('The button has been clicked');
        setIsLoggedIn(!isLoggedIn);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    // how to display the navbar without the Navigation.tsx

    // return React.createElement(React.Fragment, {}, React.createElement(Navigation, { isLoggedIn }, undefined), React.createElement(Container, {}, React.createElement('h1', {}, 'Hello World')))

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Container>
                <h1>Hello World</h1>
                <Button className='my-5' variant='primary' onClick={handleClick}>Click Me!</Button>
                <h2>{isLoggedIn ? `Welcome Back ${firstName} ${lastName}` : 'Please Log In or Sign Up'}</h2>
                <Row>
                    <Col xs={12} md={8}>
                        <Form.Control value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Select onChange={handleSelectChange}>
                            <option>Choose Sorting Option</option>
                            <option value="idAsc">Sort By ID ASC</option>
                            <option value="idDesc">Sort By ID DESC</option>
                            <option value="titleAsc">Sort By Title ASC</option>
                            <option value="titleDesc">Sort By Title DESC</option>
                        </Form.Select>
                    </Col>
                </Row>
                {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <h4 key={p.id}>{p.title}</h4> )}
            </Container>
        </>
    )
}