/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname:  "res.cloudinary.com",
                port: '',
                pathname: '/dashboard/**'
            },
            {
                protocol: 'http',
                hostname:  "cdn.discordapp.com",
                port: '',
                pathname: '/dashboard/**'
            }
        ],
        domains: ["res.cloudinary.com" , "cdn.discordapp.com"]
    }
}

module.exports = nextConfig
