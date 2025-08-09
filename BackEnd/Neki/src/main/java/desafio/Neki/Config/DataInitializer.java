package desafio.Neki.Config;

import desafio.Neki.entity.Skill;
import desafio.Neki.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// Classe para inserir dados iniciais quando a aplicação subir
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public void run(String... args) throws Exception {
        // Só insere se não tiver nenhuma skill cadastrada
        if (skillRepository.count() == 0) {
            criarSkillsIniciais();
        }
    }

    private void criarSkillsIniciais() {
        // Skills de Frontend
        skillRepository.save(new Skill("HTML", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
            "Linguagem de marcação para estruturar páginas web"));
            
        skillRepository.save(new Skill("CSS", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
            "Linguagem de estilo para design de páginas web"));
            
        skillRepository.save(new Skill("JavaScript", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            "Linguagem de programação para web"));
            
        skillRepository.save(new Skill("React", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            "Biblioteca JavaScript para criar interfaces"));
            
        skillRepository.save(new Skill("Angular", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
            "Framework TypeScript para aplicações web"));
            
        skillRepository.save(new Skill("Vue.js", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
            "Framework JavaScript progressivo"));

        // Skills de Backend
        skillRepository.save(new Skill("Java", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
            "Linguagem de programação orientada a objetos"));
            
        skillRepository.save(new Skill("Spring Boot", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
            "Framework para desenvolvimento Java"));
            
        skillRepository.save(new Skill("Node.js", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            "Runtime JavaScript para backend"));
            
        skillRepository.save(new Skill("Python", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            "Linguagem de programação versátil"));

        // Skills de Banco de Dados
        skillRepository.save(new Skill("PostgreSQL", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
            "Sistema de gerenciamento de banco de dados"));
            
        skillRepository.save(new Skill("MySQL", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
            "Sistema de gerenciamento de banco de dados"));
            
        skillRepository.save(new Skill("MongoDB", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            "Banco de dados NoSQL"));

        // Skills de DevOps/Ferramentas
        skillRepository.save(new Skill("Git", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
            "Sistema de controle de versão"));
            
        skillRepository.save(new Skill("Docker", 
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            "Plataforma de containerização"));

        System.out.println("✅ Skills iniciais criadas com sucesso!");
    }
}
