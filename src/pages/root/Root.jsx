import { Outlet } from "react-router"
import { NavBarRoot } from "../../components/root/NavBarRoot"
import './root.css'

export default function Root() {

  return (
    <div className="root-layout">
      <NavBarRoot />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}