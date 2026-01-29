import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom";
import "./Dashboard.css"

export default function Dashboard(){
    const [data, setData] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(!storedUser || !token){
            alert("Not Authorized!");
            navigate("/login");
            return;
        }

        setUser(JSON.parse(storedUser));

        axios.get("http://localhost:5000/api/auth/dashboard", {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => setData(res.data.message))
        .catch(() => {
            alert("Not Authorized");
            navigate("/login");
        });
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    if(!user) return null; //avoid rendering

    return(
        <div className="dashboard">
            <header className="dashboard-header">
                <div> <h2 className="logo">Dashboard</h2></div>
               
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>

            <main className="dashboard-main">
                <h1>Welcome, {user.name}!</h1>
               
            </main>

        </div>
    )
}