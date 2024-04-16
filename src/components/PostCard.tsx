import { PostType } from "../types"
import { Card } from "react-bootstrap";

type PostCardProps = {
    post: PostType
}

export default function PostCard({ post }: PostCardProps) {
    console.log(post);
    return (
        <Card className="my-3 bg-custom" text="white">
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle>{ post.author.username}s</Card.Subtitle>
                <Card.Text>{ post.body }</Card.Text>
            </Card.Body>
        </Card>
  )
}
