/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  basePath:'/dev',
  async headers(){
    return [
      {
        source:'/about',headers:[{key:'app-auth-key',value:'raj1234rn'}]
      }
    ]
  }
};

export default nextConfig;
