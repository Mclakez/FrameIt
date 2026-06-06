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
import { useEffect } from "react"


export default function AuthSuccess() {

    function getTokenFromUrl() {
        const params = new URLSearchParams(window.location.search)
        return params.get('token')
    }

    useEffect(() => {
        const token = getTokenFromUrl()
        if (token) {
            localStorage.setItem('token', token)
            window.location.href = '/app'
        } else {
            window.location.href = '/login?error=auth_failed'
        }

        
        
        
}, [])
    return (
        <>
        <header className="bg-(--light-black) py-8 px-8 flex justify-between items-center border border-b-(--border-color)">
            <div className="flex flex-row gap-4 items-center">
                
                <div className='text-white flex flex-col'>
                    <span>FrameIt</span>
                    <span>Batch Image Brander</span>
                </div>
            </div>

            <div className="flex justify-center items-center">
        <p>Logging you in...</p>
   </div>
    
        </header>
        </>
    )
} 