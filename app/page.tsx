import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          E-Commerce Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your products, orders, and analytics
        </p>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>

          <div className="text-center text-sm text-gray-500">
            Demo credentials available in README
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Features</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✓ JWT Authentication</li>
            <li>✓ RESTful API with error handling</li>
            <li>✓ PostgreSQL with Prisma ORM</li>
            <li>✓ Comprehensive testing (80%+ coverage)</li>
            <li>✓ Docker containerization</li>
            <li>✓ CI/CD with GitHub Actions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
