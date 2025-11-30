// Paquete que contiene la lógica de negocio de la aplicación
package cl.duoc.huertohogar.huertohogar_backend.service;

// Importes necesarios para el servicio
import cl.duoc.huertohogar.huertohogar_backend.model.Producto;
import cl.duoc.huertohogar.huertohogar_backend.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Servicio de Producto - Contiene la lógica de negocio
 * Actúa como intermediario entre el Controlador y el Repositorio
 * Encapsula las operaciones CRUD de Producto
 */
@Service // Marca esta clase como un servicio de Spring (bean inyectable)
public class ProductoService {

    // Inyección de dependencia del repositorio
    private final ProductoRepository repo;

    /**
     * Constructor que inyecta el repositorio
     * Spring automáticamente proporciona una instancia de ProductoRepository
     * 
     * @param repo Instancia del repositorio
     */
    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    /**
     * Obtiene todos los productos de la base de datos
     * 
     * @return Lista de todos los productos
     */
    public List<Producto> listar() {
        // Llama al repositorio para obtener todos los productos
        return repo.findAll();
    }

    /**
     * Guarda un nuevo producto o actualiza uno existente
     * 
     * @param p Objeto Producto a guardar
     * @return El producto guardado (incluye ID si es nuevo)
     */
    public Producto guardar(Producto p) {
        // Delega al repositorio la persistencia en BD
        return repo.save(p);
    }

    /**
     * Obtiene un producto por su ID
     * 
     * @param id Identificador único del producto
     * @return El producto encontrado, o null si no existe
     */
    public Producto obtenerPorId(Long id) {
        // Busca por ID en el repositorio
        // orElse(null) retorna null si no encuentra nada
        return repo.findById(id).orElse(null);
    }

    /**
     * Elimina un producto por su ID
     * 
     * @param id Identificador único del producto a eliminar
     */
    public void eliminar(Long id) {
        // Delega al repositorio la eliminación de la BD
        repo.deleteById(id);
    }
}
