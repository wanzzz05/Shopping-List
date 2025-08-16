import {useState} from "react";
import {signUp} from "../Api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [form, setForm] =useState({name:"", email:"", password: ""});
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({...form, [e.target.name]: e.taget.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(form);
            alert("Signup successful");
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.msg || "Error");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" onChange={handleChange} required/>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              />
              <input 
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
                />
                <div>
                    <button type="submit">Signup</button>
                    <p>Already have an accout? <Link to="/">Sign In</Link></p>
                </div>
        </form>
    );
};