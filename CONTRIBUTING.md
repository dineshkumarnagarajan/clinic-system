# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/clinic-system.git`
3. Create feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit: `git commit -am 'Add your feature'`
6. Push: `git push origin feature/your-feature-name`
7. Submit pull request

## Development Setup

```bash
# Install dependencies
pnpm install

# Start development environment
docker-compose -f docker-compose.dev.yml up
# or manually
pnpm dev
```

## Code Style Guidelines

### TypeScript
- Use strict mode
- Define interfaces for all data structures
- Use type annotations for function parameters and returns
- Avoid `any` type

Example:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(id: string): Promise<User> {
  // implementation
}
```

### React Components
- Use functional components with hooks
- Extract reusable components
- Use Material-UI components for consistency
- Name components with PascalCase

Example:
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const CustomButton: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
}) => (
  <Button onClick={onClick} disabled={disabled}>
    {label}
  </Button>
);
```

### Express Routes
- Group related routes in separate files
- Use middleware for common functionality
- Handle errors consistently
- Add request validation

Example:
```typescript
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    // validation
    // logic
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Commit Messages

Follow conventional commits:
```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Maintenance
```

Example:
```
feat: Add patient search by DOB
```

## Before Submitting PR

1. Run type check: `pnpm type-check`
2. Run linter: `pnpm lint`
3. Build project: `pnpm build`
4. Test your changes locally
5. Update documentation if needed

## Testing

```bash
# Run tests
pnpm test

# Run tests for specific package
cd packages/backend && pnpm test

# Watch mode
pnpm test -- --watch
```

## Documentation

Update documentation for:
- New APIs: Update `API_DOCUMENTATION.md`
- New features: Update `README.md`
- Setup changes: Update `GETTING_STARTED.md`
- Deployment changes: Update `DEPLOYMENT.md`

## Pull Request Process

1. Update README.md with any new features
2. Include description of changes
3. Reference related issues: `Closes #123`
4. Request review from maintainers
5. Address review comments

Example PR description:
```
## Description
Add patient search by date of birth functionality

## Changes
- Added DOB filter to patient search endpoint
- Updated frontend search component
- Added tests for new functionality

## How to Test
1. Go to patient search
2. Filter by DOB
3. Verify results

Closes #123
```

## Reporting Issues

Include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/logs if applicable
- Environment details (OS, Node version, etc.)

## Questions?

- Check existing issues and documentation
- Open a discussion on GitHub
- Contact maintainers

Thank you for contributing! 🎉
