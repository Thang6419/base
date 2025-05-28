import styled from '@emotion/styled'

const DotsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
`

const DotsWrapper = styled.div`
  display: flex;
  gap: 8px;
`

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: #3498db;
  border-radius: 50%;
  animation: bounce 0.5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`

const DotsLoading = () => {
  return (
    <DotsContainer>
      <DotsWrapper>
        <Dot delay={0} />
        <Dot delay={0.1} />
        <Dot delay={0.2} />
      </DotsWrapper>
    </DotsContainer>
  )
}

export default DotsLoading 