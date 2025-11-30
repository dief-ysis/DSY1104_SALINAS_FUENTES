// Paquete que contiene las entidades/modelos de la base de datos
package cl.duoc.huertohogar.huertohogar_backend.model;

// Importes necesarios para la persistencia en BD con JPA
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entidad JPA que representa un Producto en la base de datos
 * Mapea la tabla "productos" de la BD
 * Contiene información sobre productos de jardinería/plantas
 */
@Entity // Marca esta clase como entidad JPA (persistible en BD)
@Table(name = "productos") // Especifica el nombre de la tabla en la BD
public class Producto {

    /**
     * Identificador único del producto
     * Se genera automáticamente con auto-increment
     */
    @Id // Marca este atributo como clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremento en la BD
    private Long id;

    // Nombre del producto
    private String nombre;
    
    // Precio del producto en moneda local
    private Double precio;
    
    // Cantidad de unidades disponibles en stock
    private Integer stock;

    /**
     * Descripción detallada del producto
     * Usa TEXT para permitir textos largos
     */
    @Column(columnDefinition = "TEXT") // Especifica que use tipo TEXT en la BD
    private String descripcion;

    /**
     * Fecha de registro del producto
     * Se asigna automáticamente al crear el producto
     */
    private LocalDateTime fechaRegistro = LocalDateTime.now(); // Valor por defecto = ahora

    // ========== GETTERS Y SETTERS ==========
    // Métodos para acceder y modificar los atributos de la clase

    /**
     * Obtiene el ID del producto
     * @return ID único del producto
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el ID del producto
     * @param id Nuevo ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre del producto
     * @return Nombre del producto
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * Establece el nombre del producto
     * @param nombre Nuevo nombre
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * Obtiene el precio del producto
     * @return Precio del producto
     */
    public Double getPrecio() {
        return precio;
    }

    /**
     * Establece el precio del producto
     * @param precio Nuevo precio
     */
    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    /**
     * Obtiene el stock disponible
     * @return Cantidad de unidades en stock
     */
    public Integer getStock() {
        return stock;
    }

    /**
     * Establece el stock del producto
     * @param stock Nueva cantidad
     */
    public void setStock(Integer stock) {
        this.stock = stock;
    }

    /**
     * Obtiene la descripción del producto
     * @return Descripción completa
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Establece la descripción del producto
     * @param descripcion Nueva descripción
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Obtiene la fecha de registro
     * @return Fecha y hora de creación
     */
    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    /**
     * Establece la fecha de registro
     * @param fechaRegistro Nueva fecha
     */
    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
