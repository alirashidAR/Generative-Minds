import React from "react";
import Header from './layout/header';

function Register () {
    return (
        <div>
            <Header/>
        <div class="d-flex justify-content-center align-items-center bg-light vh-100">
            <div class="bg-white p-3 rounded w-25">
                <h2> Sign Up </h2>
                <form>
                    <div class="mb-3">
                        <label htmlFor="username" class="form-label"><strong>
                            Username 
                        </strong></label>
                        <input type="text" class="form-control rounded-0" id="username" placeholder="Enter username" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="email" class="form-label"><strong>
                            Email 
                        </strong></label>
                        <input type="email" class="form-control rounded-0" id="email" placeholder="Enter email" />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="password" class="form-label"><strong>
                            Password 
                        </strong></label>
                        <input type="password" class="form-control rounded-0" id="password" placeholder="Enter password" />
                    </div>
                    <button type="submit" class="btn btn-success w-100 rounded-0"> Sign Up </button>
                    <button className='btn btn-default border w-100 bg-light rounded-0 mt-10'> Log in </button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Register;