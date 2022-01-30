module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "fakestoreapi.com"],
  },
  env: {
    stripe_public_key: process.env.STRETPE_PUBLIC_KEY
  }
}
