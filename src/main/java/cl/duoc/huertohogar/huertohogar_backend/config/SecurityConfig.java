// Paquete que contiene la configuración de seguridad de la aplicación
package cl.duoc.huertohogar.huertohogar_backend.config;

// Importes necesarios para configurar Spring Security
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Clase de configuración de seguridad de Spring Security
 * Define cómo se autentican y autorizan las peticiones HTTP
 * Para desarrollo/EVA: permite acceso a todos los endpoints sin autenticación
 */
@Configuration // Marca esta clase como de configuración de Spring
@EnableWebSecurity // Activa la seguridad web personalizada
public class SecurityConfig {

    /**
     * Define la cadena de filtros de seguridad
     * 
     * @param http Objeto para configurar la seguridad HTTP
     * @return SecurityFilterChain configurada con las reglas de seguridad
     * @throws Exception si hay error en la configuración
     */
    @Bean // Marca este método como productor de un bean de Spring
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        
        // Configura la seguridad HTTP
        http
            // Desactiva CSRF (Cross-Site Request Forgery) para simplificar pruebas de API
            .csrf(csrf -> csrf.disable())
            
            // Configura las autorizaciones de peticiones HTTP
            .authorizeHttpRequests(auth -> auth
                // Permite TODAS las peticiones sin requerir autenticación
                // (Para desarrollo/EVA - en producción se debe restringir)
                .anyRequest().permitAll()
            );

        // Desactiva el formulario de login por defecto de Spring Security
        http.formLogin(login -> login.disable());
        
        // Desactiva la autenticación HTTP Basic (usuario/contraseña en headers)
        http.httpBasic(basic -> basic.disable());

        // Retorna la configuración de seguridad construida
        return http.build();
    }
}
