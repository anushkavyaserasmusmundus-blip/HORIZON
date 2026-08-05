import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/download.jfif";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            navigate("/login");
        } catch (err) {
            setError("Registration failed");
        }
    };

    return (

        <div className="
            min-h-screen
            bg-[#FFF8EF]
            relative
            overflow-hidden
            flex
        ">

            {/* Background Decorative Blobs */}

            <div className="
                absolute
                top-[-150px]
                left-[-150px]
                w-[400px]
                h-[400px]
                rounded-full
                bg-[#F9C966]
                opacity-20
                blur-3xl
            "/>

            <div className="
                absolute
                bottom-[-150px]
                right-[-120px]
                w-[450px]
                h-[450px]
                rounded-full
                bg-[#FF9A62]
                opacity-15
                blur-3xl
            "/>

            <div className="
                absolute
                top-[20%]
                right-[8%]
                w-[90px]
                h-[90px]
                rounded-full
                bg-[#84C78A]
                opacity-20
                animate-pulse
            "/>

            {/* Main Full Screen Card */}

            <div className="
                w-full
                min-h-screen
                bg-white
                flex
                relative
                z-10
            ">

                {/* LEFT IMAGE */}

                <div
                    className="
                        hidden
                        md:block
                        w-[45%]
                        bg-cover
                        bg-center
                        relative
                    "
                    style={{
                        backgroundImage: `url(${backgroundImage})`
                    }}
                >

                    <div className="
                        absolute
                        inset-0
                        bg-black/10
                    "/>

                    {/* Organic Wave */}

                    <div
                        className="
                            absolute
                            right-[-2px]
                            top-0
                            h-full
                            w-[150px]
                            bg-white
                        "
                        style={{
                            clipPath:
                            "path('M0 0 C120 120 30 260 120 390 C170 500 50 580 0 700 L150 700 L150 0 Z')"
                        }}
                    />

                </div>

                {/* RIGHT SECTION */}

                <div className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    px-8
                    md:px-20
                ">

                    <div className="
                        w-full
                        max-w-md
                    ">

                        {/* Branding */}

                        <div className="mb-12">

                            <h1 className="
                                text-6xl
                                font-bold
                                text-[#2C3E50]
                                tracking-tight
                            ">
                                Horizon
                            </h1>

                            <p className="
                                mt-3
                                text-xl
                                text-[#6B7280]
                            ">
                                Your personal LifeOS
                            </p>

                        </div>

                        <h2 className="
                            text-3xl
                            font-semibold
                            text-[#2C3E50]
                            mb-8
                        ">
                            Create Account
                        </h2>

                        {error &&
                            <p className="text-red-500 mb-4">{error}</p>
                        }

                        <form
                            onSubmit={handleRegister}
                            className="space-y-6"
                        >

                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="
                                    w-full
                                    px-6
                                    py-4
                                    rounded-full
                                    bg-[#FFF8EF]
                                    border
                                    border-[#F2D5A5]
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-[#F4B643]
                                "
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="
                                    w-full
                                    px-6
                                    py-4
                                    rounded-full
                                    bg-[#FFF8EF]
                                    border
                                    border-[#F2D5A5]
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-[#F4B643]
                                "
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="
                                    w-full
                                    px-6
                                    py-4
                                    rounded-full
                                    bg-[#FFF8EF]
                                    border
                                    border-[#F2D5A5]
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-[#F4B643]
                                "
                            />

                            <button
                                type="submit"
                                className="
                                    w-full
                                    py-4
                                    rounded-full
                                    bg-[#F4B643]
                                    text-white
                                    font-semibold
                                    text-lg
                                    hover:scale-[1.02]
                                    transition
                                "
                            >
                                Create Account
                            </button>

                        </form>

                        <div className="
                            mt-8
                            flex
                            justify-between
                            text-sm
                        ">

                            <button
                                onClick={() => navigate("/login")}
                                className="
                                    text-[#6B7280]
                                    hover:text-[#2C3E50]
                                    transition
                                "
                            >
                                Already have an account?
                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="
                                    text-[#C84D38]
                                    font-semibold
                                    hover:underline
                                    transition
                                "
                            >
                                Log in
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;


