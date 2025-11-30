// Paquete que contiene los controladores REST de la aplicación
package cl.duoc.huertohogar.huertohogar_backend.controller;

// Importes necesarios para crear endpoints REST
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controlador de prueba para verificar que el backend está funcionando
 * Proporciona un endpoint simple para testear la conectividad
 */
@RestController // Marca esta clase como controlador REST que maneja peticiones HTTP
public class TestController {

    /**
     * Endpoint simple que retorna un mensaje de confirmación
     * 
     * @return Cadena de texto indicando que el backend funciona
     */
    @GetMapping("/api/v1/hello") // Mapea peticiones GET a /api/v1/hello
    public String hello() {
        // Retorna un mensaje de confirmación
        return "Backend HuertoHogar funcionando ✅";
    }
}
