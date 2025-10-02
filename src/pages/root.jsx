import { Outlet, useNavigation } from "react-router"

export default function Root() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return (
    <div>
        <main>
            {isLoading ? (
                <div>
                    <p>Cargando...</p>
                </div>
            ) : (
                <Outlet />
            )}
        </main>
    </div>
  )
}