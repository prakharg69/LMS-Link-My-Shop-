import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const { role = "user" } = useParams();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google credential:", credentialResponse);

      await axios.post(
        "http://localhost:5002/api/auth/signup",
        {
          idToken: credentialResponse.credential, // ✅ ID TOKEN
          role
        },
        {
          withCredentials: true
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">

        <h1 className="text-2xl font-bold text-blue-700 mb-2">
          Sign Up to LMS
        </h1>

        <p className="text-sm text-gray-500 mb-6 text-center">
          Create your account using Google
        </p>

        {/* ✅ CORRECT GOOGLE LOGIN */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
          width="300"
        />

        <div className="flex items-center w-full my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate(`/login/${role}`)}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default SignUp;
