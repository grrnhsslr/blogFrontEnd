import { Card, Form, Button } from "react-bootstrap";
import { UserFormDataType } from "../types";
import { useState } from "react";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { register } from "../lib/apiWrapper";


type SignUpProps = {}

export default function SignUp({}: SignUpProps) {

  const [UserFormData, setUserFormData] = useState<UserFormDataType>(
    {
      firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
  }
)

const [seePassword, setSeePassword] = useState(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...UserFormData, [e.target.name]: e.target.value})
}

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(UserFormData);

        let response = await register(UserFormData);
        if (response.error){
          console.error(response.error);
        }
        else {
          let newUser = response.data!;
          console.log(`Congrats ${newUser.firstName} ${newUser.lastName} has been creaetd with the username ${newUser.username}`)
        }
    }

    // how to make a password require capital letter lowercase letters and special chars
    // const disableSubmit = !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*\!\?])(?=.*[a-zA-Z]).{8,16}$/.test(UserFormData.password) || UserFormData.password !== UserFormData.confirmPassword;
    const disableSubmit = UserFormData.password.length < 5 || UserFormData.password !== UserFormData.confirmPassword

  return (
    <>
            <h1 className="text-center">Sign Up Here</h1>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label htmlFor='firstName'>First Name</Form.Label>
                        <Form.Control id='firstName' name='firstName' placeholder='Enter First Name' value={UserFormData.firstName} onChange={handleInputChange}/>

                        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                        <Form.Control id='lastName' name='lastName' placeholder='Enter Last Name' value={UserFormData.lastName} onChange={handleInputChange}/>

                        <Form.Label htmlFor='email'>Email</Form.Label>
                        <Form.Control id='email' name='email' type='email' placeholder='Enter Email' value={UserFormData.email} onChange={handleInputChange}/>

                        <Form.Label htmlFor='username'>Username</Form.Label>
                        <Form.Control id='username' name='username' placeholder='Enter Username' value={UserFormData.username} onChange={handleInputChange}/>

                        <Form.Label htmlFor='password'>Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='password' name='password' type={seePassword ? 'text' : 'password'} placeholder='Enter Password' value={UserFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
                        <InputGroup>
                            <Form.Control id='confirmPassword' name='confirmPassword'  type={seePassword ? 'text' : 'password'} placeholder='Confirm Password' value={UserFormData.confirmPassword} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className={seePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></InputGroup.Text>
                        </InputGroup>

                        <Button type='submit' variant='outline-primary' className='w-100 mt-3' disabled={disableSubmit}>Create New User</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
  )
}