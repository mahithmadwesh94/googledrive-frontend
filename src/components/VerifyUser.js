/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { SAVETOKEN, store } from '../store';
import axios from 'axios';

function VerifyUser(props) {
    const [show, setShow] = useState(false);

    let history = useHistory();
    console.log(props.match.params.route)
    useEffect(() => {
        if (props.match.params.route === 'verifyUser') {
            if (props.match.params.token) {
                axios.get(`${process.env.REACT_APP_USER_API_URL}/${props.match.params.route}/${props.match.params.token}`).then(response => {
                    console.log(response.data)
                    if (response.data) {
                        store.dispatch({ type: SAVETOKEN, token: response.data.token })
                        setShow(true)
                        toast.success("Verification Success. Redirecting to login", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                })
                    .catch(err => {
                        console.log(err.response)
                        toast.error(err.response.data.message + '. Redirecting to login', {
                            position: toast.POSITION.TOP_CENTER
                        })
                    }
                    )





            } else {
                toast.success("Invalid Link. Redirecting to login", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
            setTimeout(() => {
                history.replace('/login')
            }, 5000)

        } else if (props.match.params.route === 'resetPassword') {
            console.log('coming here')
            axios.get(`${process.env.REACT_APP_USER_API_URL}/verifyUser/${props.match.params.token}`).then(response => {
                console.log(response.data)
                if (response.data) {
                    store.dispatch({ type: SAVETOKEN, token: props.match.params.token })
                    console.log(store.getState())
                    setShow(true);
                    toast.success("Verification Success. Redirecting to New Passowrd", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    setTimeout(() => {
                        history.replace('/resetPassword/newPassword')
                    }, 5000)

                }
            }).catch(err => {
                console.log(err)
                toast.error(err.response.data.message + '. Redirecting to login', {
                    position: toast.POSITION.TOP_CENTER
                })
            })


        }




    }, [])
    return (
        <div>
            {show && (
                <><h1>Verification Success</h1>
                </>)}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default VerifyUser
