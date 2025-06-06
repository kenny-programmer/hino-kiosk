import '@testing-library/jest-dom'

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}))

// Mock window functions
global.URL.createObjectURL = jest.fn()
global.URL.revokeObjectURL = jest.fn()

// Mock navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})