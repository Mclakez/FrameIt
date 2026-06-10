// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Authenticating...</title>
// </head>
// <body>
//     <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
//         <p>Logging you in...</p>
//     </div>
    
//     <script>
//         // Get token from URL
//         // const params = new URLSearchParams(window.location.search)
//         // const token = params.get('token')
        
//         // if (token) {
//         //     sessionStorage.setItem('token', token)
//         //     window.location.href ='/app'
//         // } else {
//         //     window.location.href = '/login.html?error=auth_failed'
//         // }
//     </script>
// </body>
// </html>
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchWithClient from "./lib/fetchClient";

export default function AuthSuccess({ setUserName }: { setUserName: (value: string) => void }) {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await fetchWithClient('/api/auth/me', {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserName(data.user.username);
        navigate("/app");
      } else {
        navigate("/login?error=auth_failed");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      navigate("/login?error=auth_failed");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <header className="bg-(--light-black) py-8 px-8 flex justify-between items-center border border-b-(--border-color)">
        <div className="flex flex-row gap-4 items-center">
          <div className="text-white flex flex-col">
            <span>FrameIt</span>
            <span>Batch Image Brander</span>
          </div>
        </div>
      </header>

      <div className="bg-(--bg-black) flex justify-center items-center h-screen text-(--frameit-purple)">
        <p>Logging you in...</p>
      </div>
    </>
  );
}