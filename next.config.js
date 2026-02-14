/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	experimental: {
		optimizePackageImports: ['react-icons'] // for Tree Shaking
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'xtovytvlpfwfopdwaedf.supabase.co'
			},
			{
				protocol: 'https',
				hostname: 'ctxaofgvpokdnmcrxnnu.supabase.co'
			}
		]
	}
};

module.exports = nextConfig;
