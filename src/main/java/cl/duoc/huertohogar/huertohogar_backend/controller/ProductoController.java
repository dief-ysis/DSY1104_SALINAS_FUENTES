// Paquete que contiene los controladores REST de la aplicación
package cl.duoc.huertohogar.huertohogar_backend.controller;

// Importes necesarios para crear endpoints REST
import cl.duoc.huertohogar.huertohogar_backend.model.Producto;
import cl.duoc.huertohogar.huertohogar_backend.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para gestionar los productos
 * Proporciona endpoints HTTP para realizar operaciones CRUD
 * Mapea todas las peticiones a /api/v1/productos
 */
@RestController // Marca como controlador REST (maneja peticiones HTTP)
@RequestMapping("/api/v1/productos") // Ruta base para todos los endpoints
@CrossOrigin("*") // Permite peticiones desde cualquier origen (CORS)
public class ProductoController {

    // Inyección de dependencia del servicio
    private final ProductoService service;

    /**
     * Constructor que inyecta el servicio
     * Spring automáticamente proporciona una instancia de ProductoService
     * 
     * @param service Instancia del servicio de Producto
     */
    public ProductoController(ProductoService service) {
        this.service = service;
    }

    /**
     * GET /api/v1/productos
     * Obtiene la lista de todos los productos
     * 
     * @return Lista de productos en formato JSON
     */
    @GetMapping // Mapea peticiones GET a /api/v1/productos
    public List<Producto> listar() {
        // Llama al servicio para obtener todos los productos
        return service.listar();
    }

    /**
     * POST /api/v1/productos
     * Crea un nuevo producto
     * 
     * @param p Objeto Producto recibido en el cuerpo de la petición (JSON)
     * @return El producto creado con su ID generado
     */
    @PostMapping // Mapea peticiones POST a /api/v1/productos
    public Producto crear(@RequestBody Producto p) {
        // El RequestBody convierte el JSON recibido a objeto Producto
        // Llama al servicio para guardar el nuevo producto
        return service.guardar(p);
    }

    /**
     * GET /api/v1/productos/{id}
     * Obtiene un producto específico por su ID
     * 
     * @param id ID del producto a obtener (extraído de la URL)
     * @return El producto encontrado
     */
    @GetMapping("/{id}") // Mapea peticiones GET a /api/v1/productos/{id}
    public Producto obtener(@PathVariable Long id) {
        // PathVariable extrae el {id} de la URL y lo pasa como parámetro
        // Llama al servicio para obtener el producto por ID
        return service.obtenerPorId(id);
    }

    /**
     * PUT /api/v1/productos/{id}
     * Actualiza un producto existente
     * 
     * @param id ID del producto a actualizar (extraído de la URL)
     * @param request Objeto Producto con los datos actualizados
     * @return ResponseEntity con el producto actualizado o 404 si no existe
     */
    @PutMapping("/{id}") // Mapea peticiones PUT a /api/v1/productos/{id}
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long id, // Extrae el ID de la URL
            @RequestBody Producto request) { // Recibe los datos actualizados en JSON

        // Busca el producto en la BD
        Producto producto = service.obtenerPorId(id);
        
        // Si no existe, retorna 404 Not Found
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualiza los campos del producto con los nuevos valores
        producto.setNombre(request.getNombre());
        producto.setDescripcion(request.getDescripcion());
        producto.setPrecio(request.getPrecio());
        producto.setStock(request.getStock());
        // NO actualizamos fechaRegistro para mantener la fecha de creación original

        // Guarda los cambios en la BD
        Producto actualizado = service.guardar(producto);
        
        // Retorna 200 OK con el producto actualizado
        return ResponseEntity.ok(actualizado);
    }

    /**
     * DELETE /api/v1/productos/{id}
     * Elimina un producto de la base de datos
     * 
     * @param id ID del producto a eliminar (extraído de la URL)
     * @return ResponseEntity con un mensaje de confirmación
     */
    @DeleteMapping("/{id}") // Mapea peticiones DELETE a /api/v1/productos/{id}
    public ResponseEntity<String> deleteProducto(@PathVariable Long id) {
        // Llama al servicio para eliminar el producto por ID
        service.eliminar(id);
        
        // Retorna 200 OK con un mensaje de confirmación
        return ResponseEntity.ok("Producto eliminado correctamente");
    }
}
