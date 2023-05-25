package pl.dexbytes.librarybackend.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import pl.dexbytes.librarybackend.entity.Book;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    public static final String allowedOrigin = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] unsupportedMethods = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH};

        config.exposeIdsFor(Book.class);

        disableHttpMethods(Book.class, config, unsupportedMethods);

        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(allowedOrigin);
    }

    private void disableHttpMethods(Class clazz, RepositoryRestConfiguration config, HttpMethod[] unsupportedMethods) {
        config.getExposureConfiguration()
                .forDomainType(clazz)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedMethods)));
    }

}
