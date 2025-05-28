import { useRouteError, useNavigate } from 'react-router-dom'
import { ErrorContainer, ErrorTitle, ErrorMessage, ErrorButton } from './styles'

const ErrorBoundary = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <ErrorContainer>
      <ErrorTitle>Oops! Something went wrong</ErrorTitle>
      <ErrorMessage>{error?.message || 'An unexpected error occurred'}</ErrorMessage>
      <ErrorButton onClick={() => navigate(0)}>
        Refresh Page
      </ErrorButton>
    </ErrorContainer>
  )
}

export default ErrorBoundary 