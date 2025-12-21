/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ['react-icons'] // for Tree Shaking
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'avatars.githubusercontent.com',
			'xtovytvlpfwfopdwaedf.supabase.co',
			'ctxaofgvpokdnmcrxnnu.supabase.co'
		]
	}
};

module.exports = nextConfig;
