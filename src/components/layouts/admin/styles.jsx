import styled from '@emotion/styled'

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
`

export const Sidebar = styled.aside`
  width: 250px;
  background-color: #1F2937;
  color: white;
  padding: 1.5rem;
`

export const SidebarHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
`

export const SidebarNav = styled.nav`
  margin-top: 1rem;
`

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const NavLink = styled.a`
  color: #D1D5DB;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
  
  &:hover {
    color: white;
    background-color: #374151;
  }
`

export const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #F3F4F6;
` 