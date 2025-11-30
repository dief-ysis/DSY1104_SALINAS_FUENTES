// Paquete que contiene los repositorios (acceso a datos)
package cl.duoc.huertohogar.huertohogar_backend.repository;

// Importes necesarios para crear repositorios JPA
import org.springframework.data.jpa.repository.JpaRepository;
import cl.duoc.huertohogar.huertohogar_backend.model.Producto;

/**
 * Interfaz de Repositorio para la entidad Producto
 * Proporciona métodos CRUD automáticos para interactuar con la BD
 * JpaRepository genera automáticamente las consultas SQL necesarias
 * 
 * @param <Producto> La entidad que maneja este repositorio
 * @param <Long> El tipo del identificador único (ID)
 */
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    
    // JpaRepository proporciona automáticamente:
    // - save(Producto) : Guardar o actualizar un producto
    // - findById(Long) : Buscar por ID
    // - findAll() : Listar todos los productos
    // - delete(Producto) : Eliminar un producto
    // - deleteById(Long) : Eliminar por ID
    // - existe(Long) : Verificar si existe un producto
    
    // Se pueden agregar métodos personalizados si se necesita
}
