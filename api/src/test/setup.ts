// Global test setup for backend API tests

// Mock environment variables for testing
process.env['NODE_ENV'] = 'test'
process.env['PORT'] = '8081'
process.env['SUPABASE_URL'] = 'http://localhost:54321'
process.env['SUPABASE_SERVICE_KEY'] = 'test-service-key'
process.env['STRIPE_SECRET_KEY'] = 'sk_test_test'
process.env['JWT_SECRET'] = 'test-jwt-secret'

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} 