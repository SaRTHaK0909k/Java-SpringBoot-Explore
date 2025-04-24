package com.springbootlearn.tutorial.configuration;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.springbootlearn.tutorial.DevDB;
import com.springbootlearn.tutorial.ProdDB;
import org.modelmapper.ModelMapper;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    @ConditionalOnProperty(name="project.mode",havingValue = "production")
    public ProdDB getProdDBBean(){
        return new ProdDB();
    }

    @Bean
    @ConditionalOnProperty(name="project.mode",havingValue = "development")
    public DevDB getDevDBBean(){
        return new DevDB();
    }

    @Bean
    public ModelMapper getModelMapper(){
        return new ModelMapper();
    }


}
