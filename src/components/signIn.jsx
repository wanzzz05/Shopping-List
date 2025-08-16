import { useState } from "react";
import { signIn } from "../Api";
import {useNavigate, Link} from "react-router-dom";
import { useFormState } from "react-dom";

export default function Signin() {
    const [form, setForm] = useFormState({ email:"", password:""});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handelChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const ddata = await signIn(form);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user.id);
        navigate("/home");
        // optionally redirect or update auth state
      } catch (err) {
        alert(err?.response?.data?.msg || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handelChange}
            required
            />
            <input
            name = "password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handelChange}
            required
            />
            <div>
                <button type= "submit" disabled={loading}>
                    {loading ? "Loggin in..." : "Login"}
                </button>
                <p>
                    Don't have an account? <Link to="signup">Sign Up</Link>
                </p>
            </div>

        </form>
    );
};