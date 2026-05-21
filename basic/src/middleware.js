import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url))
console.log("Hello middleware running...")
// return NextResponse.json({
//     hello:'Hi i am middleware'
// })
// if(request.url.includes("admin")){
    return NextResponse.redirect(new URL('/', request.url))
// }
// return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/about',
}