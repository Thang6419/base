import styled from '@emotion/styled'

export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: #F3F4F6;
`

export const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 1rem;
`

export const ErrorMessage = styled.p`
  color: #4B5563;
  margin-bottom: 2rem;
  max-width: 600px;
`

export const ErrorButton = styled.button`
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563EB;
  }
` 