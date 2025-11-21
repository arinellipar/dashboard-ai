# Contributing Guide

Thank you for considering contributing to the E-Commerce Dashboard project!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run tests: `pnpm test`
6. Commit your changes: `git commit -m "Add your feature"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Start PostgreSQL (using Docker)
docker-compose up -d postgres

# Run migrations
pnpm prisma:migrate

# Seed database
pnpm prisma:seed

# Start development server
pnpm dev
```

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages
- Add tests for new features

## Commit Message Format

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(api): add product search endpoint
fix(auth): resolve JWT expiration issue
docs(readme): update installation instructions
```

## Testing

- Write tests for all new features
- Maintain 80%+ code coverage
- Run tests before committing: `pnpm test`
- Test both success and error cases

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers
6. Address review comments
7. Squash commits if requested

## Code Review Guidelines

Reviewers will check:
- Code quality and style
- Test coverage
- Documentation
- Performance implications
- Security considerations
- Breaking changes

## Reporting Bugs

Use GitHub Issues with the bug template:
- Clear title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots if applicable

## Feature Requests

Use GitHub Issues with the feature template:
- Clear description
- Use case
- Proposed solution
- Alternative solutions
- Additional context

## Questions?

Feel free to open a discussion on GitHub or reach out to maintainers.

Thank you for contributing! 🎉
