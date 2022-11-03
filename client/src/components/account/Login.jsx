import { useState, useContext } from 'react';

import { box, TextField, Button, styled ,Typography} from '@mui/material'

import { Box, margin } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';




const Component = styled(Box)`
     margin:auto;
     width:400px;
     box-shadow:6px 6px 6px 6px rgb(0 0 0/0.5);
    
`

const Image = styled('img')({
    display: 'flex',
    margin: 'auto',
    width: "100px",
    padding: '25px 0 0'



});


const SignupButton = styled(Button)`
margin: 10px 0px;
background:#FB641B;
color:#FFFFFF;


`
const LoginButton = styled(Button)`
margin: 10px 0px;
background:#006400;
color:#FFFFFF;

`

const Wrapper = styled(Box)`
padding:25px 25px;

display:flex;


flex-direction:column;

`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
//you can add inline css like this also
const x = {
    margin: '10px 0px',
    // texttransform : None
};
const y = {
    margin: '10px auto'

};

const signupInitialValues = {
    name: "",
    username: "",
    password: ""


}
const loginInitialValues = {
    username: '',
    password: ''
};


const Login = ({isUserAuthenticated}) => {


    const imageURL = 'https://aspirestudy.in/notifications/amu2020/amulogo.png';
    const [account, toggleAccount] = useState("login");
    const { setAccount } = useContext(DataContext);
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const navigate = useNavigate();
    const toggleSignup = () => {


        account === "login" ? toggleAccount('signup') : toggleAccount('login');

    }

    const onInputChnage = (e) => {
        // ...this will append the values in the signup and [e.target.name ] this will give usename,passs,username
        setSignup({ ...signup, [e.target.name]: e.target.value })


    }
    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
             navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser =  async () =>{
        let response = await API.userSignup(signup);
        
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt='Login' />
                {
                    account === "login" ?
                        <Wrapper>
                            <TextField variant='standard' style={x} value={login.username} onChange={(e) => onValueChange(e)} name='username'  label="Enter username" />
                            <TextField variant='standard' style={x} value={login.password} onChange={(e) => onValueChange(e)} name='password' label="Enter password" />
                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                            <p style={y}>OR</p>
                            <SignupButton variant='contained' onClick={() => toggleSignup()}>Create New Account</SignupButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant='standard' onChange={(e) => onInputChnage(e)} style={x} name="name" label="Enter your name" />
                            <TextField variant='standard' onChange={(e) => onInputChnage(e)} style={x} name="username" label="Enter username" />
                            <TextField variant='standard' onChange={(e) => onInputChnage(e)} style={x} name="password" label="Enter password" />
                            {error && <Error>{error}</Error>}
                            
                            <SignupButton variant='contained' onClick={() => signupUser()} >Sign up</SignupButton>
                            <p style={y}>OR</p>
                            <LoginButton variant='contained' onClick={() => toggleSignup()} >Already have an Account</LoginButton>
                        </Wrapper>
                }
            </Box>

        </Component>

    )

}

export default Login;