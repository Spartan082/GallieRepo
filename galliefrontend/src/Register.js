import React, {useState} from 'react';

const  Register= () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
    console.log('submit button is pressed!')
    }

    return(
        <div>
        <form onSubmit={submitHandler}>
            <h5>Register</h5>
            name: <input type="text" value={name} onChange={event => setName(event.target.value)} /> <br/>
            email: <input type="text" value={email} onChange={event => setEmail(event.target.value)} /> <br/>
            username: <input type="text" value={username} onChange={event => setUsername(event.target.value)} /> <br/>
            password: <input type="password" value={password} onChange={event => setPassword(event.target.value)} /> <br/>
            <input types="submit" value="Register" />
        </form>
        </div>
    )

}

export default Register;